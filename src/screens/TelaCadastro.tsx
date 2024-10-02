import React, { useState } from "react";
import { Button, Text, TextInput, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/style";

export default function TelaCadastro() {
    const navigation = useNavigation()

    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [orgaoExpeditor, setOrgaoExpeditor] = useState('');
    const [cnh, setCnh] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [profissao, setProfissao] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('Solteiro');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    function mostrarDadosCadastrados() {
        console.log('Nome: ', nome);
        console.log('Data de nascimento: ', dataNascimento);
        console.log('Cpf: ', cpf);
        console.log('Rg: ', rg);
        console.log('Órgão expeditor: ', orgaoExpeditor);
        console.log('Cnh: ', cnh);
        console.log('Telefone: ', telefone);
        console.log('E-mail: ', email);
        console.log('Cidade: ', cidade);
        console.log('Rua: ', rua);
        console.log('Bairro: ', bairro);
        console.log('Cep: ', cep);
        console.log('Profissão: ', profissao);
        console.log('Estado civil: ', estadoCivil);
        console.log('Senha: ', senha);
        
    }

    return(
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container2}>
                <Text style={styles.titulo}>Faça seu cadastro no App de alocação de veículo</Text>
                <Text>Nome:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <Text>Data de Nascimento:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Data de Nascimento DD/MM/AAAA"
                    value={dataNascimento}
                    onChangeText={setDataNascimento}
                />
                <Text>CPF:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChangeText={setCpf}
                />
                <Text>RG:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu RG"
                    value={rg}
                    onChangeText={setRg}
                />
                <Text>Órgão Expeditor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o órgão expeditor do RG"
                    value={orgaoExpeditor}
                    onChangeText={setOrgaoExpeditor}
                />
                <Text>CNH:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o número de sua CNH"
                    value={cnh}
                    onChangeText={setCnh}
                />
                <Text>Telefone:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o número do seu telefone"
                    keyboardType="number-pad"
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <Text>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
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
                <Text>Cep:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu cep"
                    value={cep}
                    onChangeText={setCep}
                />
                <Text>Profissão:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua profissão"
                    value={profissao}
                    onChangeText={setProfissao}
                />
                <Text>Estado Civil:</Text>
                
                <Picker
                    selectedValue={estadoCivil}
                    onValueChange={(itemValue) => setEstadoCivil(itemValue)}
                >
                    <Picker.Item label="Solteiro" value="Solteiro" key="solteiro" />
                    <Picker.Item label="Casado" value="Casado" key="casado" />
                    <Picker.Item label="Separado" value="Separado" key="separado" />
                    <Picker.Item label="Divorciado" value="Divorciado" key="divorciado" />
                    <Picker.Item label="Viúvo" value="Viúvo" key="viuvo" />
                </Picker>
                <Text>Senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
                <Text>Confirme sua senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />

                <View style={styles.botoesContainer}>
                    <View style={styles.botao}>
                        <Button title="Cadastrar" onPress={mostrarDadosCadastrados} />
                    </View>
                    <View style={styles.botao}>
                        <Button
                            title="Voltar"
                            onPress={()=>navigation.goBack()}
                        />
                    </View>
                </View>

            </View>
        </ScrollView>

        
    )
}