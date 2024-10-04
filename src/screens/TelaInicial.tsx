import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/stack.routes"; // Import the StackParamList
import styles from "./styles/TelaCadastroStyle";
import { useNavigation } from "@react-navigation/native";

// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

export default function TelaInicial() {
    const navigation = useNavigation<NavigationProp>();

    function abrirTelaLogin() {
        navigation.navigate('Login');
    }

    function abrirTelaCadastro() {
        navigation.navigate('Cadastro');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Bem vindo ao App de alocação de veículo</Text>
            <View style={styles.botoesContainer}>
                <View style={styles.botao}>
                    <Button
                        title="Entrar"
                        onPress={abrirTelaLogin}
                    />
                </View>
                <View style={styles.botao}>
                    <Button
                        title="Cadastrar"
                        onPress={abrirTelaCadastro}
                    />
                </View>
            </View>
        </View>
    );
}
