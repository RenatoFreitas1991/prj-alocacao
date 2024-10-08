import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaInicial from "../screens/TelaInicial";
import TelaLogin from "../screens/TelaLogin";
import TelaCadastro from "../screens/TelaCadastro";
import TelaSenha from "../screens/TelaSenha"; 
import TelaHome from "../screens/TelaHome"; // Import the new password setup screen

export type StackParamList = {
    Home: undefined;
    Login: undefined;
    Cadastro: undefined;
    TelaSenha: undefined;
    TelaHome: undefined; // TelaSenha does not expect any parameters
};

const Stack = createNativeStackNavigator<StackParamList>();

export function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={TelaInicial} />
            <Stack.Screen name="Login" component={TelaLogin} />
            <Stack.Screen name="Cadastro" component={TelaCadastro} />
            <Stack.Screen name="TelaSenha" component={TelaSenha} />
            <Stack.Screen name="TelaHome" component={TelaHome} />
        </Stack.Navigator>
    );
}
