import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Button, Alert } from 'react-native';
import { API_URL } from '@env';
import styles from './TelaEditarLocacaoVeiculoStyle';
import BR from '../../../components/BR/BR';

import { RouteProp, useRoute, useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../../routes/types";

import axios from 'axios';

type TelaEditarLocacaoVeiculoRouteProp = RouteProp<StackParamList, 'TelaEditarLocacaoVeiculo'>;

type RouteParams = {
    id: number;
};

export default function TelaEditarLocacaoVeiculo() {
    
    const route = useRoute<TelaEditarLocacaoVeiculoRouteProp>();
    const navigation = useNavigation<NavigationProp<StackParamList>>();
    const [modalVisible, setModalVisible] = useState(false);
    const [idLocacao, setIdLocacao] = useState();
    const { id } = route.params;

    const [imagePath, setImageUri] = useState('');
    const [placa, setPlaca] = useState('');
    const [quilometragem, setQuilometragem] = useState('');
    const [cpfUsuario, setCPfUsuario] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');
    const [valorLocacao, setValorLocacao] = useState('');

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
                setIdLocacao(locacao.id_locacao);
                setValorLocacao(locacao.valor)
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
            dataEntrega,
            dataDevolucao,
            idLocacao,
            valorLocacao,
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
        setModalVisible(false);
        const locacaoData = {
            imagePath,
            placa,
            quilometragem,
            cpfUsuario,
            nomeUsuario,
            dataEntrega,
            dataDevolucao,
            idLocacao,
            valorLocacao,
        }

        try {
            await axios.put(`${API_URL}/api/backend/locacao/disponibilityUpdate/`, locacaoData);
            Alert.alert('Sucesso', 'Locação finalizada com sucesso!');
            //navigation.navigate('telaHomeDefinitiva');
            navigation.navigate('TelaAvaliacaoCliente', { cpf: cpfUsuario });
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

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setModalVisible(false)}
                activeOpacity={1}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalButton} >
                            <Text style={styles.modalButtonText} onPress={vehicleAvailabilityUpdate}>Finalizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} >
                            <Text style={styles.modalButtonText} onPress={() => setModalVisible(false)}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* <View style={styles.viewImg}>

            </View> */}

            <View style={{ marginBottom: 15 }}>
                <Button title="Tirar Foto do Veículo"/>
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Placa</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Placa" 
                    onChangeText={setPlaca} 
                    value={placa || ''} 
                    editable={false} 
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Quilometragem</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Quilometragem" 
                    onChangeText={setQuilometragem} 
                    value={quilometragem || quilometragem}
                    editable={false}
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>CPF do Usuário</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="CPF do Usuário" 
                    onChangeText={(text: string) => setCPfUsuario(formatCPF(text))} 
                    value={cpfUsuario || ''}
                    editable={false}
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Nome do Usuário</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Nome do Usuário" 
                    onChangeText={setNomeUsuario} 
                    value={nomeUsuario || ''}
                    editable={false}
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Data de Enterga</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Data de Devolução" 
                    onChangeText={setDataEntrega} 
                    value={dataEntrega || ''} 
                    editable={false}
                />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Data de Enterga</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Data de Devolução" 
                    onChangeText={setDataDevolucao} 
                    value={dataDevolucao || ''} />
            </View>

            <View style={styles.viewInput}>
                <Text style={styles.textLabel}>Data de Enterga</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Valor R$" 
                    onChangeText={setValorLocacao} 
                    value={valorLocacao || ''}
                    editable={false} 
                />
            </View>

            {/* <TouchableOpacity style={styles.button} onPress={vehicleAvailabilityUpdate}>
                <Text style={styles.buttonText}>Finalizar Locação</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Finalizar Locação</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={rentalVehicleUpdate}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <BR />
        </ScrollView>
        
    )

}