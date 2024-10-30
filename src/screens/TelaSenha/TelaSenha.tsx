import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Vibration } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from "../../routes/stack.routes";
import styles from "../TelaCadastro/TelaCadastroStyle";
import axios from 'axios';
import { API_URL } from '@env';
// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<StackParamList, 'TelaSenha'>;
type TelaSenhaRouteProp = RouteProp<StackParamList, 'TelaSenha'>;

export default function TelaSenha() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<TelaSenhaRouteProp>();
    const { userData } = route.params;

    // States for password and confirmation
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // States for error messages
    const [senhaError, setSenhaError] = useState('');
    const [confirmarSenhaError, setConfirmarSenhaError] = useState('');

    // Function to validate and handle form submission
    const handleFinalizarCadastro = async () => {
        let valid = true;
      
        // Validação da senha
        if (senha.length < 6) {
          setSenhaError('A senha deve ter no mínimo 6 caracteres.');
          Vibration.vibrate()
          valid = false;
        } else {
          setSenhaError('');
        }
      
        // Validação da confirmação de senha
        if (senha !== confirmarSenha) {
          setConfirmarSenhaError('As senhas não coincidem.');
          Vibration.vibrate()
          valid = false;
        } else {
          setConfirmarSenhaError('');
        }
      
        // Se tudo estiver válido, envia os dados ao backend
        if (valid) {
          // Ajusta os nomes dos campos para corresponder ao backend
          const registrationData = {
            nome: userData.nome,
            nascimento: userData.dataNascimento,
            cpf: userData.cpf,
            rg: userData.rg,
            orgao_expedidor: userData.orgaoExpeditor,
            cnh: userData.cnh,
            telefone: userData.telefone,
            email: userData.email,
            cep: userData.cep,
            cidade: userData.cidade,
            rua: userData.rua,
            bairro: userData.bairro,
            numero: userData.numero,
            profissao: userData.profissao,
            estado_civil: userData.estadoCivil,
            senha
        };
      
        try {
            const response = await axios.post(`${API_URL}/api/register`, registrationData);
            Alert.alert('Sucesso', 'Cadastro finalizado com sucesso!');
            navigation.navigate('Home'); // Navegue para a tela desejada
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            Alert.alert('Erro', 'Não foi possível registrar o usuário.');
        }
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
