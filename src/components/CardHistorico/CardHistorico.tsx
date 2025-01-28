import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './CardHistoricoStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/types";

interface CardHistoricoProps {
    nomeCliente:string;
    dataEntrega:string;
    dataDevolucao:string;
    modelo?:string;
    marca?:string;
    placa?:string;
    imagePath?:string;
    nameButton?:string;
    isUserScreen?: boolean;
}

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function CardHistorico({
    nomeCliente, 
    dataEntrega, 
    dataDevolucao, 
    modelo, 
    marca, 
    placa, 
    imagePath, 
    isUserScreen = true
    }: CardHistoricoProps) {

    const navigation = useNavigation<NavigationPropInicial>();
    const [modalVisible, setModalVisible] = useState(false);

    let clienteProp = nomeCliente;
    let marcaProp = marca;
    let modeloProp = modelo;
    let placaProp = placa;

    // function abrirAbrirHistoricoManutencao() {
    //     navigation.navigate('HistoricoManutencao', {
    //         clienteProp,
    //         marca,
    //         modelo,
    //         placa,
    //     });
    // }

    return(
        <View style={styles.cardContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            {imagePath ? (
            <Image source={{ uri: imagePath }} style={isUserScreen ? styles.img : styles.img} resizeMode="cover" />
            ) : (
            <Image source={require('../../../assets/moto.jpeg')} style={isUserScreen ? styles.img : styles.img} />
            )}
        </TouchableOpacity>

            <View style={styles.textContainer}>

                <View  style={styles.viewText}>
                    <Text style={styles.label}>Cliente: </Text>
                    <Text style={styles.text}>{nomeCliente}</Text>
                </View>

                <View  style={styles.viewText}>
                    <Text style={styles.label}>Data de entrega: </Text>
                    <Text style={styles.text}>{dataEntrega}</Text>
                </View>

                <View  style={styles.viewText}>
                    <Text style={styles.label}>Data de devolução: </Text>
                    <Text style={styles.text}>{dataDevolucao}</Text>
                </View>

            </View>
            <View style={styles.viewButton}>

                <TouchableOpacity style={[styles.button, styles.buttonUpdate]}>
                    <Text style={styles.textButton}>
                        Manutenções 
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}