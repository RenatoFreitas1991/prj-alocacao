import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/style";

export default function TelaLogin() {
    const navigation = useNavigation()
    
    return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Entre na sua conta do App de alocação de veículo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                />
                <TextInput
                    style={styles.input}
                    placeholder="senha"
                />
                <View style={styles.botoesContainer}>
                    <View style={styles.botao}>
                        <Button
                            title="Entrar"
                        />
                    </View>
                    <View style={styles.botao}>
                        <Button
                            title="Voltar"
                            onPress={()=>navigation.goBack()}
                        />
                    </View>
                </View>
                
            </View>

    )
}