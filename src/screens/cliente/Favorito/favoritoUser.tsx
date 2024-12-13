import React, { useState, useEffect, useMemo, useCallback } from "react";
import { StyleSheet,FlatList, Text, View, ListRenderItem } from 'react-native';
import { API_URL } from '@env';
import CardVeiculo from '../../../components/CardVehicle/CardVehicle';

import { StackParamList } from '../../../routes/types';
import { RouteProp, useRoute } from '@react-navigation/native';

type userTabNavigatorProp = RouteProp<StackParamList, 'TelaFavorito'>;

export default function TelaFavorito() {

  const route = useRoute<userTabNavigatorProp>();
  const { cpf } = route.params;

  interface MinVeiculo {
    id: number;
    modelo: string;
    marca: string;
    placa: string;
    imagePath?: string;
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
  const [cpfUser, setCpfUser] = useState(cpf);

  const fetchData = async () => {
    try {
      const url = `${API_URL}/api/backend/favorites/${cpfUser}`;
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
  }, [cpfUser]);

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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum veículo foi favoritado.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 120,  // Reduz o tamanho da imagem para ter mais espaço para o texto
    height: 98,
    borderRadius: 10,
    marginRight: -60,  // Diminui o espaço entre a imagem e o texto
  },
  textContainer: {
    flex: 1,  // Usa todo o espaço restante para o texto
    justifyContent: 'center',
    paddingVertical: 5,  // Ajusta o padding vertical para não deixar os textos tão distantes
  },
  modeloText: {
    color: '#2B3A67',  // Azul escuro
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,  // Diminui o espaço abaixo do modelo
  },
  marcaText: {
    color: '#6E6E6E',  // Cinza
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3,  // Mantém o espaço baixo consistente
  },
  placaText: {
    color: '#6E6E6E',  // Cinza
    fontWeight: 'bold',
    fontSize: 14,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFAFA",
  },
  listContainer: {
    width: '100%',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
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
});