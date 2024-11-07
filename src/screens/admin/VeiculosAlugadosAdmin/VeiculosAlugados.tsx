import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import styles from '../../styles/TelaHomeStyle';
import ButtonMore from '../../../components/ButtonMore/ButtonMore';
import { API_URL } from '@env';

import CardVeiculo from '../../../components/CardVehicle/CardVehicle'; // Corrigido para `CardVeiculo`
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
        const url = `${API_URL}/api/backend/vehicles/disponibilidade/${disponibilidade}`;
        console.log(`Fetching: ${url}`);
        const response = await fetch(url);
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
            console.log('Renderizando imagem com imagePath:', imagePath);

            console.log('Image path para veículo:', vehicle.modelo, imagePath);
            return {
                ...vehicle,
                imagePath,
            };
        });

        console.log('Fetched vehicles:', vehiclesData);
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
      id={item.id} // Adicionado
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
