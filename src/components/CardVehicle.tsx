import { View, Text, Image } from 'react-native';
import styles from './styles/CardVehicleStyle';

export default function CardVehicle() {
    return(
        <View style={styles.cardContainer}>
            <View style={styles.viewImg}>
                <Image 
                    style={styles.img}
                    source={require('../../assets/carro-tela-inicial.png')}
                />
            </View>
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
        </View>
    )
}