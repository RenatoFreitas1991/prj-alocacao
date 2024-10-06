import React, { useRef, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles/TelaCadastroStyle";
import pickerSelectStyles from "./styles/selectStyles";
import useStep from "../hooks/useStep";                 // States of inputs 
import fetchAddress from '../hooks/cepRequest';

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
          refInput={ref} // Passa a ref
          keyboardType={keyboardType}
          returnKeyType={returnKeyType} // Define o tipo do botão no teclado
          onSubmitEditing={onSubmitEditing} // Ação ao pressionar "Next"
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          ref={ref} // Passa a ref
          keyboardType={keyboardType}
          returnKeyType={returnKeyType} // Define o tipo do botão no teclado
          onSubmitEditing={onSubmitEditing} // Ação ao pressionar "Next"
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
  const profissaoRef = useRef<TextInput>(null);

  const handleNextStep = () => {
    nextStep();
  };

  useEffect(() => {
    nomeRef.current?.focus(); // Foca automaticamente no primeiro campo ao carregar a tela
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <InputField
            ref={nomeRef}
            label="Nome"
            value={nome}
            placeholder="Digite seu nome"
            onChangeText={setNome}
            error={error}
            returnKeyType="next"
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
          />
        );
      case 3:
        return (
          <InputField
            ref={cpfRef}
            label="CPF"
            value={cpf}
            placeholder="Digite seu CPF"
            onChangeText={setCpf}
            error={error}
            mask="custom"
            maskOptions={{ mask: '999.999.999-99' }}
            returnKeyType="next"
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
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
            onSubmitEditing={handleNextStep}
          />
        );
      case 14:
        return (
          <InputField
            ref={profissaoRef}
            label="Profissão"
            value={profissao}
            placeholder="Digite sua profissão"
            onChangeText={setProfissao}
            error={error}
            returnKeyType="done"
            onSubmitEditing={handleNextStep}
          />
        );
      case 15:
        return (
          <View style={styles.viewInput}>
            <Text style={styles.textLabel}>Estado Civil:</Text>
            <ErrorMessage error={error} />
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
