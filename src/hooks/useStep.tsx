import { useState } from 'react';
import { Vibration, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/stack.routes"; 

export default function useStep() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

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

    // Função para avançar para o próximo step
    const nextStep = () => {
        switch (step) {
            case 1:
                if (!nome.trim()) {
                    setNomeError('O campo nome é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setNomeError('');
                break;
            case 2:
                if (!dataNascimento.trim()) {
                    setDataNascimentoError('O campo data de nascimento é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setDataNascimentoError('');
                break;
            case 3:
                if (!cpf.trim()) {
                    setCpfError('O campo CPF é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setCpfError('');
                break;
            case 4:
                if (!rg.trim()) {
                    setRgError('O campo RG é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setRgError('');
                break;
            case 5:
                if (!orgaoExpeditor.trim()) {
                    setOrgaoExpeditorError('O campo órgão expeditor é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setOrgaoExpeditorError('');
                break;
            case 6:
                if (!cnh.trim()) {
                    setCnhError('O campo CNH é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setCnhError('');
                break;
            case 7:
                if (!telefone.trim()) {
                    setTelefoneError('O campo telefone é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setTelefoneError('');
                break;
            case 8:
                if (!email.trim()) {
                    setEmailError('O campo e-mail é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setEmailError('');
                break;
            case 9:
                if (!cep.trim()) {
                    setCepError('O campo CEP é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setCepError('');
                break;
            case 10:
                if (!cidade.trim()) {
                    setCidadeError('O campo cidade é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setCidadeError('');
                break;
            case 11:
                if (!rua.trim()) {
                    setRuaError('O campo rua é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setRuaError('');
                break;
            case 12:
                if (!bairro.trim()) {
                    setBairroError('O campo bairro é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setBairroError('');
                break;
            case 13:
                if (!numero.trim()) {
                    setNumeroError('O campo número é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setNumeroError('');
                break;
            case 14:
                if (!profissao.trim()) {
                    setProfissaoError('O campo profissão é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setProfissaoError('');
                break;
            case 15:
                if (!estadoCivil.trim()) {
                    setEstadoCivilError('O campo estado civil é obrigatório.');
                    Vibration.vibrate();
                    return;
                }
                setEstadoCivilError('');
                break;
            default:
                break;
        }

        if (step < 15) {
            setStep(prev => prev + 1);
        } else {
            navigation.navigate('TelaSenha');
        }
    };

    // Função para retroceder ao step anterior
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

    return {
        step,
        setStep,
        nome, setNome, nomeError,
        dataNascimento, setDataNascimento, dataNascimentoError,
        cpf, setCpf, cpfError,
        rg, setRg, rgError,
        orgaoExpeditor, setOrgaoExpeditor, orgaoExpeditorError,
        cnh, setCnh, cnhError,
        telefone, setTelefone, telefoneError,
        email, setEmail, emailError,
        cep, setCep, cepError,
        cidade, setCidade, cidadeError,
        rua, setRua, ruaError,
        bairro, setBairro, bairroError,
        numero, setNumero, numeroError,
        profissao, setProfissao, profissaoError,
        estadoCivil, setEstadoCivil, estadoCivilError,
        nextStep,
        prevStep,
        fetchAddress,
    };
}
