import React, {useState} from "react";
import {
    Button,
    View,
    Text,
    TextInput,
    ScrollView,
    Alert
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from "../../routes/stack.routes";

import { Picker } from '@react-native-picker/picker';
import BR from '../../components/BR/BR';
import styles from "./CadastrarVeiculoStyles";
import axios from 'axios';
import { API_URL } from '@env';

type NavigationProp = NativeStackNavigationProp<StackParamList, 'TelaSenha'>;
type TelaSenhaRouteProp = RouteProp<StackParamList, 'TelaSenha'>;

export default function CadastrarVeiculo() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<TelaSenhaRouteProp>();

    const [tipo, setTipo] = useState('Motocicleta'); // tipo de veículo: carro ou moto
    const [marca, setMarca] = useState('Chevrolet'); // marca do veículo
    const [modelo, setModelo] = useState(''); // modelo do veículo
    const [cor, setCor] = useState(''); // cor do veículo
    const [combustivel, setCombustivel] = useState('Gasolina Comum'); // tipo de combustivel
    const [placa, setPlaca] = useState(''); // placa do veículo
    const [chassi, setChassi] = useState(''); // chassi do veículo
    const [motor, setMotor] = useState(''); // motor do veículo
    const [ano, setAno] = useState(''); // ano de fabricação do veículo
    const [quilometragem, setquilometragem] = useState(''); // quilometragem do veículo

    function mostrarVeiculoCadastrado() {
        console.log(`Tipo: ${tipo}\n` +
            `Marca: ${marca}\n` +
            `Modelo: ${modelo}\n` +
            `Cor: ${cor}\n` +
            `Combustivel: ${combustivel}\n` +
            `Placa: ${placa}\n` +
            `Chassi: ${chassi}\n` +
            `Motor: ${motor}\n` +
            `Ano: ${ano}\n` +
            `Quilometragem: ${quilometragem}\n`
        );
    }

    const cadastrarVeiculo = async () => {

        const vehicleData = {
            tipo,
            marca,
            modelo,
            cor,
            combustivel,
            placa,
            chassi,
            motor,
            ano,
            quilometragem
        }

        try {
            const response = await axios.post(`${API_URL}/api/vehicles/`, vehicleData);
            Alert.alert('Sucesso', 'Cadastro finalizado com sucesso!');
            navigation.navigate('NaoAlugados'); // Navegue para a tela desejada
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            Alert.alert('Erro', 'Não foi possível registrar o usuário.');
        }
    }

    return(
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Cadastrar novo veículo</Text>
                <Text style={styles.label}>Tipo de veículo:</Text>
                <Picker
                    selectedValue={tipo}
                    onValueChange={(itemValue) => setTipo(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Motocicleta" value="Motocicleta" />
                    <Picker.Item label="Carro" value="Carro" />
                </Picker>
                <Text style={styles.label}>Marca:</Text>
                <Picker
                    selectedValue={marca}
                    onValueChange={(itemValue) => setMarca(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Chevrolet" value="Chevrolet" />
                    <Picker.Item label="Citroën" value="Citroën" />
                    <Picker.Item label="Fiat" value="Fiat" />
                    <Picker.Item label="Ford" value="Ford" />
                </Picker>
                <Text style={styles.label}>Modelo:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Modelo"
                    value={modelo}
                    onChangeText={setModelo}
                />
                <Text style={styles.label}>Cor:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cor de veículo"
                    value={cor}
                    onChangeText={setCor}
                />
                <Text style={styles.label}>Combustível:</Text>
                <Picker
                    selectedValue={combustivel}
                    onValueChange={(itemValue) => setCombustivel(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Gasolina Comum" value="Gasolina Comum" />
                    <Picker.Item label="Gasolina Aditivada" value="Gasolina Aditivada" />
                    <Picker.Item label="Etanol" value="Etanol" />
                    <Picker.Item label="Eletricidade" value="Eletricidade" />
                </Picker>
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
                    placeholder="ano"
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
            <BR/>
        </ScrollView>
    )
}