import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from 'react-native-vector-icons';  // Para o ícone de lupa
import VeiculosNaoAlugados from '../VeiculosNaoAlugados/VeiculosNaoAlugados';
import { useNavigation } from "@react-navigation/native";  // Para usar a navegação

import { StackParamList } from '../../../routes/types';
import { RouteProp, useRoute } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

type userTabNavigatorProp = RouteProp<StackParamList, 'TelaHomeUser'>;

export default function TelaHome() {

  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const route = useRoute<userTabNavigatorProp>();
  const { cpf } = route.params;

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </TouchableOpacity>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <MaterialIcons name="search" size={24} color="#2B3A67" style={styles.searchIcon} />
      </View>

      
      {/* Navegação com Tab */}
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { display: 'none' },  // Esconde a linha de indicação
          tabBarLabelStyle: { display: 'none' },  // Esconde o nome da aba
        }}
      >
        <Tab.Screen 
          name="Veiculos Disponíveis" 
          children={() => <VeiculosNaoAlugados cpf={cpf} isUserScreen={true} />} 
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    marginBottom: 10,
    padding: 10,
  },
  backButtonText: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B3A67',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 25,
    paddingLeft: 10,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
