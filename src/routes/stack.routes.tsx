    import React from "react";
    import { createNativeStackNavigator } from "@react-navigation/native-stack";
    import { StackParamList } from "./types";
    import TelaCalendario from "../screens/admin/TelaCalendario/TelaCalendario";
    import {
        TelaInicial,
        TelaLoginAdmin,
        TelaLoginUser,
        TelaCadastro,
        TelaSenha,
        TelaHomeAdmin,
        TelaHomeUser,
        Alugados,
        NaoAlugados,
        TelaEditarVeiculo,
        TelaBlackList,
        CadastrarVeiculo,
        TelaHomeDefinitiva,
        HistoricoManutencao,
        HistoricoAlugados,
        TelaAvaliacaoCliente,
        VeiculosAlugadosAdmin,
        VeiculosNaoAlugadosAdmin
    } from "../screens"; 

    const Stack = createNativeStackNavigator<StackParamList>();

    const screenOptions = {
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' as 'bold' },
    };

    export function StackRoutes() {
        return (
            <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={TelaInicial} options={{ title: 'Página Inicial' }} />
                <Stack.Screen name="LoginAdmin" component={TelaLoginAdmin} options={{ title: 'Login Admin' }} />
                <Stack.Screen name="LoginUser" component={TelaLoginUser} options={{ title: 'Login Cliente' }} />
                <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Cadastro' }} />
                <Stack.Screen name="TelaSenha" component={TelaSenha} options={{ title: 'Recuperar Senha' }} />
                <Stack.Screen name="TelaHomeAdmin" component={TelaHomeAdmin} options={{ title: 'Admin' }} />
                <Stack.Screen name="Tela_Home_User" component={TelaHomeUser} options={{ title: 'Usuário' }} />
                <Stack.Screen name="Alugados" component={Alugados} options={{ title: 'Veículos Alugados' }} />
                <Stack.Screen name="NaoAlugados" component={NaoAlugados} options={{ title: 'Veículos Não Alugados' }} />
                <Stack.Screen
                    name="TelaEditarVeiculo"
                    component={TelaEditarVeiculo}
                    options={{ title: 'Editar Veículo' }}
                />
                <Stack.Screen name="TelaBlackList" component={TelaBlackList} options={{ title: 'Lista Negra' }} />
                <Stack.Screen name="CadastrarVeiculo" component={CadastrarVeiculo} options={{ title: 'Cadastrar Veículo' }} />
                <Stack.Screen name="telaHomeDefinitiva" component={TelaHomeDefinitiva} options={{ title: 'Tela Principal' }} />
                <Stack.Screen name="HistoricoManutencao" component={HistoricoManutencao} options={{ title: 'Histórico de Manutenção' }} />
                <Stack.Screen name="HistoricoAlugados" component={HistoricoAlugados} options={{ title: 'Histórico de Veículos Alugados' }} />
                <Stack.Screen name="TelaAvaliacaoCliente" component={TelaAvaliacaoCliente} options={{ title: 'Avaliação' }} />
                <Stack.Screen name="TelaCalendario" component={TelaCalendario} options={{ title: 'Calendário' }} />
                <Stack.Screen name="VeiculosAlugadosAdmin" component={VeiculosAlugadosAdmin} options={{ title: 'Veículos Alugados ADMIN' }} />
                <Stack.Screen name="VeiculosNaoAlugadosAdmin" component={VeiculosNaoAlugadosAdmin} options={{ title: 'Veículos Não Alugados ADMIN' }} />
            </Stack.Navigator>
        );
    }
