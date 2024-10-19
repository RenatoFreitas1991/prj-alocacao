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

export type StackParamList = {
    Home: undefined;
    Login: undefined;
    Cadastro: undefined;
    TelaSenha: undefined;
    TelaHomeAdmin: undefined;
    TelaHomeUser: undefined;
    Alugados:undefined;
    NaoAlugados:undefined;
    TelaEditarVeiculo:undefined; // TelaSenha does not expect any parameters
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
            <Stack.Screen name="TelaHomeUser" component={TelaHomeUser} />
            <Stack.Screen name="Alugados" component={Alugados} />
            <Stack.Screen name="NaoAlugados" component={NaoAlugados} />

            <Stack.Screen name="TelaEditarVeiculo" component={TelaEditarVeiculo} />
        </Stack.Navigator>
    );
}
