import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import styles from './CardVehicleStyle';
import userStyles from '../../screens/cliente/TelaHomeUser/CardVehicleUserStyle';  // Estilos da tela de usuário
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/types";

import { API_URL } from '@env';
import axios from 'axios';

interface CardVehicleProps {
  id: number;
  modelo: string;
  marca: string;
  placa: string;
  imagePath?: string;
  isUserScreen?: boolean;
  tela?:string;
  cpfUser?:string;
}

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function CardVehicle({
  id,
  modelo,
  marca,
  placa,
  imagePath,
  isUserScreen = false,  // Valor padrão como 'false'
  tela,
  cpfUser
}: CardVehicleProps) {
  const navigation = useNavigation<NavigationPropInicial>();
  const [modalVisible, setModalVisible] = useState(false);
  const [cpf, setCpf] = useState(cpfUser || '');

  const favoritateVehicle = async () => {
    setModalVisible(false);

    const id_veiculo = id;

    const bodyRequest = {
      cpfUser,
      id_veiculo
    }

    try {
      const response = await axios.post(`${API_URL}/api/backend/favorites/favoritate`, bodyRequest);
      Alert.alert('Sucesso', 'Veículo Favoritado com sucesso');
    } catch(error) {
      console.log('Error ao favoritar veículo', error);
      Alert.alert('Error', 'Error ao favoritar veículo');
    }

  };

  function goToEditar() {
    setModalVisible(false);
    navigation.navigate('TelaEditarVeiculo', { id: id });
  }

  function goToEditarLocacao() {
    setModalVisible(false);
    navigation.navigate('TelaEditarLocacaoVeiculo', {id: id});
  }

  function goToHistoricoManutencaoVeiculo() {
    setModalVisible(false);
    navigation.navigate('TelaHistoricoManutencaoVeiculo', {id: id});
  }

  function goToVerInfo() {
    setModalVisible(false);
    navigation.navigate('VerInfo', { id, modelo, marca, placa, imagePath, isUserScreen});
  }

  return (
    <View style={isUserScreen ? userStyles.cardContainer : styles.cardContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {imagePath ? (
          <Image source={{ uri: imagePath }} style={isUserScreen ? userStyles.img : styles.img} resizeMode="cover" />
        ) : (
          <Image source={require('../../../assets/moto.jpeg')} style={isUserScreen ? userStyles.img : styles.img} />
        )}
      </TouchableOpacity>
      <View style={styles.textContainer}>
         <Text style={isUserScreen ? userStyles.modeloText : styles.text}>{modelo}</Text>
         <Text style={isUserScreen ? userStyles.marcaText : styles.text}>{marca}</Text>
         <Text style={isUserScreen ? userStyles.placaText : styles.text}>{placa}</Text>
      </View>


      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContainer}>
            {isUserScreen ? (
              <>
                <TouchableOpacity style={styles.modalButton} onPress={goToVerInfo}>
                  <Text style={styles.modalButtonText}>Ver Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} >
                  <Text style={styles.modalButtonText} onPress={favoritateVehicle}>Favoritar</Text>
                </TouchableOpacity>
              </>
            ) : tela != 'naoAlugado' ? (
              <>
                <TouchableOpacity style={styles.modalButton} onPress={goToEditarLocacao}>
                  <Text style={styles.modalButtonText}>Locação</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={goToVerInfo}>
                  <Text style={styles.modalButtonText}>Ver Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton}>
                  <Text style={styles.modalButtonText} onPress={goToHistoricoManutencaoVeiculo}>Manutenções</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.modalButton} onPress={goToEditar}>
                  <Text style={styles.modalButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={goToVerInfo}>
                  <Text style={styles.modalButtonText}>Ver Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton}>
                  <Text style={styles.modalButtonText} onPress={goToHistoricoManutencaoVeiculo}>Manutenções</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
