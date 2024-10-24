import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './CardVehicleStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/stack.routes";

interface CardVehicleProps {
    modelo:string;
    marca:string;
    placa:string;
    imgName?:string;
    nameButton?:string;
    iconButton?:any;
}

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function CardVehicle({modelo, marca, placa, imgName, nameButton, iconButton}: CardVehicleProps) {

    const navigation = useNavigation<NavigationPropInicial>();

    let modeloProp = modelo;
    let marcaProp = marca;
    let placaProp = modelo;

    function abrirTelaEditarVeiculo() {
        navigation.navigate('TelaEditarVeiculo', {
            modeloProp,
            marcaProp,
            placaProp,
        });
    }

    return(
        <View style={styles.cardContainer}>
            {imgName ? (
                <Image 
                    source={{ uri: imgName }}
                    style={styles.img}
                />
            ): (
                <Image 
                    source={require(`../../../assets/carro-tela-inicial.png`)}
                    style={styles.img}
                />
            )
            }

            <View style={styles.textContainer}>

                <View  style={styles.viewText}>
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
{/* 
                <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
                    <Text style={styles.textButton}>
                        Deletar <Icon name="trash" size={14} color="#ffff" />
                    </Text>
                </TouchableOpacity> */}

            </View>
        </View>
    )
}