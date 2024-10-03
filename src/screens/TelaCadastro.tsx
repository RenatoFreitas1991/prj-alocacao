import React, { useState } from "react";
import { Button, Text, TextInput, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import styles from "./styles/style";
import pickerSelectStyles from "./styles/selectStyles";

export default function TelaCadastro() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [orgaoExpeditor, setOrgaoExpeditor] = useState('');
    const [cnh, setCnh] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [profissao, setProfissao] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('Solteiro');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');


    const fetchAddress = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                throw new Error('CEP não encontrado');
            }
            // Preenchendo os campos automaticamente com a resposta da API
            setCidade(data.localidade);
            setRua(data.logradouro);
            setBairro(data.bairro);
        } catch (error) {
            Alert.alert('Erro', 'CEP inválido ou não encontrado.');
            setCidade('');
            setRua('');
            setBairro('');
        }
    };
    function mostrarDadosCadastrados() {
        console.log('Nome: ', nome);
        console.log('Data de nascimento: ', dataNascimento);
        console.log('Cpf: ', cpf);
        console.log('Rg: ', rg);
        console.log('Órgão expeditor: ', orgaoExpeditor);
        console.log('Cnh: ', cnh);
        console.log('Telefone: ', telefone);
        console.log('E-mail: ', email);
        console.log('Cep: ', cep);
        console.log('Cidade: ', cidade);
        console.log('Rua: ', rua);
        console.log('Bairro: ', bairro);
        console.log('Numero:', numero);
        console.log('Profissão: ', profissao);
        console.log('Estado civil: ', estadoCivil);
        console.log('Senha: ', senha);
        
    }

    return(
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container2}>
                <Text style={styles.titulo}>Faça seu cadastro no App de alocação de veículo</Text>
                
                {/* Nome */}
                <Text>Nome:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                />

                {/* Data de Nascimento */}
                <Text>Data de Nascimento:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{ format: 'DD/MM/YYYY' }}
                    style={styles.input}
                    placeholder="Data de Nascimento"
                    value={dataNascimento}
                    onChangeText={setDataNascimento}
                />

                {/* CPF */}
                <Text>CPF:</Text>
                <TextInputMask
                    type={'custom'}
                    options={{ mask: '999.999.999-99' }}
                    style={styles.input}
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChangeText={setCpf}
                />

                {/* RG */}
                <Text>RG:</Text>
                <TextInputMask
                    type={'custom'}
                    options={{ mask: '999999999999-9' }}
                    style={styles.input}
                    placeholder="Digite seu RG"
                    value={rg}
                    onChangeText={setRg}
                />

                {/* Órgão Expeditor */}
                <Text>Órgão Expeditor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o órgão expeditor do RG"
                    value={orgaoExpeditor}
                    onChangeText={setOrgaoExpeditor}
                />

                {/* CNH */}
                <Text>CNH:</Text>
                <TextInputMask
                    type={'custom'}
                    options={{ mask: '99999999999' }}
                    style={styles.input}
                    placeholder="Digite o número de sua CNH"
                    value={cnh}
                    onChangeText={setCnh}
                />

                {/* Telefone */}
                <Text>Telefone:</Text>
                <TextInputMask
                    type={'custom'}
                    options={{ mask: '(99)9 9999-9999' }}
                    style={styles.input}
                    placeholder="Digite o número do seu telefone"
                    keyboardType="number-pad"
                    value={telefone}
                    onChangeText={setTelefone}
                />

                {/* E-mail */}
                <Text>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* CEP */}
                <Text>Cep:</Text>
                <TextInputMask
                    type={'custom'}
                    options={{ mask: '99999-999' }}
                    style={styles.input}
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChangeText={(value) => {
                        setCep(value);
                        if (value.length === 9) { // O CEP é preenchido quando contém 9 caracteres
                            fetchAddress(value);
                        }
                    }}
                />

                {/* Cidade, Rua e Bairro preenchidos automaticamente */}
                <Text>Cidade:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a cidade onde você mora"
                    value={cidade}
                    onChangeText={setCidade}
                />

                <Text>Rua:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a rua onde você mora"
                    value={rua}
                    onChangeText={setRua}
                />

                <Text>Bairro:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o bairro onde você mora"
                    value={bairro}
                    onChangeText={setBairro}
                />

                <Text>Número:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o número da sua residência"
                    value={numero}
                    onChangeText={setNumero}
                />

                {/* Profissão */}
                <Text>Profissão:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua profissão"
                    value={profissao}
                    onChangeText={setProfissao}
                />

                {/* Estado Civil */}
                <Text>Estado Civil:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setEstadoCivil(value)}
                    items={[
                        { label: 'Solteiro', value: 'Solteiro' },
                        { label: 'Casado', value: 'Casado' },
                        { label: 'Separado', value: 'Separado' },
                        { label: 'Divorciado', value: 'Divorciado' },
                        { label: 'Viúvo', value: 'Viúvo' },
                    ]}
                    value={estadoCivil}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Selecione seu estado civil', value: null }}
                />

                {/* Senha */}
                <Text>Senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                {/* Confirmar Senha */}
                <Text>Confirme sua senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />

                {/* Botões */}
                <View style={styles.botoesContainer}>
                    {/* Botão de Cadastrar */}
                    <TouchableOpacity style={[styles.botao, styles.botaoCadastrar]} onPress={mostrarDadosCadastrados}>
                        <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
                    </TouchableOpacity>

                    {/* Botão de Voltar */}
                    <TouchableOpacity style={[styles.botao, styles.botaoVoltar]} onPress={() => navigation.goBack()}>
                        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView> 
    );
}
