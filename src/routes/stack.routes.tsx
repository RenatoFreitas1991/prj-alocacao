import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaInicial from "../screens/TelaInicial/TelaInicial";
import TelaLogin from "../screens/TelaLogin/TelaLogin";
import TelaCadastro from "../screens/TelaCadastro/TelaCadastro";
import TelaSenha from "../screens//TelaSenha/TelaSenha"; 
import TelaHomeAdmin from "../screens/TelaHomeAdmin/TelaHomeAdmin";
import TelaHomeUser from "../screens/TelaHomeUser/TelaHomeUser";
import Alugados from '../screens/VeiculosAlugados/VeiculosAlugados';
import NaoAlugados from '../screens/VeiculosNaoAlugados/VeiculosNaoAlugados';
import TelaEditarVeiculo from '../screens/TelaEditarVeiculo/TelaEditarVeiculo';
import TelaBlackList from '../screens/TelaBlackList/TelaBlackList'
import CadastrarVeiculo from "src/screens/CadastrarVeiculo/CadastrarVeiculo";
import TelaHomeDefinitiva from "../screens/telaHomeDefinitiva/telaHomeDefinitiva";
import HistoricoManutencao from "../screens/HistoricoManutencao/HistoricoManutencao";
import HistoricoAlugados from "src/screens/HistoricoAlugados/HistoricoAlugados";
import TelaAvaliacaocliente from "../screens/TelaAvaliacao/TelaAvaliacaoCliente"

export type StackParamList = {
    Home: undefined;
    Login: undefined;
    Cadastro: undefined;
    TelaSenha: { userData: UserData };
    TelaHomeAdmin: undefined;
    Tela_Home_User: undefined;
    Alugados:undefined;
    NaoAlugados:undefined;
    TelaEditarVeiculo: {modeloProp?:string, marcaProp?:String, placaProp?:string};
    TelaBlackList: undefined;
    CadastrarVeiculo:undefined;
    telaHomeDefinitiva:undefined;
    HistoricoManutencao:{clienteProp?:string, marcaProp?:string, placaProp?:string};
    HistoricoAlugados:undefined;
    TelaAvaliacaocliente:undefined;
};
export type UserData = {
    nome: string;
    dataNascimento: string;
    cpf: string;
    rg: string;
    orgaoExpeditor: string;
    cnh: string;
    telefone: string;
    email: string;
    cep: string;
    cidade: string;
    rua: string;
    bairro: string;
    numero: string;
    profissao: string;
    estadoCivil: string;
  };
const Stack = createNativeStackNavigator<StackParamList>();

export function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={TelaInicial} />
            <Stack.Screen name="Login" component={TelaLogin} />
            <Stack.Screen name="Cadastro" component={TelaCadastro} />
            <Stack.Screen name="TelaSenha" component={TelaSenha} />
            <Stack.Screen name="TelaHomeAdmin" component={TelaHomeAdmin} />
            <Stack.Screen name="Tela_Home_User" component={TelaHomeUser} />
            <Stack.Screen name="Alugados" component={Alugados} />
            <Stack.Screen name="NaoAlugados" component={NaoAlugados} />
            <Stack.Screen name="TelaEditarVeiculo" component={TelaEditarVeiculo} />
            <Stack.Screen name="TelaBlackList" component={TelaBlackList} />
            <Stack.Screen name="CadastrarVeiculo" component={CadastrarVeiculo} />
            <Stack.Screen name="telaHomeDefinitiva" component={TelaHomeDefinitiva} />
            <Stack.Screen name="HistoricoManutencao" component={HistoricoManutencao} />
            <Stack.Screen name="HistoricoAlugados" component={HistoricoAlugados} />
            <Stack.Screen name="TelaAvaliacaocliente" component={TelaAvaliacaocliente}/>
        </Stack.Navigator>
    );
}
