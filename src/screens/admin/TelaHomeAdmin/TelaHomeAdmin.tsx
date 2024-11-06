import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';
import VeiculosNaoAlugados from '../VeiculosNaoAlugadosAdmin/VeiculosNaoAlugados';
import VeiculosAlugados from '../VeiculosAlugadosAdmin/VeiculosAlugados';

const Tab = createMaterialTopTabNavigator();

export default function TelaHomeAdmin() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        swipeEnabled: false,
        lazy: true,
        tabBarScrollEnabled: false,
        tabBarStyle: { backgroundColor: 'black' }, // Fundo preto para a barra de tabs
        tabBarActiveTintColor: 'white', // Texto branco na aba ativa
        tabBarInactiveTintColor: 'grey', // Texto cinza na aba inativa
        tabBarLabel: ({ focused }) => (
          <Text style={{
            color: focused ? 'white' : 'grey', // Branco para aba ativa, cinza para inativa
            fontSize: 18,
            fontWeight: 'bold',
          }}>
            {route.name}
          </Text>
        ),
        tabBarIndicatorStyle: {
          backgroundColor: 'blue', // Linha azul sob a aba ativa
          height: 4, // Ajuste a altura para deixar a linha mais visível
        },
      })}
    >
      <Tab.Screen name="Não Alugados" component={VeiculosNaoAlugados} />
      <Tab.Screen name="Alugados" component={VeiculosAlugados} />
    </Tab.Navigator>
  );
}
