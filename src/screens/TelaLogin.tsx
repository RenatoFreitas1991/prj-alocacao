import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../routes/stack.routes"; // Import StackParamList type
import styles from "./styles/TelaCadastroStyle";

// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<StackParamList, 'Login'>;

export default function TelaLogin() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Entre na sua conta do App de alocação de veículo</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
            />
            <View style={styles.botoesContainer}>
                <View style={styles.botao}>
                    <Button
                        title="Entrar"
                        onPress={() => {/* Login logic here */}}
                    />
                </View>
                <View style={styles.botao}>
                    <Button
                        title="Voltar"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </View>
    );
}
