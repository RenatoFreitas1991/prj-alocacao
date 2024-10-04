import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/stack.routes"; // Import StackParamList type
import styles from "./styles/TelaCadastroStyle";

// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<StackParamList, 'TelaSenha'>;

export default function TelaSenha() {
    const navigation = useNavigation<NavigationProp>(); // Use typed navigation

    

    // States for password and confirmation
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // States for error messages
    const [senhaError, setSenhaError] = useState('');
    const [confirmarSenhaError, setConfirmarSenhaError] = useState('');

    // Function to validate and handle form submission
    const handleFinalizarCadastro = () => {
        let valid = true;

        // Validating password
        if (senha.length < 6) {
            setSenhaError('A senha deve ter no mínimo 6 caracteres.');
            valid = false;
        } else {
            setSenhaError('');
        }

        // Validating password confirmation
        if (senha !== confirmarSenha) {
            setConfirmarSenhaError('As senhas não coincidem.');
            valid = false;
        } else {
            setConfirmarSenhaError('');
        }

        // If everything is valid, call the function to finalize the registration
        if (valid) {
            Alert.alert('Sucesso', 'Cadastro finalizado com sucesso!');
            // You can call mostrarDadosCadastrados() or another function here
            // Finalize the registration or move to the Home screen
            navigation.navigate('Home'); // Navigate to Home or another screen as needed
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Cadastro de Senha</Text>

                {/* Senha */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Senha:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry
                        value={senha}
                        onChangeText={setSenha}
                    />
                    {senhaError ? <Text style={styles.errorMessage}>{senhaError}</Text> : null}
                </View>

                {/* Confirmar Senha */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Confirme sua senha:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme sua senha"
                        secureTextEntry
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />
                    {confirmarSenhaError ? <Text style={styles.errorMessage}>{confirmarSenhaError}</Text> : null}
                </View>

                {/* Botão de Finalizar Cadastro */}
                <TouchableOpacity style={[styles.botao, styles.botaoCadastrar]} onPress={handleFinalizarCadastro}>
                    <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
                </TouchableOpacity>

                {/* Botão de Voltar */}
                <TouchableOpacity style={[styles.botao, styles.botaoVoltar]} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoBotaoVoltar}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
