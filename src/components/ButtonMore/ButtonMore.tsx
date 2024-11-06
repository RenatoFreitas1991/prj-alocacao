import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ButtonMoreStye';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/stack.routes";

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function ButtonMore() {
    const navigation = useNavigation<NavigationPropInicial>();

    function abrirTelaEditarVeiculo() {
        navigation.navigate('CadastrarVeiculo');
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.containerBtnMore} onPress={abrirTelaEditarVeiculo}>
                <Icon name="plus" size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
}
