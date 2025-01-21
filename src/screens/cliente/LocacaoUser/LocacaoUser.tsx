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

import { isBefore, isAfter, isEqual, differenceInDays } from 'date-fns';
import { strict } from "assert";
import BR from "src/components/BR/BR";

type locacaoUserProp = RouteProp<StackParamList, 'LocacaoUser'>;

export default function LocacaoUser() {

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
  const [modalMessage, setModalMessage] = useState('');

  const route = useRoute<locacaoUserProp>();
  const { cpf } = route.params;

  function rentalDateVehicle(dateProp:string, id_pagamento:number) {

    const now = new Date();
    var rentalDate = stringToDate(dateProp);
    var timeDiff = Math.abs(rentalDate.getTime() - now.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if((isBefore(now, rentalDate) && diffDays <= 7 && id_pagamento == 1) || ( diffDays == 1 && id_pagamento == 1)) {
      setModalMessage(`Pague o alaguel do veículo`)
      setModalVisible(true);
    } else if (isAfter(now, rentalDate) && (id_pagamento == 1)) {
      setModalMessage(`Seu aluguel do veículo está atrasado! Tente pagar o quanto antes!`)
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }

  function stringToDate(dateString:string) {
    const dateSplit = dateString.split("/");

    const year = Number(dateSplit[2]);
    const month = Number(dateSplit[1]) - 1;
    const day = Number(dateSplit[0]);

    const dateFormat = new Date(year, month, day);
    return dateFormat;
  }

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
        rentalDateVehicle(vehicle.data_de_devolucao, vehicle.id_pagamento)
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

  // useEffect(() => {
  //   rentalDate();
  // }, []);

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

                  <Text style={styles.textModalContainer}>{modalMessage}</Text>
                  <BR />
                  <TouchableOpacity style={styles.modalButton} >
                      <Text style={styles.modalButtonText} onPress={() => setModalVisible(false)}>Cancelar</Text>
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
    }
})
