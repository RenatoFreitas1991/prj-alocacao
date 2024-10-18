import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from "./TelaHomeUserStyle";
import Alugados from '../VeiculosAlugados/VeiculosAlugados';
import VeiculosNaoAlugados from '../VeiculosNaoAlugados/VeiculosNaoAlugados'
import TelaInicial from "../TelaInicial/TelaInicial";

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
    </Tab.Navigator>
  );
}
