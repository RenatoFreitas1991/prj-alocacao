import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native';
import styles from './TelaManutencaoVeiculoStyle';
import BR from '../../../components/BR/BR';

export default function TelaManutencaoVeiculo() {

    const [placa, setPlaca] = useState('');
    const [dataManutencao, setDataManutencao] = useState<string>('');

    useEffect(() => {
        const formDate = (date: Date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        setDataManutencao(formDate(new Date));
    }, []);

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
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={setPlaca} 
                    value={placa || ''} />
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <BR />
        </ScrollView>
    )

}