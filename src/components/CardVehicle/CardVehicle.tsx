import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
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
}

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function CardVehicle({
    id,
    modelo,
    marca,
    placa,
    imagePath,
}: CardVehicleProps) {
    const navigation = useNavigation<NavigationPropInicial>();
    const [modalVisible, setModalVisible] = useState(false);

    // Função para abrir a tela de edição e fechar o modal
    function handleEditar() {
        setModalVisible(false);
        navigation.navigate('TelaEditarVeiculo', { id: id });
    }

    // Função para a opção "Ver Info"
    function handleVerInfo() {
        setModalVisible(false);
        // Implementar navegação para a tela de informações, se necessário
    }

    return (
        <View style={styles.cardContainer}>
            {/* Renderiza a imagem do veículo ou uma imagem padrão */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                {imagePath ? (
                    <Image 
                        source={{ uri: imagePath }}
                        style={styles.img}
                        resizeMode="cover"
                    />
                ) : (
                    <Image 
                        source={require('../../../assets/carro-tela-inicial.png')}
                        style={styles.img}
                    />
                )}
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <View style={styles.viewText}>
                    <Text style={styles.label}>Modelo:</Text>
                    <Text style={styles.text}>{modelo}</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.label}>Marca:</Text>
                    <Text style={styles.text}>{marca}</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.label}>Placa:</Text>
                    <Text style={styles.text}>{placa}</Text>
                </View>
            </View>

            {/* Modal para opções "Editar" e "Ver Info" */}
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
                        <TouchableOpacity style={styles.modalButton} onPress={handleEditar}>
                            <Text style={styles.modalButtonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleVerInfo}>
                            <Text style={styles.modalButtonText}>Ver Info</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
