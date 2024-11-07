import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from "./TelaHomeUserStyle";
import VeiculosNaoAlugados from '../VeiculosNaoAlugados/VeiculosNaoAlugados'

const Tab = createMaterialTopTabNavigator();

export default function TelaHome() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: styles.indicator,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen name="Veiculos" component={VeiculosNaoAlugados} />
    </Tab.Navigator>
  );
}
