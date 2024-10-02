import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaInicial from "../screens/TelaInicial";
import TelaLogin from "../screens/TelaLogin";
import TelaCadastro from "../screens/TelaCadastro";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={TelaInicial}
            />
            <Stack.Screen
                name="Login"
                component={TelaLogin}
            />
            <Stack.Screen
                name="Cadastro"
                component={TelaCadastro}
            />
        </Stack.Navigator>
    )
}