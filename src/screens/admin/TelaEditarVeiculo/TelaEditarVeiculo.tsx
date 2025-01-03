import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Button, Image } from 'react-native';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { API_URL } from '@env';
import axios from 'axios';
import styles from './TeleEditarVeiculoStyle';
import pickerSelectStyles from '../../styles/selectStyles';
import BR from '../../../components/BR/BR';
import { StackParamList } from '../../../routes/types';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

type RouteParams = {
    id: number;
};
type TelaEditarVeiculoRouteProp = RouteProp<StackParamList, 'TelaEditarVeiculo'>;

export default function TelaEditarVeiculo() {
    const route = useRoute<TelaEditarVeiculoRouteProp>();
    const navigation = useNavigation<NavigationProp<StackParamList>>();
    const { id } = route.params;

    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [cor, setCor] = useState('');
    const [placa, setPlaca] = useState('');
    const [combustivel, setCombustivel] = useState('');
    const [chassi, setChassi] = useState('');
    const [motor, setMotor] = useState('');
    const [ano, setAno] = useState('');
    const [quilometragem, setQuilometragem] = useState('');
    const [tipoVeiculo, setTipoVeiculo] = useState('');
    const [marcasOptions, setMarcasOptions] = useState([]);
    const [coresOptions, setCoresOptions] = useState([]);
    const [combustiveisOptions, setCombustiveisOptions] = useState([]);
    const [tiposVeiculoOptions, setTiposVeiculoOptions] = useState([]);
    const [imagesUri, setImagesUri] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
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
                
                const response = await axios.get(`${API_URL}/api/backend/vehicle/${id}`);
                const vehicle = response.data;

                setModelo(vehicle.Modelo?.modelo || '');
                setMarca(vehicle.Marca?.marca || '');
                setCor(vehicle.Cor?.cor || '');
                setPlaca(vehicle.placa);
                setCombustivel(vehicle.Combustivel?.combustivel || '');
                setChassi(vehicle.chassi);
                setMotor(vehicle.motor);
                setAno(vehicle.ano);
                setQuilometragem(vehicle.quilometragem.toString());
                setTipoVeiculo(vehicle.TipoVeiculo?.tipo_veiculo || '');
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                Alert.alert("Erro", "Não foi possível carregar as opções ou os dados do veículo.");
            }
        };

        fetchData();
    }, [id]);

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

    const handleUpdateVehicle = async () => {
        const uploadedImages: string[] = [];
        for (const imageUri of imagesUri) {
            const imagePath = await handleImageUpload(imageUri);
            if (imagePath) uploadedImages.push(imagePath); // Adiciona o caminho ao array se o upload for bem-sucedido
        }
        const updatedVehicleData = {
            modelo,
            marca,
            cor,
            placa,
            combustivel,
            chassi,
            motor,
            ano,
            quilometragem,
            tipo_veiculo: tipoVeiculo,
            imagens: uploadedImages,
        };

        try {
            await axios.put(`${API_URL}/api/backend/vehicle/${id}`, updatedVehicleData);
            Alert.alert('Sucesso', 'Veículo atualizado com sucesso!');
            navigation.navigate('telaHomeDefinitiva')
        } catch (error) {
            console.error('Erro ao atualizar veículo:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o veículo.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.viewTitulo}>
                <Text style={styles.titulo}>Editar veículo</Text>
            </View>

            <View style={{ marginBottom: 15 }}>
                <Button title="Tirar Foto do Veículo" onPress={handleImagePick} />
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {imagesUri.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
                ))}
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Modelo</Text>
                <TextInput style={styles.input} onChangeText={setModelo} value={modelo} placeholder="Modelo" />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Marca</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setMarca(value)}
                        items={marcasOptions}
                        value={marca}
                        style={pickerSelectStyles}
                    />
                </View>
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Cor</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setCor(value)}
                        items={coresOptions}
                        value={cor}
                        style={pickerSelectStyles}
                    />
                </View>
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Placa</Text>
                <TextInput style={styles.input} onChangeText={setPlaca} value={placa} placeholder="Placa" />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Combustível</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setCombustivel(value)}
                        items={combustiveisOptions}
                        value={combustivel}
                        style={pickerSelectStyles}
                    />
                </View>
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Tipo de Veículo</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(value) => setTipoVeiculo(value)}
                        items={tiposVeiculoOptions}
                        value={tipoVeiculo}
                        style={pickerSelectStyles}
                    />
                </View>
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Chassi</Text>
                <TextInput style={styles.input} onChangeText={setChassi} value={chassi} placeholder="Chassi" />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Motor</Text>
                <TextInput style={styles.input} onChangeText={setMotor} value={motor} placeholder="Motor" />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Ano</Text>
                <TextInput style={styles.input} onChangeText={setAno} value={ano} placeholder="Ano" />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Quilometragem</Text>
                <TextInput style={styles.input} onChangeText={setQuilometragem} value={quilometragem} placeholder="Quilometragem" keyboardType="numeric" />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdateVehicle}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <BR />
        </ScrollView>
    );
}
