import { useState } from 'react';
import { Vibration, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/stack.routes";
import errorMessages from './errorMessages';

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

    const [error, setError] = useState(''); // State pra handler de erros  

    // Função para validar o CPF
    const validarCPF = (cpf: string) => {
        cpf = cpf.replace(/[^\d]/g, ""); // regex pra contabilizar apenas numeros 

        // verificar se o cpf tem 11 digitos e se nao sao iguais
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let soma = 0;
        let resto;

        // validando o primeiro digito verificador 
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        soma = 0;

        // validando o segundo digito verificador
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true; 
    };

    // Função para avançar para o próximo step
    const nextStep = () => {
        switch (step) {
            case 1:
                if (!nome.trim()) {
                    setError(errorMessages.nome);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 2:
                if (!dataNascimento.trim()) {
                    setError(errorMessages.dataNascimento);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 3:
                if (!cpf || cpf.length !== 14 || !validarCPF(cpf)){
                    setError('o CPF é inválido');
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 4:
                if (!rg.trim()) {
                    setError(errorMessages.rg);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 5:
                if (!orgaoExpeditor.trim()) {
                    setError(errorMessages.orgaoExpeditor);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 6:
                if (!cnh.trim()) {
                    setError(errorMessages.cnh);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 7:
                if (!telefone.trim()) {
                    setError(errorMessages.telefone);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 8:
                if (!email.trim()) {
                    setError(errorMessages.email);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 9:
                if (!cep.trim()) {
                    setError(errorMessages.cep);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 10:
                if (!cidade.trim()) {
                    setError(errorMessages.cidade);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 11:
                if (!rua.trim()) {
                    setError(errorMessages.rua);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 12:
                if (!bairro.trim()) {
                    setError(errorMessages.bairro)
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 13:
                if (!numero.trim()) {
                    setError(errorMessages.numero);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 14:
                if (!profissao.trim()) {
                    setError(errorMessages.profissao);
                    Vibration.vibrate();
                    return;
                }
                setError('');
                break;
            case 15:
                if (!estadoCivil.trim()) {
                    setError(errorMessages.estadoCivil);
                    Vibration.vibrate();
                    return;
                }
                setError('');
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

    return {
        step,
        setStep,
        nome, setNome,
        dataNascimento, setDataNascimento,
        cpf, setCpf,
        rg, setRg,
        orgaoExpeditor, setOrgaoExpeditor,
        cnh, setCnh,
        telefone, setTelefone,
        email, setEmail,
        cep, setCep,
        cidade, setCidade,
        rua, setRua,
        bairro, setBairro,
        numero, setNumero,
        profissao, setProfissao,
        estadoCivil, setEstadoCivil,
        error, 
        nextStep,
        prevStep,
    };
}