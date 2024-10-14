import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './styles/TelaHomeStyle';

import CardVeiculo from '../components/CardVehicle/CardVehicle';

export default function VeiculosAlugados() {
    return(
        <ScrollView style={styles.container}>
        <View>

        </View>
        <View  style={styles.cardsContainer}>
          <CardVeiculo
            modelo="Polo"
            marca="Lexus"
            placa="MVB-6207"
          />

          <CardVeiculo
            modelo="Polo"
            marca="Lexus"
            placa="MVB-6207"
          />
          
          <CardVeiculo
            modelo="Polo"
            marca="Lexus"
            placa="MVB-6207"
          />

        </View>
      </ScrollView>
    );
}