import React, { useState, useEffect } from "react";
import {
    Button,
    View,
    Text,
    TextInput,
    ScrollView,
    Alert,
    Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../routes/types";

import RNPickerSelect from 'react-native-picker-select';
import { API_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import BR from '../../../components/BR/BR';
import styles from "./CadastrarVeiculoStyles";
import pickerSelectStyles from '../../styles/selectStyles';
import axios from 'axios';

type NavigationProp = NativeStackNavigationProp<StackParamList, 'TelaSenha'>;

export default function CadastrarVeiculo() {
    const navigation = useNavigation<NavigationProp>();

    const [tipo_veiculo, setTipo] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');
    const [combustivel, setCombustivel] = useState('');
    const [placa, setPlaca] = useState('');
    const [chassi, setChassi] = useState('');
    const [motor, setMotor] = useState('');
    const [ano, setAno] = useState('');
    const [quilometragem, setquilometragem] = useState('');
    const [disponibilidade, setDisponibilidade] = useState(1);
    const [dataEntrega, setDataEntrega] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');
    const [imagesUri, setImagesUri] = useState<string[]>([]);
    const [showViewImg, setShowViewImg] = useState(false);

    const [marcasOptions, setMarcasOptions] = useState([]);
    const [coresOptions, setCoresOptions] = useState([]);
    const [combustiveisOptions, setCombustiveisOptions] = useState([]);
    const [tiposVeiculoOptions, setTiposVeiculoOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [marcas, cores, combustiveis, tipos] = await Promise.all([
                    axios.get(`${API_URL}/api/backend/opcoes/marcas`),
                    axios.get(`${API_URL}/api/backend/opcoes/cores`),
                    axios.get(`${API_URL}/api/backend/opcoes/combustiveis`),
                    axios.get(`${API_URL}/api/backend/opcoes/tipos-veiculo`)
                ]);
        
                setMarcasOptions(marcas.data.map((item: any) => ({ label: item.marca, value: item.marca })));
                setCoresOptions(cores.data.map((item: any) => ({ label: item.cor, value: item.cor })));
                setCombustiveisOptions(combustiveis.data.map((item: any) => ({ label: item.combustivel, value: item.combustivel })));
                setTiposVeiculoOptions(tipos.data.map((item: any) => ({ label: item.tipo_veiculo, value: item.tipo_veiculo })));
            } catch (error) {
                console.error("Erro ao buscar opções:", error);
                Alert.alert("Erro", "Não foi possível carregar as opções.");
            }
        };
    
        fetchOptions();
    }, []);

    // Função para capturar a imagem
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

    const cadastrarVeiculo = async () => {
        const uploadedImages: string[] = [];
        for (const imageUri of imagesUri) {
            const imagePath = await handleImageUpload(imageUri);
            if (imagePath) uploadedImages.push(imagePath); // Adiciona o caminho ao array se o upload for bem-sucedido
        }
        const vehicleData = {
            tipo_veiculo,
            modelo,
            marca,
            cor,
            combustivel,
            disponibilidade,
            placa,
            chassi,
            motor,
            ano,
            dataEntrega,
            dataDevolucao,
            quilometragem,
            imagens: uploadedImages, // Array com caminhos das imagens carregadas
        };
    
        try {
            const response = await axios.post(`${API_URL}/api/backend/vehicle/register/vehicles`, vehicleData);
            Alert.alert('Sucesso', 'Cadastro finalizado com sucesso!');
            navigation.navigate('telaHomeDefinitiva');
        } catch (error) {
            console.error('Erro ao registrar veículo:', error);
            Alert.alert('Erro', 'Não foi possível registrar o veículo.');
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Cadastrar novo veículo</Text>

                {/* Botão para capturar ou selecionar a imagem */}
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

                <Text style={styles.label}>Tipo de veículo:</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setTipo(value)}
                        items={tiposVeiculoOptions}
                        value={tipo_veiculo}
                        style={pickerSelectStyles}
                    />
                </View>

                <Text style={styles.label}>Marca:</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setMarca(value)}
                        items={marcasOptions}
                        value={marca}
                        style={pickerSelectStyles}
                    />
                </View>

                <Text style={styles.label}>Modelo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Modelo"
                    value={modelo}
                    onChangeText={setModelo}
                />

                <Text style={styles.label}>Cor:</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setCor(value)}
                        items={coresOptions}
                        value={cor}
                        style={pickerSelectStyles}
                    />
                </View>

                <Text style={styles.label}>Combustível:</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setCombustivel(value)}
                        items={combustiveisOptions}
                        value={combustivel}
                        style={pickerSelectStyles}
                    />
                </View>

                <Text style={styles.label}>Placa:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Placa"
                    value={placa}
                    onChangeText={setPlaca}
                />

                <Text style={styles.label}>Chassi:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Chassi"
                    value={chassi}
                    onChangeText={setChassi}
                />

                <Text style={styles.label}>Motor:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Motor"
                    value={motor}
                    onChangeText={setMotor}
                />

                <Text style={styles.label}>Ano:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ano"
                    value={ano}
                    onChangeText={setAno}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Quilometragem:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Quilometragem"
                    value={quilometragem}
                    onChangeText={setquilometragem}
                    keyboardType="numeric"
                />

                <View style={styles.botoesContainer}>
                    <View style={styles.botao}>
                        <Button title="Cadastrar" color="green" onPress={cadastrarVeiculo} />
                    </View>
                </View>
            </View>
            <BR />
        </ScrollView>
    )
}
