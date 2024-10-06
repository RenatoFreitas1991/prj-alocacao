import React from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../routes/stack.routes"; // Import StackParamList type
import styles from "./styles/TelaLoginStyle";

// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<StackParamList, 'Login'>;

export default function TelaLogin() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.titulo}>Login</Text>
                <View style={styles.viewInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry
                    />
                </View>
                <View style={styles.botoesContainer}>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {/* Login logic here */}}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={navigation.goBack}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
