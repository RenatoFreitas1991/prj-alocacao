import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import styles from './TelaManutencaoVeiculoStyle';
import BR from '../../../components/BR/BR';

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../routes/types";

import { API_URL } from '@env';
import axios from 'axios';

type NavigationProp = NativeStackNavigationProp<StackParamList, 'telaHomeDefinitiva'>;

export default function TelaManutencaoVeiculo() {
    const navigation = useNavigation<NavigationProp>();

    const [placa, setPlaca] = useState('');
    const [dataManutencao, setDataManutencao] = useState<string>('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        const formDate = (date: Date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        setDataManutencao(formDate(new Date));
    }, []);

    const cadastrarManutencao = async () => {

        const manutencaoData = {
            placa,
            dataManutencao,
            descricao,
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

    return(
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View>
                <Text style={styles.titulo}>Manutenção do Veículo</Text>
            </View>

            {/* <View style={styles.viewImg}>

            </View> */}

            {/* <View style={{ marginBottom: 15 }}>
                <Button title="Tirar Foto do Veículo"/>
            </View> */}

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

            <TouchableOpacity style={styles.button} onPress={cadastrarManutencao}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <BR />
        </ScrollView>
    )

}