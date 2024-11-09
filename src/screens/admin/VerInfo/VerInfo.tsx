import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../routes/types';
import { API_URL } from '@env';
import axios from 'axios';

interface VehicleInfoProps {
    route: any;
}

type NavigationProp = NativeStackNavigationProp<StackParamList, 'VerInfo'>;

const VerInfo = ({ route }: VehicleInfoProps) => {

    const [cor, setCor] = useState();
    const [ano, setAno] = useState();
    const [combustivel, setCombustivel] = useState();
    const [quilometragem, setQuilometragem] = useState();
    const navigation = useNavigation<NavigationProp>();
    const scaleAnim = new Animated.Value(1);

    // Extraindo os dados do veículo passados pela navegação
    //const { id, modelo, marca, placa, cor, combustivel, ano, quilometragem, imagePath } = route.params;
    const { id, modelo, placa, marca, imagePath } = route.params;

    // Função para redirecionar à tela de edição
    function handleEditar() {
        navigation.navigate('TelaEditarVeiculo', { id: id });
    }

    // Função para voltar à tela anterior
    function handleBack() {
        navigation.goBack();
    }

    // Função para animar os botões
    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const fetchVehicleData = async () => {
        try {
            
            const url = `${API_URL}/api/backend/vehicle/info/${id}`;
            console.log(`Fetching: ${url}`);
            const response = await fetch(url);
            const result = await response.json();

            const vehiclesData = result.map((vehicle: any) => {
                setCor(vehicle.cor);
                setAno(vehicle.ano);
                setCombustivel(vehicle.combustivel);
                setQuilometragem(vehicle.quilometragem);
            });
            
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            Alert.alert("Erro", "Não foi possível carregar as opções ou os dados do veículo.");
        }
    };

    useEffect(() => {
        fetchVehicleData();
    }, [id]);

    return (
        <View style={styles.container}>
            {/* Imagem do veículo com o botão de voltar sobreposto */}
            <View style={styles.imageContainer}>
                <Image 
                    source={imagePath ? { uri: imagePath } : require('../../../../assets/photo.jpeg')}
                    style={styles.vehicleImage}
                    resizeMode="cover"
                />
                {/* Botão de voltar com transparência */}
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Informações do veículo em um card */}
            <ScrollView contentContainerStyle={styles.infoContainer}>
                <Text style={styles.modelo}>{modelo}</Text>
                <View style={styles.specificationsContainer}>
                    <Text style={styles.specificationsTitle}>Especificações do Veículo</Text>

                    <View style={styles.row}>
                        <View style={styles.infoColumn}>
                            <Text style={styles.label}>Placa:</Text>
                            <Text style={styles.value}>{placa || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                            <Text style={styles.label}>Marca:</Text>
                            <Text style={styles.value}>{marca || 'N/A'}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.infoColumn}>
                            <Text style={styles.label}>Cor:</Text>
                            <Text style={styles.value}>{cor || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                            <Text style={styles.label}>Combustível:</Text>
                            <Text style={styles.value}>{combustivel || 'N/A'}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.infoColumn}>
                            <Text style={styles.label}>Ano:</Text>
                            <Text style={styles.value}>{ano || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                            <Text style={styles.label}>Quilometragem:</Text>
                            <Text style={styles.value}>{quilometragem || quilometragem}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            

            {/* Barra de navegação fixa com três botões */}
            <View style={styles.tabBar}>
                {/* Botão Home */}
                <TouchableOpacity 
                    style={styles.tabButton} 
                    onPress={() => { 
                        navigation.navigate('Home'); // Redireciona para a tela Home
                        animateButton(); 
                    }}
                >
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Icon name="home" size={24} color="white" />
                    </Animated.View>
                </TouchableOpacity>
                
                {/* Botão Editar */}
                <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => { 
                        handleEditar(); 
                        animateButton(); 
                    }}
                >
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Icon name="edit" size={24} color="white" />
                    </Animated.View>
                </TouchableOpacity>

                {/* Botão Info */}
                <TouchableOpacity 
                    style={styles.tabButton} 
                    onPress={animateButton}
                >
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Icon name="info" size={24} color="white" />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFAFA',
    },
    infoContainer: {

    },
    imageContainer: {
        width: '100%',
        height: 250,
        position: 'relative',
    },
    vehicleImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 20,
    },
    modelo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 25,
        marginLeft: 20,
        color: 'black',
    },
    specificationsContainer: {
        backgroundColor: '#efefef',
        padding: 15,
        borderRadius: 30,
        marginTop: 25,
        marginHorizontal: 20,
    },
    specificationsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoColumn: {
        width: '48%',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'gray',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#354A84', // Transparência na tabBar
        paddingVertical: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    tabButton: {
        padding: 10,
        backgroundColor: '#354A84',
        borderRadius: 50, // Botões arredondados
    },
    editButton: {
        padding: 15,
        backgroundColor: '#354A84',
        borderRadius: 50, // Botão de editar arredondado
    },
});

export default VerInfo;
