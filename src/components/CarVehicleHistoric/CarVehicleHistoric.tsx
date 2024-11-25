import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './CardVehicleHistoricStyle';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../routes/types";

interface CardHistoricoProps {
    id:number;
    dataManutencao:string;
}

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'TelaHomeAdmin'>;

export default function CarVehicleHistoric({dataManutencao, id}: CardHistoricoProps) {

    const navigation = useNavigation<NavigationPropInicial>();

    let imgName = '';

    return(
        <View style={styles.cardContainer}>
            {imgName ? (
                <Image 
                    source={{ uri: imgName }}
                    style={styles.img}
                />
            ): (
                <Image 
                    source={require(`../../../assets/photo.jpeg`)}
                    style={styles.img}
                />
            )
            }

            <View style={styles.textContainer}>

                <View  style={styles.viewText}>
                    <Text style={styles.label}>Data de Manutenção: </Text>
                    <Text style={styles.text}>{dataManutencao}</Text>
                </View>

            </View>
            <View style={styles.viewButton}>

                <TouchableOpacity style={[styles.button, styles.buttonUpdate]}>
                    <Text style={styles.textButton}>
                        Mais Informações
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}