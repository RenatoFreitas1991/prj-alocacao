import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './CardVehicleStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Asset } from 'expo-asset';

interface CardVehicleProps {
    modelo:string;
    marca:string;
    placa:string;
    imgName?:string;
}

export default function CardVehicle({modelo, marca, placa, imgName}: CardVehicleProps) {

    //let imgFileName = `../../../assets/carro-tela-inicial.png`;
    //const image = Asset.fromModule(require(`../../../assets/${imgName}`)).uri;
    let img

    return(
        <View style={styles.cardContainer}>
            {imgName ? (
                <Image 
                    source={{ uri: imgName }}
                    style={styles.img}
                />
            ): (
                <Image 
                    source={require('../../../assets/carro-tela-inicial.png')}
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

                <TouchableOpacity style={[styles.button, styles.buttonUpdate]}>
                    <Text style={styles.textButton}>
                        Editar <Icon name="edit" size={14} color="#ffff" />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
                    <Text style={styles.textButton}>
                        Deletar <Icon name="trash" size={14} color="#ffff" />
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}