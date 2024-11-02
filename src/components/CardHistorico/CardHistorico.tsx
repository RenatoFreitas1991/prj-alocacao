import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './CardHistoricoStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/stack.routes";

interface CardHistoricoProps {
    nomeCliente:string;
    dataEntrega:string;
    dataDevolucao:string;
    modelo:string;
    marca:string;
    placa:string;
    imgName?:string;
    nameButton?:string;
}

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function CardHistorico({nomeCliente, dataEntrega, dataDevolucao, modelo, marca, placa, imgName, nameButton}: CardHistoricoProps) {

    const navigation = useNavigation<NavigationPropInicial>();

    let clienteProp = nomeCliente;
    let marcaProp = marca;
    let modeloProp = modelo;
    let placaProp = placa;

    function abrirAbrirHistoricoManutencao() {
        navigation.navigate('HistoricoManutencao', {
            clienteProp,
            marcaProp,
            modeloProp,
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

                {/* <View  style={styles.viewText}>
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
                </View> */}

            </View>
            <View style={styles.viewButton}>

                <TouchableOpacity style={[styles.button, styles.buttonUpdate]} onPress={abrirAbrirHistoricoManutencao}>
                    <Text style={styles.textButton}>
                        {nameButton} 
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