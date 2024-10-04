import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity, Dimensions, Alert } from "react-native";
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/stack.routes"; 
import styles from "./styles/TelaCadastroStyle";
import pickerSelectStyles from "./styles/selectStyles";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, runOnJS } from 'react-native-reanimated';


type NavigationProp = NativeStackNavigationProp<StackParamList, 'Cadastro'>;

const ErrorMessage = ({ error }: { error: string }) => (
    error ? <Text style={styles.errorMessage}>{error}</Text> : null
);

const InputField = ({
    label,
    value,
    placeholder,
    onChangeText,
    error,
    keyboardType = "default",
    mask,
    maskOptions
}: any) => (
    <View style={styles.viewInput}>
        <Text style={styles.textLabel}>{label}</Text>
        <ErrorMessage error={error} />
        {mask ? (
            <TextInputMask
                type={mask}
                options={maskOptions}
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        ) : (
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        )}
    </View>
);

export default function TelaCadastro() {
    const navigation = useNavigation<NavigationProp>();

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

    const [step, setStep] = useState(1);


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

    // Validações e mudança de estado ao clicar "Avançar"
    const nextStep = () => {
        switch (step) {
            case 1:
                if (!nome.trim()) {
                    setNomeError('O campo nome é obrigatório.');
                    return;
                }
                setNomeError('');
                break;
            case 2:
                if (!dataNascimento.trim()) {
                    setDataNascimentoError('O campo data de nascimento é obrigatório.');
                    return;
                }
                setDataNascimentoError('');
                break;
            case 3:
                if (!cpf.trim()) {
                    setCpfError('O campo CPF é obrigatório.');
                    return;
                }
                setCpfError('');
                break;
            case 4:
                if (!rg.trim()) {
                    setRgError('O campo RG é obrigatório.');
                    return;
                }
                setRgError('');
                break;
            case 5:
                if (!orgaoExpeditor.trim()) {
                    setOrgaoExpeditorError('O campo órgão expeditor é obrigatório.');
                    return;
                }
                setOrgaoExpeditorError('');
                break;
            case 6:
                if (!cnh.trim()) {
                    setCnhError('O campo CNH é obrigatório.');
                    return;
                }
                setCnhError('');
                break;
            case 7:
                if (!telefone.trim()) {
                    setTelefoneError('O campo telefone é obrigatório.');
                    return;
                }
                setTelefoneError('');
                break;
            case 8:
                if (!email.trim()) {
                    setEmailError('O campo e-mail é obrigatório.');
                    return;
                }
                setEmailError('');
                break;
            case 9:
                if (!cep.trim()) {
                    setCepError('O campo CEP é obrigatório.');
                    return;
                }
                setCepError('');
                break;
            case 10:
                if (!cidade.trim()) {
                    setCidadeError('O campo cidade é obrigatório.');
                    return;
                }
                setCidadeError('');
                break;
            case 11:
                if (!rua.trim()) {
                    setRuaError('O campo rua é obrigatório.');
                    return;
                }
                setRuaError('');
                break;
            case 12:
                if (!bairro.trim()) {
                    setBairroError('O campo bairro é obrigatório.');
                    return;
                }
                setBairroError('');
                break;
            case 13:
                if (!numero.trim()) {
                    setNumeroError('O campo número é obrigatório.');
                    return;
                }
                setNumeroError('');
                break;
            case 14:
                if (!profissao.trim()) {
                    setProfissaoError('O campo profissão é obrigatório.');
                    return;
                }
                setProfissaoError('');
                break;
            case 15:
                if (!estadoCivil.trim()) {
                    setEstadoCivilError('O campo estado civil é obrigatório.');
                    return;
                }
                setEstadoCivilError('');
                break;
            default:
                break;
        }

        // Muda para o próximo step
        if (step < 15) {
            setStep(prev => prev + 1);
        } else {
            navigation.navigate('TelaSenha');
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        }
    };

    const fetchAddress = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) throw new Error('CEP não encontrado');
            setCidade(data.localidade);
            setRua(data.logradouro);
            setBairro(data.bairro);
        } catch {
            Alert.alert('Erro', 'CEP inválido ou não encontrado.');
            setCidade('');
            setRua('');
            setBairro('');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <InputField
                        label="Nome"
                        value={nome}
                        placeholder="Digite seu nome"
                        onChangeText={setNome}
                        error={nomeError}
                    />
                );
            case 2:
                return (
                    <InputField
                        label="Data de Nascimento"
                        value={dataNascimento}
                        placeholder="Digite sua data de nascimento"
                        onChangeText={setDataNascimento}
                        error={dataNascimentoError}
                        mask="custom"
                        maskOptions={{ mask: '99/99/9999' }}
                    />
                );
            case 3:
                return (
                    <InputField
                        label="CPF"
                        value={cpf}
                        placeholder="Digite seu CPF"
                        onChangeText={setCpf}
                        error={cpfError}
                        mask="custom"
                        maskOptions={{ mask: '999.999.999-99' }}
                    />
                );
            case 4:
                return (
                    <InputField
                        label="RG"
                        value={rg}
                        placeholder="Digite seu RG"
                        onChangeText={setRg}
                        error={rgError}
                        mask="custom"
                        maskOptions={{ mask: '999999999999-9' }}
                    />
                );
            case 5:
                return (
                    <InputField
                        label="Órgão Expeditor"
                        value={orgaoExpeditor}
                        placeholder="Digite o órgão expeditor do RG"
                        onChangeText={setOrgaoExpeditor}
                        error={orgaoExpeditorError}
                    />
                );
            case 6:
                return (
                    <InputField
                        label="CNH"
                        value={cnh}
                        placeholder="Digite o número de sua CNH"
                        onChangeText={setCnh}
                        error={cnhError}
                        mask="custom"
                        maskOptions={{ mask: '99999999999' }}
                    />
                );
            case 7:
                return (
                    <InputField
                        label="Telefone"
                        value={telefone}
                        placeholder="Digite o número do seu telefone"
                        onChangeText={setTelefone}
                        error={telefoneError}
                        mask="custom"
                        maskOptions={{ mask: '(99)9 9999-9999' }}
                        keyboardType="number-pad"
                    />
                );
            case 8:
                return (
                    <InputField
                        label="E-mail"
                        value={email}
                        placeholder="Digite seu e-mail"
                        onChangeText={setEmail}
                        error={emailError}
                        keyboardType="email-address"
                    />
                );
            case 9:
                return (
                    <InputField
                        label="CEP"
                        value={cep}
                        placeholder="Digite seu CEP"
                        onChangeText={(text: string) => {
                            setCep(text);
                            if (text.length === 9) fetchAddress(text);
                        }}
                        error={cepError}
                        mask="custom"
                        maskOptions={{ mask: '99999-999' }}
                    />
                );
            case 10:
                return (
                    <InputField
                        label="Cidade"
                        value={cidade}
                        placeholder="Digite a cidade onde você mora"
                        onChangeText={setCidade}
                        error={cidadeError}
                    />
                );
            case 11:
                return (
                    <InputField
                        label="Rua"
                        value={rua}
                        placeholder="Digite a rua onde você mora"
                        onChangeText={setRua}
                        error={ruaError}
                    />
                );
            case 12:
                return (
                    <InputField
                        label="Bairro"
                        value={bairro}
                        placeholder="Digite o bairro onde você mora"
                        onChangeText={setBairro}
                        error={bairroError}
                    />
                );
            case 13:
                return (
                    <InputField
                        label="Número"
                        value={numero}
                        placeholder="Digite o número da sua residência"
                        onChangeText={setNumero}
                        error={numeroError}
                        keyboardType="numeric"
                    />
                );
            case 14:
                return (
                    <InputField
                        label="Profissão"
                        value={profissao}
                        placeholder="Digite sua profissão"
                        onChangeText={setProfissao}
                        error={profissaoError}
                    />
                );
            case 15:
                return (
                    <View style={styles.viewInput}>
                        <Text style={styles.textLabel}>Estado Civil:</Text>
                        <ErrorMessage error={estadoCivilError} />
                        <RNPickerSelect
                            onValueChange={setEstadoCivil}
                            items={[
                                { label: 'Solteiro', value: 'Solteiro' },
                                { label: 'Casado', value: 'Casado' },
                                { label: 'Divorciado', value: 'Divorciado' },
                            ]}
                            value={estadoCivil}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Selecione seu estado civil', value: null }}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Faça seu Cadastro</Text>
                {renderStep()}
                <View style={styles.botoesContainer}>
                    {step > 1 && (
                        <TouchableOpacity style={[styles.botao, styles.botaoVoltar]} onPress={prevStep}>
                            <Text style={styles.textoBotaoVoltar}>Voltar</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={[styles.botao, styles.botaoCadastrar]} onPress={nextStep}>
                        <Text style={styles.textoBotaoCadastrar}>
                            {step === 15 ? 'Concluir' : 'Avançar'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}