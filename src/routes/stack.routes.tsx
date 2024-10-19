import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaInicial from "../screens/TelaInicial";
import TelaLogin from "../screens/TelaLogin";
import TelaCadastro from "../screens/TelaCadastro";
import TelaSenha from "../screens/TelaSenha"; 
import TelaHomeAdmin from "../screens/TelaHomeAdmin";
import TelaHomeUser from "../screens/TelaHomeUser";
import Alugados from '../screens/VeiculosAlugados';
import NaoAlugados from '../screens/VeiculosNaoAlugados';
import TelaEditarVeiculo from '../screens/TelaEditarVeiculo'; // Import the new password setup screen

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
