import React, { useState, useCallback, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../../routes/types";
import styles from "./TelaLoginUserStyle";
import { formatCPF, isValidCPF } from "../../../utils/cpfUtils";
import axios from "axios";
import { API_URL } from "@env";

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'LoginUser'>;

export default function TelaLogin() {
    const navigation = useNavigation<NavigationPropInicial>();
    const [cpf, setCpf] = useState("");
    const [cpfError, setCpfError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const passwordRef = useRef<string>("");

    const handleCpfChange = useCallback((text: string) => {
        const numericText = text.replace(/\D/g, "");
        if (numericText.length <= 11) {
            setCpf(formatCPF(numericText));
            setCpfError(null);
        }
    }, []);

    const validateInputs = useCallback(() => {
        let valid = true;
        if (cpf.length !== 14 || !isValidCPF(cpf)) {
            setCpfError("CPF inválido. Por favor, verifique.");
            valid = false;
        } else {
            setCpfError(null);
        }

        if (passwordRef.current.length < 6) {
            setPasswordError("A senha deve conter pelo menos 6 caracteres.");
            valid = false;
        } else {
            setPasswordError(null);
        }

        return valid;
    }, [cpf]);

    const handleLogin = useCallback(async () => {
        if (validateInputs()) {
            try {
                const numericCpf = cpf.replace(/\D/g, "");
    
                const response = await axios.post(`${API_URL}/api/auth/login`, {
                    cpf: numericCpf, 
                    senha: passwordRef.current,
                });
    
                if (response.status === 200) {
                    Keyboard.dismiss();
                    navigation.navigate("Tela_Home_User");
                }
            } catch (error: any) {
                if (error.response) {
                    if (error.response.status === 404) {
                        setCpfError("Usuário não encontrado.");
                    } else if (error.response.status === 401) {
                        setPasswordError("Senha incorreta.");
                    } else {
                        Alert.alert("Erro", "Erro ao fazer login. Tente novamente.");
                    }
                } else {
                    Alert.alert("Erro", "Erro ao conectar com o servidor. Tente novamente.");
                }
            }
        }
    }, [cpf, validateInputs, navigation]);

    const handleGoBack = useCallback(() => {
        Keyboard.dismiss();
        navigation.navigate("Home");
    }, [navigation]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <View style={styles.container2}>
                        <Text style={styles.titulo}>Bem-vindo de volta!</Text>
                        <Text style={styles.subtitulo}>Faça login para continuar</Text>

                        <View style={styles.viewInput}>
                            <TextInput
                                style={[styles.input, cpfError ? { borderColor: 'red', borderWidth: 1 } : null]}
                                placeholder="CPF"
                                placeholderTextColor="#aaa"
                                keyboardType="numeric"
                                value={cpf}
                                onChangeText={handleCpfChange}
                                accessibilityLabel="CPF input"
                            />
                            {cpfError && <Text style={styles.errorMessage}>{cpfError}</Text>}
                            
                            <TextInput
                                style={[styles.input, passwordError ? { borderColor: 'red', borderWidth: 1 } : null]}
                                placeholder="Senha"
                                secureTextEntry
                                placeholderTextColor="#aaa"
                                onChangeText={(text) => {
                                    passwordRef.current = text;
                                    setPasswordError(null);
                                }}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                accessibilityLabel="Password input"
                            />
                            {passwordError && <Text style={styles.errorMessage}>{passwordError}</Text>}
                        </View>

                        <View style={styles.botoesContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleLogin}
                                accessibilityRole="button"
                                accessibilityLabel="Entrar">
                                <Text style={styles.buttonText}>Entrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.buttonSecondary}
                                onPress={handleGoBack}
                                accessibilityRole="button"
                                accessibilityLabel="Voltar">
                                <Text style={styles.buttonTextSecondary}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}
