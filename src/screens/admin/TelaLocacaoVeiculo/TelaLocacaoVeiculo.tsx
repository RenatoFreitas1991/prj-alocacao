import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Button, Alert } from 'react-native';
import { API_URL } from '@env';
import styles from './TelaLocacaoVeiculoStyle';
import BR from '../../../components/BR/BR';

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../routes/types";

import axios from 'axios';

type NavigationProp = NativeStackNavigationProp<StackParamList, 'telaHomeDefinitiva'>;

export default function TelaLocacaoVeiculo() {
    const navigation = useNavigation<NavigationProp>();

    const [imagePath, setImageUri] = useState('');
    const [placa, setPlaca] = useState('');
    const [quilometragem, setQuilometragem] = useState(0);
    const [cpfUsuario, setCPfUsuario] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [dataEntrega, setDataEntrega] = useState<string>('');
    const [dataDevolucao, setDataDevolucao] = useState<string>('');

    function formatCPF(cpf: string): string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

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

    const cadastrarLocacao = async () => {

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
            const response = await axios.post(`${API_URL}/api/backend/locacao/register/`, locacaoData);
            Alert.alert('Sucesso', 'Locação realizada com sucesso!');
            navigation.navigate('telaHomeDefinitiva');
        } catch (error) {
            console.error('Erro ao registrar veículo:', error);
            Alert.alert('Erro', 'Não foi possível registrar o veículo.');
        }

    };

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

            <TouchableOpacity style={styles.button} onPress={cadastrarLocacao}>
                <Text style={styles.buttonText}>Alocar</Text>
            </TouchableOpacity>

            <BR />
        </ScrollView>
    )

}