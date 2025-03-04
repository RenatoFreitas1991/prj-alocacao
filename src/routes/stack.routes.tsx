import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./types";
import UserTabNavigator from './userTabNavigator'; 
import TelaCalendario from "../screens/admin/TelaCalendario/TelaCalendario";
import VerInfo from "../screens/admin/VerInfo/VerInfo";
import TelaLocacaoVeiculo from '../screens/admin/TelaLocacaoVeiculo/TelaLocacaoVeiculo';
import TelaManutencaoVeiculo from "src/screens/admin/TelaManutencaoVeiculo/TelaManutencaoVeiculo";
import TelaEditarLocacaoVeiculo from './../screens/admin/TelaEditarLocacaoVeiculo/TelaEditarLocacaoVeiculo';
import TelaHistoricoManutencaoVeiculo from './../screens/admin/TelaHistoricoManutencaoVeiculo/TelaHistoricoManutencaoVeiculo';
import TelaFavorito from './../screens/cliente/Favorito/favoritoUser';
import LocacaoUser from './../screens/cliente/LocacaoUser/LocacaoUser';
import Conta from './../screens/cliente/conta/Conta';
import HistoricoLocacao from './../screens/cliente/HistoricoLocacao/HistoricoLocacao';
import TelaAvaliacaoHome from './../screens/admin/TelaAvaliacao/TelaAvaliacaoHome';
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
    VeiculosNaoAlugadosAdmin,
    Notificacoes,
} from "../screens"; 

const Stack = createNativeStackNavigator<StackParamList>();

const screenOptions = {
    headerStyle: { backgroundColor: 'white' },
    headerTintColor: 'black',
    headerTitleStyle: { fontWeight: 'bold' as 'bold' },
};

export function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={TelaInicial} options={{ headerShown: false  }} />
            <Stack.Screen name="LoginAdmin" component={TelaLoginAdmin} options={{ headerShown: false}} />
            <Stack.Screen name="LoginUser" component={TelaLoginUser} options={{ title: 'Login Cliente', headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Cadastro', headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaSenha" component={TelaSenha} options={{ title: 'Recuperar Senha' }} />
            <Stack.Screen name="TelaHomeAdmin" component={TelaHomeAdmin} options={{ title: 'Admin',  headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaHomeUser" component={TelaHomeUser} options={{ title: 'Usuário' }} />
            <Stack.Screen name="Alugados" component={Alugados} options={{ title: 'Veículos Alugados' }} />
            <Stack.Screen name="NaoAlugados" component={NaoAlugados} options={{ title: 'Veículos Não Alugados' }} />
            <Stack.Screen name="TelaEditarVeiculo" component={TelaEditarVeiculo}options={{ title: 'Editar Veículo',  headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white', }}/>
            <Stack.Screen name="TelaBlackList" component={TelaBlackList} options={{ title: 'Lista Negra',  headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', }} />
            <Stack.Screen name="CadastrarVeiculo" component={CadastrarVeiculo} options={{ title: 'Cadastrar Veículo',  headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="telaHomeDefinitiva" component={TelaHomeDefinitiva} options={{ title: 'Tela Principal',  headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="HistoricoManutencao" component={HistoricoManutencao} options={{ title: 'Histórico de Manutenção' }} />
            <Stack.Screen name="HistoricoAlugados" component={HistoricoAlugados} options={{ title: 'Histórico de Veículos Alugados' ,  headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaAvaliacaoCliente" component={TelaAvaliacaoCliente} options={{ title: 'Avaliação' ,headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaCalendario" component={TelaCalendario} options={{ title: 'Calendário' ,headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white', }} />
            <Stack.Screen name="VeiculosAlugadosAdmin" component={VeiculosAlugadosAdmin} options={{ title: 'Veículos Alugados ADMIN' }} />
            <Stack.Screen name="VeiculosNaoAlugadosAdmin" component={VeiculosNaoAlugadosAdmin} options={{ title: 'Veículos Não Alugados ADMIN' }} />
            <Stack.Screen name="Notificacoes" component={Notificacoes} options={{ title: 'Notificações' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="VerInfo" component={VerInfo} options={{  headerShown: false}} />
            <Stack.Screen name="TelaLocacaoVeiculo" component={TelaLocacaoVeiculo} options={{ title: 'Locação' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaManutencaoVeiculo" component={TelaManutencaoVeiculo} options={{ title: 'Manutenção' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaEditarLocacaoVeiculo" component={TelaEditarLocacaoVeiculo} options={{ title: 'Editar Locação' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaHistoricoManutencaoVeiculo" component={TelaHistoricoManutencaoVeiculo} options={{ title: 'Histórico de Manutenção' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaFavorito" component={TelaFavorito} options={{ title: 'Tela Favoritos' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="LocacaoUser" component={LocacaoUser} options={{ title: 'Locação' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="Conta" component={Conta} options={{ title: 'Conta' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="HistoricoLocacao" component={HistoricoLocacao} options={{ title: 'Histórico de Locação' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            <Stack.Screen name="TelaAvaliacaoHome" component={TelaAvaliacaoHome} options={{ title: 'Avaliação' , headerStyle: { backgroundColor: '#2B3A67' }, headerTintColor: 'white',}} />
            {/* Adição do UserTabNavigator para o usuário */}
            <Stack.Screen 
                name="UserTabNavigator" 
                component={UserTabNavigator} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}
