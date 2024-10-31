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
import TelaBlackList from '../screens/TelaBlackList/TelaBlackList';
import CadastrarVeiculo from "src/screens/CadastrarVeiculo/CadastrarVeiculo";
import TelaHomeDefinitiva from "../screens/telaHomeDefinitiva/telaHomeDefinitiva";
import HistoricoManutencao from "../screens/HistoricoManutencao/HistoricoManutencao";
import HistoricoAlugados from "../screens/HistoricoAlugados/HistoricoAlugados";
import TelaAvaliacaoCliente from "../screens/TelaAvaliacao/TelaAvaliacaoCliente";

export type StackParamList = {
    Home: undefined;
    Login: undefined;
    Cadastro: undefined;
    TelaSenha: undefined;
    TelaHomeAdmin: undefined;
    Tela_Home_User: undefined;
    Alugados: undefined;
    NaoAlugados: undefined;
    TelaEditarVeiculo: {modeloProp?: string, marcaProp?: string, placaProp?: string};
    TelaBlackList: undefined;
    CadastrarVeiculo: undefined;
    telaHomeDefinitiva: undefined;
    HistoricoManutencao: undefined;
    TelaAvaliacaoCliente: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export function StackRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: { backgroundColor: '#000' }, // Define o fundo do cabeçalho como preto
                headerTintColor: '#fff',                  // Define o texto do cabeçalho como branco
                headerTitleStyle: { fontWeight: 'bold' }, // Define o texto em negrito
            }}
        >
            <Stack.Screen name="Home" component={TelaInicial} options={{ title: 'Página Inicial' }} />
            <Stack.Screen name="Login" component={TelaLogin} options={{ title: 'Login' }} />
            <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Cadastro' }} />
            <Stack.Screen name="TelaSenha" component={TelaSenha} options={{ title: 'Recuperar Senha' }} />
            <Stack.Screen name="TelaHomeAdmin" component={TelaHomeAdmin} options={{ title: 'Admin' }} />
            <Stack.Screen name="Tela_Home_User" component={TelaHomeUser} options={{ title: 'Usuário' }} />
            <Stack.Screen name="Alugados" component={Alugados} options={{ title: 'Veículos Alugados' }} />
            <Stack.Screen name="NaoAlugados" component={NaoAlugados} options={{ title: 'Veículos Não Alugados' }} />
            <Stack.Screen name="TelaEditarVeiculo" component={TelaEditarVeiculo} options={{ title: 'Editar Veículo' }} />
            <Stack.Screen name="TelaBlackList" component={TelaBlackList} options={{ title: 'Lista Negra' }} />
            <Stack.Screen name="CadastrarVeiculo" component={CadastrarVeiculo} options={{ title: 'Cadastrar Veículo' }} />
            <Stack.Screen name="telaHomeDefinitiva" component={TelaHomeDefinitiva} options={{ title: 'Tela Principal' }} />
            <Stack.Screen name="HistoricoManutencao" component={HistoricoManutencao} options={{ title: 'Histórico de Manutenção' }} />
            <Stack.Screen name="HistoricoAlugados" component={HistoricoAlugados} options={{ title: 'Historico de veiculos Alugados' }} />
            <Stack.Screen name="TelaAvaliacaoCliente" component={TelaAvaliacaoCliente} options={{ title: 'Avaliação' }} />
        </Stack.Navigator>
    );
}
