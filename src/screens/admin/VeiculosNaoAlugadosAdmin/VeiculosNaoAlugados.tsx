import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
//import style from '../../styles/TelaHomeStyle';
import ButtonMore from '../../../components/ButtonMore/ButtonMore';
import { API_URL } from '@env';
import CardVeiculo from '../../../components/CardVehicle/CardVehicle';

export default function VeiculosNaoAlugados() {
  interface MinVeiculo {
    id: number;
    modelo: string;
    marca: string;
    placa: string;
    imagePath?: string;
    searchQuery?: string;
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<MinVeiculo[]>([]);
  const [searchText, setSearchText] = useState("");

  const tela = "naoAlugado";

  const fetchData = async () => {
    try {
        const url = `${API_URL}/api/backend/vehicles/disponibilidade/1`;
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
            return {
                ...vehicle,
                imagePath,
            };
        });

        setVehicles(vehiclesData);
        setFilteredVehicles(vehiclesData);
    } catch (error) {
        console.error('Erro ao buscar os dados dos veículos ->', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = vehicles.filter(vehicle =>
        vehicle.modelo.toLowerCase().includes(searchText.toLowerCase()) ||
        vehicle.marca.toLowerCase().includes(searchText.toLowerCase()) ||
        vehicle.placa.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles(vehicles);
    }
  }, [searchText, vehicles]);

  const renderCardVehicle: ListRenderItem<MinVeiculo> = ({ item }) => (
    <CardVeiculo
      id={item.id}
      modelo={item.modelo}
      marca={item.marca}
      placa={item.placa}
      imagePath={item.imagePath}
      vehicleNotRentalAdminScreen={true}
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container1}
    >
      <View style={searchStyles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={searchStyles.searchIcon} />
        <TextInput
          style={searchStyles.searchBar}
          placeholder="Buscar veículos..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <FlatList
        style={styles.listContainer}
        data={filteredVehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCardVehicle}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100 }} // Adicionando espaço para o botão fixo
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum veículo foi cadastrado.</Text>
          </View>
        }
      />
      
      {/* Botão fixo centralizado na parte inferior */}
      <View style={styles.fixedButtonContainer}>
        <ButtonMore />
      </View>
    </KeyboardAvoidingView>
  );
}

const searchStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    height: 50,
    color: "#333",
    fontSize: 16,
  },
});

// Estilo para o botão fixo
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
