import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { API_URL } from '@env';
import axios from 'axios';
import styles from './TeleEditarVeiculoStyle';
import pickerSelectStyles from '../../styles/selectStyles';
import BR from '../../../components/BR/BR';
import { StackParamList } from '../../../routes/types';

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
    const [disponibilidade, setDisponibilidade] = useState('');

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

    const handleUpdateVehicle = async () => {
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
        };

        try {
            await axios.put(`${API_URL}/api/backend/vehicle/${id}`, updatedVehicleData);
            Alert.alert('Sucesso', 'Veículo atualizado com sucesso!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('telaHomeDefinitiva')
                }
            ]);
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
