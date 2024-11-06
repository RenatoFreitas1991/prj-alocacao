import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styles from './CardVehicleStyle';
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
    nameButton?: string;
    iconButton?: any;
}

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function CardVehicle({
    id,
    modelo,
    marca,
    placa,
    imagePath,
    nameButton,
    iconButton,
}: CardVehicleProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NavigationPropInicial>();

    function abrirTelaEditarVeiculo() {
        setModalVisible(false); // Fecha o modal
        navigation.navigate('TelaEditarVeiculo', { id: id });
    }

    function verInfo() {
        setModalVisible(false); // Fecha o modal
        // Navegar para a tela de detalhes ou fazer outra ação
    }

    const handleImageClick = () => {
        setModalVisible(true); // Abre o modal ao clicar na imagem
    };

    const closeModal = () => {
        setModalVisible(false); // Fecha o modal ao clicar fora
    };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={handleImageClick}>
                <Image 
                    source={imagePath ? { uri: imagePath } : require('../../../assets/carro-tela-inicial.png')}
                    style={styles.img}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{modelo}</Text>
                <Text style={styles.infoText}>{marca}</Text>
                <Text style={styles.infoText}>{placa}</Text>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <TouchableOpacity style={styles.modalButton} onPress={abrirTelaEditarVeiculo}>
                                    <Text style={styles.modalButtonText}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={verInfo}>
                                    <Text style={styles.modalButtonText}>Ver info</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
