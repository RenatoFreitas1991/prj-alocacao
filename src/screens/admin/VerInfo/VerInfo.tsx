import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../routes/types';
import { API_URL } from '@env';

interface VehicleInfoProps {
    route: any;
    isUser?: boolean;  // Prop para indicar se é usuário ou admin
}

type NavigationProp = NativeStackNavigationProp<StackParamList, 'VerInfo'>;

const VerInfo = ({ route, isUser = false }: VehicleInfoProps) => {
    const [cor, setCor] = useState();
    const [ano, setAno] = useState();
    const [combustivel, setCombustivel] = useState();
    const [quilometragem, setQuilometragem] = useState();
    const navigation = useNavigation<NavigationProp>();
    const scaleAnim = new Animated.Value(1);
    

    const { id, modelo, placa, marca, imagePath, isUserScreen} = route.params;

    

    function handleEditar() {
        navigation.navigate('TelaEditarVeiculo', { id: id });
    }

    function handleBack() {
        navigation.goBack();
    }

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
    };

    const fetchVehicleData = async () => {
        try {
            const url = `${API_URL}/api/backend/vehicle/info/${id}`;
            const response = await fetch(url);
            const result = await response.json();

            result.map((vehicle: any) => {
                setCor(vehicle.cor);
                setAno(vehicle.ano);
                setCombustivel(vehicle.combustivel);
                setQuilometragem(vehicle.quilometragem);
            });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os dados do veículo.");
        }
    };

    useEffect(() => {
        fetchVehicleData();
    }, [id]);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={imagePath ? { uri: imagePath } : require('../../../../assets/photo.jpeg')}
                    style={styles.vehicleImage}
                    resizeMode="cover"
                />
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

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
                            <Text style={styles.value}>{quilometragem || 'N/A'}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Condicional para exibir a tab bar e o botão Editar somente para o admin */}
            {!isUser && (
                <View style={styles.tabBar}>
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
                </View>
            )}

            {/* Botão específico para a tela do usuário */}
            {isUser && (
                <TouchableOpacity style={styles.userButton}>
                    <Text style={styles.userButtonText}>Novo Botão</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFAFA',
    },
    infoContainer: {},
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
        backgroundColor: 'white',
        paddingVertical: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    editButton: {
        padding: 15,
        backgroundColor: '#354A84',
        borderRadius: 50,
    },
    userButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: '#354A84',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    userButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VerInfo;
