import React, { useState } from "react";
import { Button, Text, TextInput, View, ScrollView, Alert, TouchableOpacity, Vibration } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import styles from "./styles/TelaCadastroStyle";
import pickerSelectStyles from "./styles/selectStyles";

export default function TelaCadastro() {
    const navigation = useNavigation();

    // STATES DOS CAMPOS
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

    // STATES DAS MENSAGENS DE ERROR
    const [nomeError, setNomeError] = useState('');
    const [dataNascimentoError, setDataNascimentoError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [rgError, setRgError] = useState('');
    const [orgaoExpeditorError, setOrgaoExpeditorError] = useState('');
    const [cnhError, setCnhError] = useState('');
    const [telefoneError, setTelefoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cepError, setCepError] = useState('');
    const [cidadeError, setCidadeError] = useState('');
    const [ruaError, setRuaError] = useState('');
    const [bairroError, setBairroError] = useState('');
    const [numeroError, setNumeroError] = useState('');
    const [profissaoError, setProfissaoError] = useState('');
    const [estadoCivilError, setEstadoCivilError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [confirmarSenhaError, setConfirmarSenhaError] = useState('');


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
            <View style={styles.borda}></View>
            <View style={styles.container2}>
                <Text style={styles.titulo}>Faça seu Cadastro</Text>
                
                {/* Nome */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Nome:</Text>
                    <Text style={styles.errorMessage}>{nomeError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                {/* Data de Nascimento */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Data de Nascimento:</Text>
                    <Text style={styles.errorMessage}>{dataNascimentoError}</Text>
                    <TextInputMask
                        type={'datetime'}
                        options={{ format: 'DD/MM/YYYY' }}
                        style={styles.input}
                        placeholder="Data de Nascimento"
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                    />
                </View>

                {/* CPF */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>CPF:</Text>
                    <Text style={styles.errorMessage}>{cpfError}</Text>
                    <TextInputMask
                        type={'custom'}
                        options={{ mask: '999.999.999-99' }}
                        style={styles.input}
                        placeholder="Digite seu CPF"
                        value={cpf}
                        onChangeText={setCpf}
                    />
                </View>

                {/* RG */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>RG:</Text>
                    <Text style={styles.errorMessage}>{rgError}</Text>
                    <TextInputMask
                        type={'custom'}
                        options={{ mask: '999999999999-9' }}
                        style={styles.input}
                        placeholder="Digite seu RG"
                        value={rg}
                        onChangeText={setRg}
                    />
                </View>

                {/* Órgão Expeditor */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Órgão Expeditor</Text>
                    <Text style={styles.errorMessage}>{orgaoExpeditorError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o órgão expeditor do RG"
                        value={orgaoExpeditor}
                        onChangeText={setOrgaoExpeditor}
                    />
                </View>

                {/* CNH */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>CNH:</Text>
                    <Text style={styles.errorMessage}>{cnhError}</Text>
                    <TextInputMask
                        type={'custom'}
                        options={{ mask: '99999999999' }}
                        style={styles.input}
                        placeholder="Digite o número de sua CNH"
                        value={cnh}
                        onChangeText={setCnh}
                    />
                </View>

                {/* Telefone */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Telefone:</Text>
                    <Text style={styles.errorMessage}>{telefoneError}</Text>
                    <TextInputMask
                        type={'custom'}
                        options={{ mask: '(99)9 9999-9999' }}
                        style={styles.input}
                        placeholder="Digite o número do seu telefone"
                        keyboardType="number-pad"
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                </View>

                {/* E-mail */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>E-mail:</Text>
                    <Text style={styles.errorMessage}>{emailError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu e-mail"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* CEP */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Cep:</Text>
                    <Text style={styles.errorMessage}>{cepError}</Text>
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
                </View>

                {/* Cidade, Rua e Bairro preenchidos automaticamente */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Cidade:</Text>
                    <Text style={styles.errorMessage}>{cidadeError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a cidade onde você mora"
                        value={cidade}
                        onChangeText={setCidade}
                    />
                </View>

                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Rua:</Text>
                    <Text style={styles.errorMessage}>{ruaError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a rua onde você mora"
                        value={rua}
                        onChangeText={setRua}
                        keyboardType="default"
                    />
                </View>

                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Bairro:</Text>
                    <Text style={styles.errorMessage}>{bairroError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o bairro onde você mora"
                        value={bairro}
                        onChangeText={setBairro}
                    />
                </View>

                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Número:</Text>
                    <Text style={styles.errorMessage}>{numeroError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o número da sua residência"
                        value={numero}
                        onChangeText={setNumero}
                        keyboardType="numeric"
                    />
                </View>

                {/* Profissão */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Profissão:</Text>
                    <Text style={styles.errorMessage}>{profissaoError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua profissão"
                        value={profissao}
                        onChangeText={setProfissao}
                    />
                </View>

                {/* Estado Civil */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Estado Civil:</Text>
                    <Text style={styles.errorMessage}>{estadoCivilError}</Text>
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
                </View>

                {/* Senha */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Senha:</Text>
                    <Text style={styles.errorMessage}>{senhaError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>

                {/* Confirmar Senha */}
                <View style={styles.viewInput}>
                    <Text style={styles.textLabel}>Confirme sua senha:</Text>
                    <Text style={styles.errorMessage}>{confirmarSenhaError}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme sua senha"
                        secureTextEntry
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />
                </View>

                {/* Botões */}
                <View style={styles.botoesContainer}>
                    {/* Botão de Cadastrar */}
                    <TouchableOpacity style={[styles.botao, styles.botaoCadastrar]} onPress={() => mostrarDadosCadastrados()}>
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
