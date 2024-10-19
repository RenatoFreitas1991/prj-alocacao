import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import styles from './styles/TelaHomeStyle';

import CardVeiculo from '../components/CardVehicle/CardVehicle';

export default function VeiculosNaoAlugados() {
    return(
      <ScrollView style={styles.container}>
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
    );
}