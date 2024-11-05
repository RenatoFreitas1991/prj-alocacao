import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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
    id, // Adicionado
    modelo,
    marca,
    placa,
    imagePath,
    nameButton,
    iconButton,
  }: CardVehicleProps) {
    const navigation = useNavigation<NavigationPropInicial>();
  
    function abrirTelaEditarVeiculo() {
      navigation.navigate('TelaEditarVeiculo', {
        id: id, // Passa o id do veículo
      });
    }

    return (
        <View style={styles.cardContainer}>
            {/* Renderiza a imagem do veículo se `imagePath` estiver disponível; caso contrário, usa uma imagem padrão */}
            {imagePath ? (
                <Image 
                    source={{ uri: imagePath }}
                    style={styles.img}
                    resizeMode="contain" // ou "cover" dependendo do layout desejado
                />
            ) : (
                <Image 
                    source={require('../../../assets/carro-tela-inicial.png')}
                    style={styles.img}
                />
            )}

            <View style={styles.textContainer}>
                <View style={styles.viewText}>
                    <Text style={styles.label}>Modelo: </Text>
                    <Text style={styles.text}>{modelo}</Text>
                </View>

                <View style={styles.viewText}>
                    <Text style={styles.label}>Marca: </Text>
                    <Text style={styles.text}>{marca}</Text>
                </View>

                <View style={styles.viewText}>
                    <Text style={styles.label}>Placa: </Text>
                    <Text style={styles.text}>{placa}</Text>
                </View>
            </View>

            <View style={styles.viewButton}>
                <TouchableOpacity style={[styles.button, styles.buttonUpdate]} onPress={abrirTelaEditarVeiculo}>
                    <Text style={styles.textButton}>
                        {nameButton} <Icon name={iconButton} size={14} color="#ffff" />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
