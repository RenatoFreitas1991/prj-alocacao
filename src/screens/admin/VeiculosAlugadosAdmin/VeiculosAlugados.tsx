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
    imagePath?: string; 
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
  const [disponibilidade, setDisponibilidade] = useState(0);

  const fetchData = async () => {
    try {
      console.log(`Fetching: ${API_URL}/api/backend/vehicles/disponibilidade/${disponibilidade}`);
      const response = await fetch(`${API_URL}/api/backend/vehicles/disponibilidade/${disponibilidade}`);
      const result = await response.json();

      const vehiclesData = result.map((vehicle: any) => {
        let imagePath = null;

        if (vehicle.imagePath) {
          try {
            const imagePathArray = JSON.parse(vehicle.imagePath);
            if (Array.isArray(imagePathArray) && imagePathArray.length > 0) {
              imagePath = `${API_URL}${imagePathArray[0]}`;
            }
          } catch (parseError) {
            console.error('Erro ao parsear imagePath:', parseError);
          }
        }

        return {
          ...vehicle,
          imagePath,
        };
      });

      console.log('Fetched vehicles with images:', vehiclesData);
      setVehicles(vehiclesData);
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
      imagePath={item.imagePath}
      nameButton="editar"
      iconButton="edit"
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
