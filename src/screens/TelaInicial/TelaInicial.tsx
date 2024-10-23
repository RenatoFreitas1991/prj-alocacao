import React from "react";
import { Button, Text, View, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes/stack.routes"; // Import the StackParamList
import styles from "./TelaInicialStyle";
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
            <View style={styles.viewText}>
                <Text style={[styles.titulo, styles.bemVindo]}>Bem vindo</Text>
                <Text style={styles.titulo}>Ao seu App de alocação de veículo.</Text>
            </View>
                <Image
                    source={require('../../../assets/carro-tela-inicial.png')}
                    style={styles.img}
                />
            <View style={styles.botoesContainer}>
                
                <View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={abrirTelaLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={abrirTelaCadastro}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
