import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Button, Image } from 'react-native';
import styles from './TelaManutencaoVeiculoStyle';
import BR from '../../../components/BR/BR';

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../routes/types";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { API_URL } from '@env';
import axios from 'axios';

type NavigationProp = NativeStackNavigationProp<StackParamList, 'telaHomeDefinitiva'>;

export default function TelaManutencaoVeiculo() {
    const navigation = useNavigation<NavigationProp>();

    const [placa, setPlaca] = useState('');
    const [dataManutencao, setDataManutencao] = useState<string>('');
    const [descricao, setDescricao] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [imagesUri, setImagesUri] = useState<string[]>([]);
    const [showViewImg, setShowViewImg] = useState(false);


    useEffect(() => {
        const formDate = (date: Date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        setDataManutencao(formDate(new Date));
    }, []);

    useEffect(() => {
        if(placa == '' || dataManutencao == '' || descricao == '' || imagesUri.length == 0) {
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
        }
    })

    const cadastrarManutencao = async () => {

        const uploadedImages: string[] = [];
        for (const imageUri of imagesUri) {
            const imagePath = await handleImageUpload(imageUri);
            if (imagePath) uploadedImages.push(imagePath);
        }

        const manutencaoData = {
            placa,
            dataManutencao,
            descricao,
            imagens: uploadedImages,
        }

        try {
            const response = await axios.post(`${API_URL}/api/backend/manutencao/register/`, manutencaoData);
            Alert.alert('Sucesso', 'Manutenção cadastrada com sucesso!');
            navigation.navigate('telaHomeDefinitiva');
        } catch(error) {
            console.error('Error ao registrar manutenção: ', error);
            Alert.alert('Erro', 'Não foi possível registrar a manutenção.');
        }

    }

    
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

    return(
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View>
                <Text style={styles.titulo}>Manutenção do Veículo</Text>
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
                <Text style={styles.textLabel}>Data de Manutenção</Text>
                <TextInput style={styles.input} placeholder="Data de Manutenção" onChangeText={setDataManutencao} value={dataManutencao || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Placa</Text>
                <TextInput style={styles.input} placeholder="Placa" onChangeText={setPlaca} value={placa || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>O que foi feito?</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Descreva o que foi fetio na manutenção." 
                    onChangeText={setDescricao} 
                    value={descricao || ''}
                    multiline={true}
                    numberOfLines={5}
                     />
            </View>

            {btnDisabled != true ? (
                <TouchableOpacity style={styles.button} onPress={cadastrarManutencao}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.deactivatedButton}  disabled={true}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            )}

            <BR />
        </ScrollView>
    )

}