import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import TelaHomeUser from '../screens/cliente/TelaHomeUser/TelaHomeUser';
import TelaFavorito from '../screens/cliente/Favorito/favoritoUser';
import salvosUser from '../screens/cliente/salvos/salvosUser';

import { StackParamList } from '../routes/types';
import { RouteProp, useRoute } from '@react-navigation/native';

type userTabNavigatorProp = RouteProp<StackParamList, 'UserTabNavigator'>;

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {

    const route = useRoute<userTabNavigatorProp>();
    const { cpf } = route.params;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: 'white',  // Cor da bolha ativa
                tabBarInactiveTintColor: '#2B3A67', // Cor do ícone inativo
                tabBarStyle: { 
                    backgroundColor: '#2B3A67', 
                    height: 63,
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 0,
                    marginHorizontal: 5,  // Desgruda das laterais
                    marginBottom: 5,  // Desgruda do fundo
                    borderRadius: 10, // Arredonda a barra
                },
                tabBarIcon: ({ color, size, focused }) => (
                    <View
                        style={{
                            width: focused ? 60 : 50, // Tamanho da bolha do ícone ativo
                            height: focused ? 60 : 50,
                            borderRadius: focused ? 30 : 25,
                            backgroundColor: focused ? 'white' : color, // Cor de fundo para a bolha ativa
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: focused ? 5 : 0, // Borda do ícone ativo
                            borderColor: focused ? '#2B3A67' : 'transparent', // Cor da borda
                            transform: focused ? [{ translateY: -14 }] : [{ translateY: 0 }], // Eleva o ícone ativo
                        }}
                    >
                        <Ionicons
                            name={route.name === 'Home' ? 'home' : route.name === 'Favoritos' ? 'heart' :
                                'person'}
                            size={focused ? size + 2 : size} // Aumenta o ícone ativo
                            color={focused ? '#2B3A67' : 'white'} // Cor do ícone ativo igual ao background da tabBar
                        />
                    </View>
                ),
            })}
        >
            <Tab.Screen
                name="Home"
                component={TelaHomeUser}
                options={{
                    title: 'Início',
                }}
                initialParams={{ cpf: cpf }}
            />
            <Tab.Screen
                name="Favoritos"
                component={TelaFavorito}
                options={{
                    title: 'Favoritos',
                }}
                initialParams={{ cpf: cpf }}
            />
             <Tab.Screen
                name="conta"
                component={salvosUser}
                options={{
                    title: 'Conta',
                }}
                
            />
        </Tab.Navigator>
        
    );
}
