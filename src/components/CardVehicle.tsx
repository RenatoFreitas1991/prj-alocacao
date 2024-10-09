import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles/CardVehicleStyle';

export default function CardVehicle() {
    return(
        <View style={styles.cardContainer}>
            <Image 
                style={styles.img}
                source={require('../../assets/carro-tela-inicial.png')}
            />

            <View style={styles.textContainer}>

                <View  style={styles.viewText}>
                    <Text style={styles.label}>Modelo: </Text>
                    <Text style={styles.text}>Polo</Text>
                </View>

                <View style={styles.viewText}>
                    <Text style={styles.label}>Marca: </Text>
                    <Text style={styles.text}>Lexus</Text>
                </View>

                <View style={styles.viewText}>
                    <Text style={styles.label}>Placa: </Text>
                    <Text style={styles.text}>MVB-6207</Text>
                </View>

            </View>
            <View style={styles.viewButton}>

                <TouchableOpacity style={[styles.button, styles.buttonUpdate]}>
                    <Text style={styles.textButton}>Atualizar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
                    <Text style={styles.textButton}>Deletar</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}