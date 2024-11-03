import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, ListRenderItem } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../styles/TelaHomeStyle';
import ButtonMore from '../../components/ButtonMore/ButtonMore'
import CardVeiculo from '../../components/CardVehicle/CardVehicle';
import BR from '../../components/BR/BR'
import { API_URL } from '@env';

export default function VeiculosAlugados() {

  interface MinVeiculo {
    id:number;
    modelo:string;
    marca:string;
    placa:string;
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
  const [disponibilidade, setDisponibilidade] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/vehicles/disponibilidade/${disponibilidade}`);
      const result: MinVeiculo[] = await response.json();
      setVehicles(result);
    }catch (error) {
      console.error('Erro ao buscar os dados dos veículos ->', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [disponibilidade]);

  console.log(vehicles)

  const renderCardVehicle: ListRenderItem<MinVeiculo> = ({ item }) => {
    return (
      <CardVeiculo
        modelo={item.modelo}
        marca={item.marca}
        placa={item.placa}
        nameButton="Editar"
        iconButton="edit"
      />
    )
  };

  return(
    <View style={styles.container1}>

      <ScrollView style={styles.container2}>

        <View style={styles.cardsContainer}>
          <FlatList
            style={styles.listContainer}
            data={vehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCardVehicle}
            numColumns={2}
          />
        </View>

      </ScrollView>
      <ButtonMore />
      <BR />

    </View>
  );
}