import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Button, Alert } from 'react-native';
import { API_URL } from '@env';
import styles from './TelaEditarLocacaoVeiculoStyle';
import BR from '../../../components/BR/BR';

import { RouteProp, useRoute, useNavigation, NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../routes/types";

import axios from 'axios';

type TelaEditarLocacaoVeiculoRouteProp = RouteProp<StackParamList, 'TelaEditarLocacaoVeiculo'>;

type RouteParams = {
    id: number;
};

// 1 - Botão para Finzalizar locação(Coloque um Pop up depois) => mudar a disponibilidade do veículo
// 2 - Botão de Atualizar
// 3 - Botão de cancelar

export default function TelaEditarLocacaoVeiculo() {
    const route = useRoute<TelaEditarLocacaoVeiculoRouteProp>();
    const navigation = useNavigation<NavigationProp<StackParamList>>();
    const { id } = route.params;

    const [imagePath, setImageUri] = useState('');
    const [placa, setPlaca] = useState('');
    const [quilometragem, setQuilometragem] = useState('');
    const [cpfUsuario, setCPfUsuario] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');

    function formatCPF(cpf: string): string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    const fetchLocacaoData = async () => {
        try {
            const id_veiculo = id;
            const url = `${API_URL}/api/backend/locacao/${id_veiculo}`;
            console.log(`Fetching: ${url}`);
            const response = await fetch(url);
            const result = await response.json();

            const locacaoData = result.map((locacao: any) => {
                setPlaca(locacao.placa);
                setQuilometragem(locacao.quilometragem);
                setCPfUsuario(locacao.cpf);
                setNomeUsuario(locacao.nome);
                setDataEntrega(locacao.data_de_entrega);
                setDataDevolucao(locacao.data_de_devolucao);
            })

        } catch(error) {
            console.error("Erro ao buscar dados da Locação:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados da Locação.");
        }
    }

    const rentalVehicleUpdate = async () => {
        const locacaoData = {
            imagePath,
            placa,
            quilometragem,
            cpfUsuario,
            nomeUsuario,
            dataEntrega,
            dataDevolucao,
        }

        try {
            await axios.put(`${API_URL}/api/backend/locacao/update/`, locacaoData);
            Alert.alert('Sucesso', 'Locação atualizada com sucesso!');
            navigation.navigate('telaHomeDefinitiva');
        } catch (error) {
            console.error('Erro ao atualizar locação:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a locação.');
        }
    };

    const vehicleAvailabilityUpdate = async () => {
        const locacaoData = {
            imagePath,
            placa,
            quilometragem,
            cpfUsuario,
            nomeUsuario,
            dataEntrega,
            dataDevolucao,
        }

        try {
            await axios.put(`${API_URL}/api/backend/locacao/disponibilityUpdate/`, locacaoData);
            Alert.alert('Sucesso', 'Disponibilidade atualizada com sucesso!');
            navigation.navigate('telaHomeDefinitiva');
        } catch (error) {
            console.error('Erro ao atualizar a disponibilidade do veículo em locação:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a disponibilidade do veículo em locação.');
        }
    };

    useEffect(() => {
        fetchLocacaoData();
    }, [id]);


    return(
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View>
                <Text style={styles.titulo}>Locação do Veículo</Text>
            </View>

            {/* <View style={styles.viewImg}>

            </View> */}

            <View style={{ marginBottom: 15 }}>
                <Button title="Tirar Foto do Veículo"/>
            </View>

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
                <TextInput style={styles.input} placeholder="Nome do Usuário" onChangeText={setNomeUsuario} value={nomeUsuario || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Data de Enterga</Text>
                <TextInput style={styles.input} placeholder="Data de Devolução" onChangeText={setDataEntrega} value={dataEntrega || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Data de Enterga</Text>
                <TextInput style={styles.input} placeholder="Data de Devolução" onChangeText={setDataDevolucao} value={dataDevolucao || ''} />
            </View>

            <TouchableOpacity style={styles.button} onPress={vehicleAvailabilityUpdate}>
                <Text style={styles.buttonText}>Finalizar Locação</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={rentalVehicleUpdate}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <BR />
        </ScrollView>
    )

}