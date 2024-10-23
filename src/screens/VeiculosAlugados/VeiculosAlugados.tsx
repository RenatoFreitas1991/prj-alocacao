import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../styles/TelaHomeStyle';
import ButtonMore from '../../components/ButtonMore/ButtonMore'
import CardVeiculo from '../../components/CardVehicle/CardVehicle';
import BR from '../../components/BR/BR'
export default function VeiculosAlugados() {
    return(
      <View style={styles.container1}>
        <ScrollView style={styles.container2}>
        <View>

        </View>
        <View  style={styles.cardsContainer}>
          <CardVeiculo
            modelo="Polo"
            marca="Lexus"
            placa="MVB-6207"
            nameButton="Editar"
            iconButton="edit"
          />

          <CardVeiculo
            modelo="Polo"
            marca="Lexus"
            placa="MVB-6207"
            nameButton="Editar"
            iconButton="edit"
          />
          
          <CardVeiculo
            modelo="Polo"
            marca="Lexus"
            placa="MVB-6207"
            nameButton="Editar"
            iconButton="edit"
          />
        </View>
      </ScrollView>
      <ButtonMore/>
      <BR/>
    </View>
    );
}