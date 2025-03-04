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

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';

import { isBefore, isAfter } from 'date-fns';
import BR from "src/components/BR/BR";

type locacaoUserProp = RouteProp<StackParamList, 'LocacaoUser'>;
type locacaoUserNavigation = NativeStackNavigationProp<StackParamList, 'LocacaoUser'>;

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
  const [countRental, setCountRental] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [mensagemPagamento, setMensagemPagamen] = useState('');

  const route = useRoute<locacaoUserProp>();
  const navigation = useNavigation<locacaoUserNavigation>();
  const { cpf } = route.params;

  function goToHistoricoLocacao() {
    navigation.navigate('HistoricoLocacao', { cpf: cpf });
  }

  var rentalQuantity = 0;
  var now = new Date();

  function rentalDateVehicle(dateProp:string, id_pagamento:number) {

    var rentalDate = stringToDate(dateProp);
    var diffDays = differenceOfDays(rentalDate, now);

    if(isRentalDate(now, rentalDate, diffDays, id_pagamento)) {
      rentalQuantity += 1;
    }

    setCountRental(rentalQuantity);

    if(rentalQuantity > 0) {
      setModalMessage(`Pague o alaguel do veículo`);
      setModalVisible(true);
    }
  }

  function isRentalDate(now:Date, rentalDate:Date, diffDays:number, id_pagamento:number) {
    var isRentalDate = false;
    if((isBefore(now, rentalDate) && diffDays <= 7 && id_pagamento == 1) || ( diffDays == 1 && id_pagamento == 1)) {
      isRentalDate = true;
    } else if (isAfter(now, rentalDate) && (id_pagamento == 1)) {
      isRentalDate = true;
    }
    return isRentalDate;
  }

  function differenceOfDays(rentalDate:any, now:any) {
    var timeDiff = Math.abs(rentalDate.getTime() - now.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
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
        rentalDateVehicle(vehicle.data_de_devolucao, vehicle.id_pagamento);
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
        mensagemPagamento={isRentalDate(now, stringToDate(item.dataDevolucao), differenceOfDays(stringToDate(item.dataDevolucao), now), item.idPagamento) == true ? "PAGAMENTO PENDENTE" : ""}
      />
  );

  return (
    <View style={styles.container1}>

      <TouchableOpacity style={styles.button} onPress={goToHistoricoLocacao}>
        <Text style={styles.buttonText}> Histórico de Locação </Text>
      </TouchableOpacity>

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
                      {/* <Text style={styles.textModalContainer}>Quantidade de alugueis a pagar: {countRental}.</Text> */}
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
    cardColorPage: {
      backgroundColor: 'red',
      borderRadius: 10,
    },
    cardColorNoPage: {
      backgroundColor: '#fff',
      borderRadius: 10,
    }
})
