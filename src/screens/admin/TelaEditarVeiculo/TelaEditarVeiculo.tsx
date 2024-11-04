import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

import styles from './TeleEditarVeiculoStyle';
import BR from '../../../components/BR/BR';

type RouteParams = {
    modeloProp:string;
    marcaProp:string;
    placaProp:string;
};

export default function TelaEditarVeiculo() {

    const route = useRoute();
    const { modeloProp, marcaProp, placaProp } = route.params as RouteParams;

    const [modelo, setModelo] = useState("");
    const [marca, setMarca] = useState("");
    const [cor, setCor] = useState("");
    const [placa, setPlaca] = useState("");
    const [combustivel, setCombustivel] = useState("");
    const [chassi, setChassi] = useState("");
    const [motor, setMotor] = useState("");
    const [ano, setAno] = useState("");
    const [quilometragem, setQuilometragem] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [dataDevolucao, setDataDevolucao] = useState("");
    const [tipoDevolucao, setTipoDevolucao] = useState("");

    return(
        <ScrollView style={styles.scrollView}>

            <View style={styles.viewTitulo}>
                <Text style={styles.titulo}>Editar veículo</Text>
            </View>

            {/* <Image style={styles.img} source={require('../../../assets/moto-img.jpg')} /> */}

            <View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Modelo</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setModelo}
                        value={modeloProp || modelo}
                        placeholder='Modelo'
                        keyboardType='default'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Marca</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setMarca}
                        value={marcaProp|| marca}
                        placeholder='Marca'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Cor</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCor}
                        value={cor}
                        placeholder='Cor'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Placa</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPlaca}
                        value={placaProp || placa}
                        placeholder='Placa'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Combustível</Text>
                    <TextInput
                        style={styles.input}
                        value={combustivel}
                        onChangeText={setCombustivel}
                        placeholder='Combustível'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Chassi</Text>
                    <TextInput
                        style={styles.input}
                        value={chassi}
                        onChangeText={setChassi}
                        placeholder='Chassi'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Motor</Text>
                    <TextInput
                        style={styles.input}
                        value={motor}
                        onChangeText={setMotor}
                        placeholder='Motor'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Ano</Text>
                    <TextInput
                        style={styles.input}
                        value={ano}
                        onChangeText={setAno}
                        placeholder='Ano'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Quilometragem</Text>
                    <TextInput
                        style={styles.input}
                        value={quilometragem}
                        onChangeText={setQuilometragem}
                        placeholder='Quilometragem'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Data de Entrega:</Text>
                    <TextInput
                        style={styles.input}
                        value={dataEntrega}
                        onChangeText={setDataEntrega}
                        placeholder='Data de Entrega:'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Data de Devolução</Text>
                    <TextInput
                        style={styles.input}
                        value={dataDevolucao}
                        onChangeText={setDataDevolucao}
                        placeholder='Data de Devolução:'
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Tipo do Veículo</Text>
                    <TextInput
                        style={styles.input}
                        value={tipoDevolucao}
                        onChangeText={setTipoDevolucao}
                        placeholder='Tipo do Veículo'
                    />
                </View>
                <View style={styles.viewInput}>
                    <TouchableOpacity
                        style={styles.button}>
                        <Text style={styles.buttonText}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewInput}>

                </View>
            </View>
        </ScrollView>
    )
}