import React, { useState, useCallback, useRef } from "react";
import { Text, TextInput, View, TouchableOpacity, Keyboard, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../../routes/types"; // Import StackParamList type
import styles from "./TelaLoginStyle";
import axios from 'axios';
import { API_URL } from '@env';
import BR from "src/components/BR/BR";

// Define the navigation prop type
type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'LoginAdmin'>;

export default function TelaLogin() {
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const passwordRef = useRef<string>("");
    const emailRef = useRef<string>("");

    const navigation = useNavigation<NavigationPropInicial>();

    function abrirTelaHomeUsuario() {
        navigation.navigate("telaHomeDefinitiva");
    }

    function abrirTelaInicial() {
        navigation.navigate("Home");
    }

    const validateInputs = useCallback(() => {
        let valid = true;

        if(!emailRef.current.includes("@")) {
            setEmailError("O E-mail deve conter o @");
            valid = false;
        } else {
            setEmailError(null);
        }

        if (passwordRef.current.length < 6) {
            setPasswordError("A senha deve conter pelo menos 6 caracteres.");
            valid = false;
        } else {
            setPasswordError(null);
        }

        return valid;
    }, [passwordRef]);

    const handleLogin = useCallback(async () => {
        if (validateInputs()) {
            try {
                const response = await axios.post(`${API_URL}/api/backend/auth/login/admin`, {
                    email: emailRef.current,
                    senha: passwordRef.current,
                });

                if (response.status === 200) {
                    Keyboard.dismiss();
                    navigation.navigate("telaHomeDefinitiva");
                }
            } catch (error: any) {
                if (error.response) {
                    if (error.response.status === 404) {
                        setEmailError("Admin não encontrado.");
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
    }, [emailRef, validateInputs, navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.titulo}>Login</Text>
                <View style={styles.viewInput}>
                    <TextInput
                        style={[styles.input, passwordError ? { borderColor: 'red', borderWidth: 1 } : null]}
                        placeholder="E-mail"
                        placeholderTextColor="#aaa"
                        keyboardType="default"
                        onChangeText={(text) => {
                            emailRef.current = text;
                            setPasswordError(null);
                        }}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    {emailError && <Text style={styles.errorMessage}>{emailError} <BR/></Text>}
                    <TextInput
                        style={[styles.input, passwordError ? { borderColor: 'red', borderWidth: 1 } : null]}
                        placeholder="Senha"
                        secureTextEntry
                        placeholderTextColor="#aaa"
                        keyboardType="default"
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
                        onPress={handleLogin}>
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
