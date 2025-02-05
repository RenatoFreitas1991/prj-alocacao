import React, { useState, useEffect } from 'react';
import { 
        View, 
        Text, 
        TouchableOpacity, 
        TextInput, ScrollView, 
        Button, 
        Alert, 
        Image 
} from 'react-native';

import { API_URL } from '@env';
import styles from './TelaLocacaoVeiculoStyle';
import BR from '../../../components/BR/BR';

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../routes/types";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import axios from 'axios';

type NavigationProp = NativeStackNavigationProp<StackParamList, 'telaHomeDefinitiva'>;

export default function TelaLocacaoVeiculo() {
    const navigation = useNavigation<NavigationProp>();

    const [placa, setPlaca] = useState('');
    const [quilometragem, setQuilometragem] = useState('');
    const [cpfUsuario, setCPfUsuario] = useState<string>('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [isInBlackList, setIsInBlackList] = useState(false);
    const [blackListError, setBlackListError] = useState('');
    const [dataEntrega, setDataEntrega] = useState<string>('');
    const [dataDevolucao, setDataDevolucao] = useState<string>('');
    const [imagesUri, setImagesUri] = useState<string[]>([]);
    const [showViewImg, setShowViewImg] = useState(false);
    const [valorLocacao, setValorLocacao] = useState('');

    function formatCPF(cpf: string): string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    const fetchLocacaoUserData = async () => {
        try {
            const url = `${API_URL}/api/backend/user/info/${cpfUsuario}`;
            const response = await fetch(url);
            const result = await response.json();

            const locacaoData = result.map((data: any) => {
                setNomeUsuario(data.nome);
            })

        } catch(error) {
            console.error("Erro ao buscar dados da Locação:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados da Locação.");
        }
    }

    const fetchBlackListUserData = async () => {
        const url = `${API_URL}/api/backend/user/info/blacklist/${cpfUsuario}`;
        const response = await fetch(url);
        const result = await response.json();

        const locacaoData = result.map((data: any) => {
            setNomeUsuario(data.nome);
        })

        const blackListUserData = result.map((data: any) => {
            if(data.id != null) {
                setIsInBlackList(true);
                setBlackListError("Este usuário está na blacklist")
            } else {
                setIsInBlackList(false);
                setBlackListError("");
            }
        })
    }

    useEffect(() => {
        if(cpfUsuario.length == 14) {
            fetchLocacaoUserData();
            fetchBlackListUserData();
        } else {
            setNomeUsuario("");
            setIsInBlackList(false);
            setBlackListError("");
        }
    }, [cpfUsuario]);

    useEffect(() => {
        const addOneMonth = (date: Date) => {
            const newDate = new Date(date);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        }

        const formDate = (date: Date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        setDataEntrega(formDate(new Date));
        setDataDevolucao(formDate(addOneMonth(new Date)));
    }, []);

    const handleImagePick = async () => {
        if (imagesUri.length >= 5) {
            Alert.alert("Limite de Imagens", "Você só pode adicionar até 5 imagens.");
            return;
        }

        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permissão negada", "Precisamos de permissão para acessar a câmera.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;
            const fileName = imageUri.split('/').pop(); 
            const newPath = `${FileSystem.documentDirectory}veiculos/${fileName}`;

            try {
                await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}veiculos`, { intermediates: true });
                await FileSystem.copyAsync({ from: imageUri, to: newPath });
                setImagesUri((prevImages) => [...prevImages, newPath]);
                Alert.alert("Imagem salva com sucesso!");
                setShowViewImg(true);
            } catch (error) {
                console.error("Erro ao salvar imagem:", error);
                Alert.alert("Erro", "Não foi possível salvar a imagem.");
            }
        }
    };

    const handleImageUpload = async (imageUri: string) => {
        const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: `vehicle_${Date.now()}.jpg`
        } as any);
    
        try {
            const response = await axios.post(`${API_URL}/api/backend/upload/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.imagePath;
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            Alert.alert("Erro", "Não foi possível fazer upload da imagem.");
            return null;
        }
    };

    const cadastrarLocacao = async () => {

        const uploadedImages: string[] = [];
        for (const imageUri of imagesUri) {
            const imagePath = await handleImageUpload(imageUri);
            if (imagePath) uploadedImages.push(imagePath);
        }

        const locacaoData = {
            placa,
            quilometragem,
            cpfUsuario,
            dataEntrega,
            dataDevolucao,
            imagens: uploadedImages,
            valorLocacao,
        }

        try {
            const response = await axios.post(`${API_URL}/api/backend/locacao/register/`, locacaoData);
            Alert.alert('Sucesso', 'Locação realizada com sucesso!');
            navigation.navigate('telaHomeDefinitiva');
        } catch (error) {
            console.error('Erro ao registrar locação:', error);
            Alert.alert('Erro', 'Não foi possível registrar a locação.');
        }

    };

    return(
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View>
                <Text style={styles.titulo}>Locação do Veículo</Text>
            </View>

            <View style={{ marginBottom: 15 }}>
                <Button title="Tirar Foto do Veículo" onPress={handleImagePick} />
            </View>
            {showViewImg == true ? (
                <View style={styles.viewImg}>
                    {imagesUri.map((uri, index) => (
                        <Image key={index} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
                    ))}
                </View>
            ) : (
                <View></View>
            )}

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Placa</Text>
                <TextInput style={styles.input} placeholder="Placa" onChangeText={setPlaca} value={placa || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Quilometragem</Text>
                <TextInput style={styles.input} placeholder="Quilometragem" onChangeText={setQuilometragem} value={quilometragem || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>CPF do Usuário</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="CPF do Usuário" 
                    onChangeText={(text: string) => setCPfUsuario(formatCPF(text))} 
                    value={cpfUsuario || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Nome do Usuário</Text>
                <Text style={styles.blackListError}>{blackListError}</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Nome do Usuário" 
                    editable={false} 
                    value={nomeUsuario || ''} 
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Data de Enterga</Text>
                <TextInput style={styles.input} placeholder="Data de Devolução" onChangeText={setDataEntrega} value={dataEntrega || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Data de Enterga</Text>
                <TextInput style={styles.input} placeholder="Data de Devolução" onChangeText={setDataDevolucao} value={dataDevolucao || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Valor R$</Text>
                <TextInput style={styles.input} placeholder="R$" onChangeText={setValorLocacao} value={valorLocacao || ''} />
            </View>

            {isInBlackList != true ? (
                <TouchableOpacity style={styles.button} onPress={cadastrarLocacao}>
                    <Text style={styles.buttonText}>Alocar</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.deactivatedButton} onPress={cadastrarLocacao} disabled={true}>
                    <Text style={styles.buttonText}>Alocar</Text>
                </TouchableOpacity>
            )}

            <BR /> 
        </ScrollView>
    )

}