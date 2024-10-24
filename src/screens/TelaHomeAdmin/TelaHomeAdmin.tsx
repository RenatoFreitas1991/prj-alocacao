import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Alugados from '../VeiculosAlugados/VeiculosAlugados';
import VeiculosNaoAlugados from '../VeiculosNaoAlugados/VeiculosNaoAlugados';
import TelaBlackList from '../TelaBlackList/TelaBlackList';
import CadastrarVeiculo from "../CadastrarVeiculo/CadastrarVeiculo";

const Tab = createMaterialTopTabNavigator();

export default function TelaHome() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: styles.indicator,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen name="Não Alugados" component={VeiculosNaoAlugados} />
      <Tab.Screen name="Alugados" component={Alugados} />
      <Tab.Screen name="Lista Negra" component={TelaBlackList} />
      <Tab.Screen name="Cadastrar Veículo" component={CadastrarVeiculo} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f8f8f8',
  },
  indicator: {
    backgroundColor: 'blue',
    height: 3,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
});