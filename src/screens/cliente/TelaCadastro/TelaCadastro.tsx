import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInputMask } from "react-native-masked-text";
import RNPickerSelect from "react-native-picker-select";
import styles from "./TelaCadastroStyle";
import pickerSelectStyles from "../../styles/selectStyles";
import useStep from "../../../hooks/useStep";
import fetchAddress from '../../../hooks/cepRequest';
import { fetchProfissoes, fetchEstadosCivis } from './fetchs';
//import { API_URL } from '@env';
import { StackParamList } from '../../../routes/types';
import { formatCPF, isValidCPF } from "../../../utils/cpfUtils";

type TelaCadastroNavigationProp = NativeStackNavigationProp<StackParamList, 'Cadastro'>;

const ErrorMessage = ({ error }: { error: string }) =>
  error ? <Text style={styles.errorMessage}>{error}</Text> : null;

const InputField = React.forwardRef(
  (
    {
      label,
      value,
      placeholder,
      onChangeText,
      error,
      keyboardType = "default",
      mask,
      maskOptions,
      returnKeyType = "next",
      onSubmitEditing,
    }: any,
    ref: any
  ) => (
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
            refInput={ref}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
        />
      ) : (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            ref={ref}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
        />
      )}
    </View>
  )
);

export default function TelaCadastro() {
  const {
    step,
    nextStep,
    prevStep,
    nome,
    setNome,
    dataNascimento,
    setDataNascimento,
    cpf,
    setCpf,
    rg,
    setRg,
    orgaoExpeditor,
    setOrgaoExpeditor,
    cnh,
    setCnh,
    telefone,
    setTelefone,
    email,
    setEmail,
    cep,
    setCep,
    cidade,
    setCidade,
    rua,
    setRua,
    bairro,
    setBairro,
    numero,
    setNumero,
    profissao,
    setProfissao,
    estadoCivil,
    setEstadoCivil,
    error,
  } = useStep();

  const nomeRef = useRef<TextInput>(null);
  const dataNascimentoRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const rgRef = useRef<TextInput>(null);
  const orgaoExpeditorRef = useRef<TextInput>(null);
  const cnhRef = useRef<TextInput>(null);
  const telefoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const cepRef = useRef<TextInput>(null);
  const cidadeRef = useRef<TextInput>(null);
  const ruaRef = useRef<TextInput>(null);
  const bairroRef = useRef<TextInput>(null);
  const numeroRef = useRef<TextInput>(null);
  const [estadosCivis, setEstadosCivis] = useState<Array<{ label: string; value: string }>>([]);
  const [profissoes, setProfissoes] = useState<Array<{ label: string; value: string }>>([]);
  const navigation = useNavigation<TelaCadastroNavigationProp>();

  const handleNextStep = () => {
    if (step === 3 && !isValidCPF(cpf)) { // Validação do CPF
      alert("CPF inválido");
      return;
    }

    if (step < 15) {
      nextStep();
    } else {
      const userData = {
        nome,
        dataNascimento,
        cpf,
        rg,
        orgaoExpeditor,
        cnh,
        telefone,
        email,
        cep,
        cidade,
        rua,
        bairro,
        numero,
        profissao,
        estadoCivil,
      };
      navigation.navigate('TelaSenha', { userData });
    }
  };

  useEffect(() => {
    nomeRef.current?.focus();

    const loadData = async () => {
      try {
        const profissaoItems = await fetchProfissoes();
        setProfissoes(profissaoItems);

        const estadosCivisItems = await fetchEstadosCivis();
        setEstadosCivis(estadosCivisItems);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <InputField
            ref={nomeRef}
            label="Nome Completo"
            value={nome}
            placeholder="Digite seu nome completo"
            onChangeText={setNome}
            error={error}
            returnKeyType="next"
            onSubmitEditing={() => dataNascimentoRef.current?.focus()}
          />
        );
      case 2:
        return (
          <InputField
            ref={dataNascimentoRef}
            label="Data de Nascimento"
            value={dataNascimento}
            placeholder="Digite sua data de nascimento"
            onChangeText={setDataNascimento}
            error={error}
            mask="custom"
            maskOptions={{ mask: '99/99/9999' }}
            returnKeyType="next"
            onSubmitEditing={() => cpfRef.current?.focus()}
          />
        );
      case 3:
        return (
          <InputField
            ref={cpfRef}
            label="CPF"
            value={cpf}
            placeholder="Digite seu CPF"
            onChangeText={(text: string) => setCpf(formatCPF(text))} // Formatação de CPF
            error={error}
            mask="custom"
            maskOptions={{ mask: '999.999.999-99' }}
            returnKeyType="next"
            onSubmitEditing={() => rgRef.current?.focus()}
          />
        );
      case 4:
        return (
          <InputField
            ref={rgRef}
            label="RG"
            value={rg}
            placeholder="Digite seu RG"
            onChangeText={setRg}
            error={error}
            mask="custom"
            maskOptions={{ mask: '999999999999-9' }}
            returnKeyType="next"
            onSubmitEditing={() => orgaoExpeditorRef.current?.focus()}
          />
        );
      case 5:
        return (
          <InputField
            ref={orgaoExpeditorRef}
            label="Órgão Expeditor"
            value={orgaoExpeditor}
            placeholder="Digite o órgão expeditor do RG"
            onChangeText={setOrgaoExpeditor}
            error={error}
            returnKeyType="next"
            onSubmitEditing={() => cnhRef.current?.focus()}
          />
        );
      case 6:
        return (
          <InputField
            ref={cnhRef}
            label="CNH"
            value={cnh}
            placeholder="Digite o número de sua CNH"
            onChangeText={setCnh}
            error={error}
            mask="custom"
            maskOptions={{ mask: '99999999999' }}
            returnKeyType="next"
            onSubmitEditing={() => telefoneRef.current?.focus()}
          />
        );
      case 7:
        return (
          <InputField
            ref={telefoneRef}
            label="Telefone"
            value={telefone}
            placeholder="Digite o número do seu telefone"
            onChangeText={setTelefone}
            error={error}
            mask="custom"
            maskOptions={{ mask: '(99)9 9999-9999' }}
            keyboardType="number-pad"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        );
      case 8:
        return (
          <InputField
            ref={emailRef}
            label="E-mail"
            value={email}
            placeholder="Digite seu e-mail"
            onChangeText={setEmail}
            error={error}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => cepRef.current?.focus()}
          />
        );
      case 9:
        return (
          <InputField
            ref={cepRef}
            label="CEP"
            value={cep}
            placeholder="Digite seu CEP"
            onChangeText={(text: string) => {
              setCep(text);
              if (text.length === 9) fetchAddress(text, setCidade, setRua, setBairro);
            }}
            error={error}
            mask="custom"
            maskOptions={{ mask: '99999-999' }}
            returnKeyType="next"
            onSubmitEditing={() => cidadeRef.current?.focus()}
          />
        );
      case 10:
        return (
          <InputField
            ref={cidadeRef}
            label="Cidade"
            value={cidade}
            placeholder="Digite a cidade onde você mora"
            onChangeText={setCidade}
            error={error}
            returnKeyType="next"
            onSubmitEditing={() => ruaRef.current?.focus()}
          />
        );
      case 11:
        return (
          <InputField
            ref={ruaRef}
            label="Rua"
            value={rua}
            placeholder="Digite a rua onde você mora"
            onChangeText={setRua}
            error={error}
            returnKeyType="next"
            onSubmitEditing={() => bairroRef.current?.focus()}
          />
        );
      case 12:
        return (
          <InputField
            ref={bairroRef}
            label="Bairro"
            value={bairro}
            placeholder="Digite o bairro onde você mora"
            onChangeText={setBairro}
            error={error}
            returnKeyType="next"
            onSubmitEditing={() => numeroRef.current?.focus()}
          />
        );
      case 13:
        return (
          <InputField
            ref={numeroRef}
            label="Número"
            value={numero}
            placeholder="Digite o número da sua residência"
            onChangeText={setNumero}
            error={error}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => handleNextStep()}
          />
        );
      case 14:
        return (
          <View style={styles.viewInput}>
            <Text style={styles.textLabel}>Profissão</Text>
            <ErrorMessage error={error} />
            <RNPickerSelect
              onValueChange={setProfissao}
              items={profissoes}
              value={profissao}
              style={pickerSelectStyles}
              placeholder={{ label: 'Selecione sua profissão', value: null }}
            />
          </View>
        );
      case 15:
        return (
          <View style={styles.viewInput}>
            <Text style={styles.textLabel}>Estado Civil:</Text>
            <ErrorMessage error={error} />
            <RNPickerSelect
              onValueChange={setEstadoCivil}
              items={estadosCivis}
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.titulo}>Faça seu Cadastro</Text>
          {renderStep()}
          <View style={styles.botoesContainer}>
            <TouchableOpacity
              style={[styles.botaoVoltar, styles.botao, step === 1 && styles.botaoInvisivel]}
              onPress={step > 1 ? prevStep : () => {}}
              disabled={step === 1}
            >
              <Text style={styles.textoBotaoVoltar}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botaoCadastrar, styles.botao]}
              onPress={handleNextStep}
            >
              <Text style={styles.textoBotaoCadastrar}>
                {step === 15 ? "Concluir" : "Avançar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}