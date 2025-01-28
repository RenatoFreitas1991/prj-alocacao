import React, { useState, useEffect } from "react";
import { 
  View, 
  ScrollView, 
  FlatList, 
  ListRenderItem, 
  StyleSheet, 
  Platform, 
  KeyboardAvoidingView, Text } from "react-native";
import CardHistorico from '../../../components/CardHistorico/CardHistorico';
import BR from '../../../components/BR/BR';

import { API_URL } from '@env';

export default function HistoricoAlugados() {
  interface MinVeiculo {
    id: number;
    nome: string;
    data_de_entrega: string;
    data_de_devolucao: string;
    imagePath?: string;
    searchQuery?: string;
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);

  const fetchData = async () => {
    try {
      const url = `${API_URL}/api/backend/vehicles/rentalVehicleHistory`;
      console.log(`Fetchinf: ${url}`);
      const response =await fetch(url);
      const result = await response.json();

      const vehiclesData = result.map((vehicle: any) => {
        let imagePath = null;

        if(vehicle.imagePath) {
          try {
            const imagePathArray = JSON.parse(vehicle.imagePath);
            if(Array.isArray(imagePathArray) && imagePathArray.length > 0) {
              imagePath = `${API_URL}${imagePathArray[0]}`;
            }
          } catch(parseError) {
            console.error('Erro ao parsear imagePath:', parseError);
          }
        }

        return {
          ...vehicle,
          imagePath,
        }

      });

      setVehicles(vehiclesData);

    } catch (error) {
        console.error('Erro ao buscar os dados dos veículos ->', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCardVehicle: ListRenderItem<MinVeiculo> = ({ item }) => (
    <CardHistorico 
      nomeCliente={item.nome}
      dataEntrega={item.data_de_entrega}
      dataDevolucao={item.data_de_devolucao}
      imagePath={item.imagePath}
    />
  );

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container1}
    >
      
      <FlatList
        style={styles.listContainer}
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCardVehicle}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 100 }} // Adicionando espaço para o botão fixo
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Histórico de veículos alugados.</Text>
          </View>
        }
      />
      
      {/* Botão fixo centralizado na parte inferior */}
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20, // Ajuste conforme necessário
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
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