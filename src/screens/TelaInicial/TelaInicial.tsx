import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Animated, Dimensions, PanResponder } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes/types";
import styles from "./TelaInicialStyle";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

const IMAGES = [
    require('../../../assets/moto-img.jpg'),
    require('../../../assets/moto-img.jpg'),
    require('../../../assets/moto-img.jpg')
];

const { width } = Dimensions.get("window");

export default function TelaInicial() {
    const navigation = useNavigation<NavigationProp>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const translateX = useRef(new Animated.Value(0)).current;

    const goToNextImage = () => {
        setNextIndex((currentIndex + 1) % IMAGES.length); // Define o índice da próxima imagem

        Animated.timing(translateX, {
            toValue: -width,
            duration: 450,
            useNativeDriver: true,
        }).start(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length); // Atualiza o índice atual
            translateX.setValue(0); // Reseta a posição
        });
    };

    useEffect(() => {
        const interval = setInterval(goToNextImage, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, { dx }) => Math.abs(dx) > 20,
        onPanResponderRelease: (_, { dx }) => {
            if (dx < -50) {
                goToNextImage();
            } else if (dx > 50) {
                setNextIndex((prevIndex) => (prevIndex - 1 + IMAGES.length) % IMAGES.length);
                Animated.timing(translateX, {
                    toValue: width,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    setCurrentIndex((prevIndex) => (prevIndex - 1 + IMAGES.length) % IMAGES.length);
                    translateX.setValue(0);
                });
            }
        }
    });

    function abrirTelaLoginAdmin() {
        navigation.navigate('LoginAdmin');
    }

    function abrirTelaCadastro() {
        navigation.navigate('Cadastro');
    }

    function abrirTelaUser() {
        navigation.navigate('LoginUser');
    }

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <Animated.Image
                source={IMAGES[currentIndex]}
                style={[
                    styles.backgroundImage,
                    { transform: [{ translateX }] }
                ]}
            />
            <Animated.Image
                source={IMAGES[nextIndex]}
                style={[
                    styles.backgroundImage,
                    { transform: [{ translateX: translateX.interpolate({
                        inputRange: [-width, 0],
                        outputRange: [0, width],
                    })}]}
                ]}
            />
            <View style={styles.overlay}>
                <Text style={[styles.titulo, styles.bemVindo]}>Bem vindo(a)</Text>
                <View style={styles.botoesContainer}>
                    <TouchableOpacity style={styles.button} onPress={abrirTelaLoginAdmin}>
                        <Text style={styles.buttonText}>Acesso do administrador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={abrirTelaCadastro}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]} onPress={abrirTelaUser}>
                        <Text style={styles.buttonText}>Já sou cliente</Text>
                     </TouchableOpacity>

                    
                </View>
            </View>
        </View>
    );
}
