import React, { useState, useEffect } from "react";
import { 
  View, 
  FlatList, 
  ListRenderItem, 
  Text, 
  StyleSheet, 
  Modal,
  TouchableOpacity} from "react-native";
import { API_URL } from '@env';
import CardVeiculo from '../../../components/CardVehicle/CardVehicle';

import { StackParamList } from '../../../routes/types';
import { RouteProp, useRoute } from '@react-navigation/native';

import BR from "src/components/BR/BR";

type locacaoUserProp = RouteProp<StackParamList, 'HistoricoLocacao'>;

export default function HistoricoLocacao() {

  interface MinVeiculo {
    id: number;
    modelo: string;
    marca: string;
    placa: string;
    imagePath?: string;
    dataDevolucao?:string;
    idPagamento?:number;
  }

  const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [countRental, setCountRental] = useState(0);
  const [modalMessage, setModalMessage] = useState('');

  const route = useRoute<locacaoUserProp>();
  const { cpf } = route.params;

  const fetchData = async () => {
    try {
      const url = `${API_URL}/api/backend/locacao/vehicles/historic/user/${cpf}`;
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
          id: vehicle.idVehicle,
          modelo: vehicle.modelo,
          marca: vehicle.marca,
          placa: vehicle.placa,
          imagePath,
          dataDevolucao: vehicle.data_de_devolucao,
          idPagamento: vehicle.id_pagamento,
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
      </View>
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
    
              <Text>{modalMessage}</Text>
              <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                    activeOpacity={1}
                    >
                  <View style={styles.modalContainer}>
                      <Text style={styles.textModalContainer}>Quantidade de alugueis a pagar: {countRental}.</Text>
                      <BR />
                      <Text style={styles.textModalContainer}>{modalMessage}</Text>
                      <BR />
                      <TouchableOpacity style={styles.modalButton} >
                          <Text style={styles.modalButtonText} onPress={() => setModalVisible(false)}>Fechar</Text>
                      </TouchableOpacity>
                  </View>
              </TouchableOpacity>
    
            </Modal>

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
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 200,
    },
    modalButton: {
        padding: 10,
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 5,
    },
      modalButtonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textModalContainer: {
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#2B3A67',
      paddingVertical: 15,
      borderRadius: 8,
      marginVertical: 20,
      width: '90%',
      alignItems: 'center',
    },
    buttonText: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
    },
})
