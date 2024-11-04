import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import styles from '../../styles/TelaHomeStyle';
import ButtonMore from '../../../components/ButtonMore/ButtonMore';
import { API_URL } from '@env';

import CardVeiculo from '../../../components/CardVehicle/CardVehicle';
import BR from '../../../components/BR/BR';

export default function VeiculosAlugados() {

  interface MinVeiculo {
    id: number;
    modelo: string;
    marca: string;
    placa: string;
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
  const [disponibilidade, setDisponibilidade] = useState(0);

  const fetchData = async () => {
    try {
      console.log(`Fetching: ${API_URL}/api/vehicles/disponibilidade/${disponibilidade}`);
      const response = await fetch(`${API_URL}/api/vehicles/disponibilidade/${disponibilidade}`);
      const result: MinVeiculo[] = await response.json();
      console.log('Fetched vehicles:', result);
      setVehicles(result);
    } catch (error) {
      console.error('Erro ao buscar os dados dos veículos ->', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [disponibilidade]);

  const renderCardVehicle: ListRenderItem<MinVeiculo> = ({ item }) => (
    <CardVeiculo
      modelo={item.modelo}
      marca={item.marca}
      placa={item.placa}
      nameButton="editar"
      iconButton="eye"
    />
  );

  return (
    <View style={styles.container1}>
      <FlatList
        style={styles.listContainer}
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCardVehicle}
        numColumns={2}
        ListFooterComponent={
          <>
            <ButtonMore />
            <BR />
          </>
        }
      />
    </View>
  );
}
