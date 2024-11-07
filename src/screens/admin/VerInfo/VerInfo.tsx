import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

interface VehicleInfoProps {
    route: any; // Recebe as informações passadas pela navegação
}

const TelaVerInfo = ({ route }: VehicleInfoProps) => {
    // Extraindo os dados do veículo
    const { modelo, marca, placa, imagePath } = route.params;

    return (
        <ScrollView style={styles.container}>
            {/* Imagem do veículo */}
            <View style={styles.imageContainer}>
                {imagePath ? (
                    <Image source={{ uri: imagePath }} style={styles.vehicleImage} />
                ) : (
                    <Image
                        source={require('../../../../assets/carro-tela-inicial.png')}
                        style={styles.vehicleImage}
                    />
                )}
            </View>

            {/* Informações do veículo */}
            <View style={styles.infoContainer}>
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
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFAF0',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    vehicleImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
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
});

export default TelaVerInfo;
