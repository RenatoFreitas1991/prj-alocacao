import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../../routes/types"; // Import StackParamList type
import styles from "./TelaLoginStyle";

// Define the navigation prop type
type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'LoginAdmin'>;

export default function TelaLogin() {
    const navigation = useNavigation<NavigationPropInicial>();

    function abrirTelaHomeUsuario() {
        navigation.navigate("telaHomeDefinitiva");
    }

    function abrirTelaInicial() {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.titulo}>Login</Text>
                <View style={styles.viewInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#7A89A6"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry
                        placeholderTextColor="#7A89A6"
                    />
                </View>
                <View style={styles.botoesContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={abrirTelaHomeUsuario}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonSecondary}
                        onPress={abrirTelaInicial}>
                        <Text style={styles.buttonTextSecondary}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
