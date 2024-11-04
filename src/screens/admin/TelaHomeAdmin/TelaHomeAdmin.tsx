import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VeiculosNaoAlugados from '../VeiculosNaoAlugadosAdmin/VeiculosNaoAlugados';
import VeiculosAlugados from '../VeiculosAlugadosAdmin/VeiculosAlugados';

const Tab = createMaterialTopTabNavigator();

export default function TelaHomeAdmin() {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
        tabBarScrollEnabled: false,
      }}
    >
      <Tab.Screen name="Não Alugados" component={VeiculosNaoAlugados} />
      <Tab.Screen name="Alugados" component={VeiculosAlugados} />
    </Tab.Navigator>
  );
}
