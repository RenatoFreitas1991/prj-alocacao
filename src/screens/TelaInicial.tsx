import React from "react";
import { Button, ImageBackground, Text, View } from "react-native";
import styles from "./styles/TelaCadastroStyle";

export default function TelaInicial({ navigation }) {

    function abrirTelaLogin() {
        navigation.navigate('Login')
    }

    function abrirTelaCadastro() {
        navigation.navigate('Cadastro')
    }


    return(
        <View style={styles.container}>
        
                <Text style={styles.titulo}>Bem vindo ao App de alocação de veículo</Text>
                <View style={styles.botoesContainer}>
                    <View style={styles.botao}>
                        <Button
                            title="Entrar"
                            onPress={abrirTelaLogin}
                        />
                    </View>
                    <View style={styles.botao}>
                        <Button
                            title="Cadastrar"
                            onPress={abrirTelaCadastro}
                        />
                    </View>
                    
                </View>
             
        </View>

    )
}