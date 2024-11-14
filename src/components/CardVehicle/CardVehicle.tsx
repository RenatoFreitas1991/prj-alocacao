import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import styles from './CardVehicleStyle';
import userStyles from '../../screens/cliente/TelaHomeUser/CardVehicleUserStyle';  // Estilos da tela de usuário
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/types";

interface CardVehicleProps {
  id: number;
  modelo: string;
  marca: string;
  placa: string;
  imagePath?: string;
  isUserScreen?: boolean;
}

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function CardVehicle({
  id,
  modelo,
  marca,
  placa,
  imagePath,
  isUserScreen = false,  // Valor padrão como 'false'
}: CardVehicleProps) {
  const navigation = useNavigation<NavigationPropInicial>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleEditar() {
    setModalVisible(false);
    navigation.navigate('TelaEditarVeiculo', { id: id });
  }

  function handleVerInfo() {
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
              <TouchableOpacity style={styles.modalButton} onPress={handleVerInfo}>
                <Text style={styles.modalButtonText}>Ver Info</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.modalButton} onPress={handleEditar}>
                  <Text style={styles.modalButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleVerInfo}>
                  <Text style={styles.modalButtonText}>Ver Info</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
