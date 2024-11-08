import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../routes/types';

interface VehicleInfoProps {
    route: any; // Recebe as informações passadas pela navegação
}

type NavigationProp = NativeStackNavigationProp<StackParamList, 'VerInfo'>;

const VerInfo = ({ route }: VehicleInfoProps) => {
    const navigation = useNavigation<NavigationProp>();

    // Extraindo os dados do veículo
    const { id, modelo, marca, placa, imagePath } = route.params;

    // Função para redirecionar à tela de edição
    function handleEditar() {
        navigation.navigate('TelaEditarVeiculo', { id: id });
    }

    return (
        <View style={styles.container}>
            {/* Imagem do veículo ocupando o topo, com fundo preto para verificar transparência */}
            <View style={styles.imageContainer}>
                <Image 
                    source={imagePath ? { uri: imagePath } : require('../../../../assets/carro-tela-inicial.png')}
                    style={styles.vehicleImage}
                    resizeMode="cover"
                />
            </View>

            {/* Informações do veículo em um card */}
            <ScrollView contentContainerStyle={styles.infoContainer}>
                <Text style={styles.title}>Informações do Veículo</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Modelo:</Text>
                    <Text style={styles.value}>{modelo}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Marca:</Text>
                    <Text style={styles.value}>{marca}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Placa:</Text>
                    <Text style={styles.value}>{placa}</Text>
                </View>
            </ScrollView>

            {/* Botão de editar no canto inferior direito */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditar}>
                <Icon name="edit" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: 'black', // Fundo preto para verificar transparência
    },
    vehicleImage: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginHorizontal: 20,
        marginTop: -20, // Sobrepõe a parte de baixo da imagem
        paddingBottom: 40, // Espaço para o botão flutuante
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'left',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    editButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default VerInfo;
