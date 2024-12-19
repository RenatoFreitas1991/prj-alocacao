import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem, Text, StyleSheet } from "react-native";
import { API_URL } from '@env';
import CardVeiculo from '../../../components/CardVehicle/CardVehicle';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from '../../../routes/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import BR from '../../../components/BR/BR';

type locacaoUserProp = RouteProp<StackParamList, 'LocacaoUser'>;

export default function LocacaoUser() {

  interface MinVeiculo {
    id: number;
    modelo: string;
    marca: string;
    placa: string;
    imagePath?: string;
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);

  const route = useRoute<locacaoUserProp>();
  const { cpf } = route.params;

  const fetchData = async () => {
    try {
      const url = `${API_URL}/api/backend/locacao/vehicles/user/${cpf}`;
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
      console.error('Erro ao buscar os dados de locação do usuário ->', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cpf]);

  const renderCardVehicle: ListRenderItem<MinVeiculo> = ({ item }) => (
    <CardVeiculo
      id={item.id}
      modelo={item.modelo}
      marca={item.marca}
      placa={item.placa}
      imagePath={item.imagePath}
    />
  );

  return (
    <View style={styles.container1}>
        <BR />
      <FlatList
        style={styles.listContainer}
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCardVehicle}
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você não possui nenhuma locação.</Text>
          </View>
        }
      />
        {/* <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você não possui nehuma locação.</Text>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
      width: '100%',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
    },
})
