import React, { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Alugados from './VeiculosAlugados';
import VeiculosNaoAlugados from './VeiculosNaoAlugados'
import VeiculosDeletados from './VeiculosDeletados';

const Tab = createMaterialTopTabNavigator();

export default function TelaHome() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Não Alugados" component={VeiculosNaoAlugados} />
      <Tab.Screen name="Alugados" component={Alugados} />
      <Tab.Screen name="Deletados" component={VeiculosDeletados} />
    </Tab.Navigator>
  );
}