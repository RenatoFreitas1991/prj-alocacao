import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import { API_URL } from '@env';
import CardVeiculo from '../../../components/CardVehicle/CardVehicle';
import BR from '../../../components/BR/BR';
import styles from '../TelaHomeUser/CardVehicleUserStyle';


interface VeiculosNaoAlugadosProps {
  isUserScreen?: boolean;
}

export default function VeiculosNaoAlugados({ isUserScreen = false }: VeiculosNaoAlugadosProps) {

  interface MinVeiculo {
    id: number;
    modelo: string;
    marca: string;
    placa: string;
    imagePath?: string;
    
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
  const [disponibilidade, setDisponibilidade] = useState(1);

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
          id: vehicle.id,
          modelo: vehicle.modelo,
          marca: vehicle.marca,
          placa: vehicle.placa,
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
      id={item.id}
      modelo={item.modelo}
      marca={item.marca}
      placa={item.placa}
      imagePath={item.imagePath}
      isUserScreen={true}  // Passando a prop para o CardVehicle
    />
  );

  return (
    <View style={styles.container1}>
      <FlatList
        style={styles.listContainer}
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCardVehicle}
        numColumns={1}
        ListFooterComponent={
          <>
            <BR />
          </>
        }
      />
    </View>
  );
}
