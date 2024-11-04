
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
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

    useEffect(() => {
        const fetchData = async () => {
          await fetchOptions(); // Load options first
          await fetchVehicleDetails(); // Then load vehicle details
        };
        fetchData();
      }, []);

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

    const fetchVehicleDetails = async () => {
        try {
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
          console.error('Erro ao carregar dados do veículo:', error);
          Alert.alert("Erro", "Não foi possível carregar os dados do veículo.");
        }
    };

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
            Alert.alert('Sucesso', 'Veículo atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar veículo:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o veículo.');
        }
    };
    
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.viewTitulo}>
                <Text style={styles.titulo}>Editar veículo</Text>
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Modelo</Text>
                <TextInput style={styles.input} onChangeText={setModelo} value={modelo} placeholder="Modelo" />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Marca</Text>
                <RNPickerSelect
                    onValueChange={(value) => setMarca(value)}
                    items={marcasOptions}
                    value={marca}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Cor</Text>
                <RNPickerSelect
                    onValueChange={(value) => setCor(value)}
                    items={coresOptions}
                    value={cor}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Placa</Text>
                <TextInput style={styles.input} onChangeText={setPlaca} value={placa} placeholder="Placa" />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Combustível</Text>
                <RNPickerSelect
                    onValueChange={(value) => setCombustivel(value)}
                    items={combustiveisOptions}
                    value={combustivel}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Tipo de Veículo</Text>
                <RNPickerSelect
                    onValueChange={(value) => setTipoVeiculo(value)}
                    items={tiposVeiculoOptions}
                    value={tipoVeiculo}
                    style={pickerSelectStyles}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdateVehicle}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <BR />
        </ScrollView>
    );
}
