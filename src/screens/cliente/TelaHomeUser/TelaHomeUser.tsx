import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import VeiculosNaoAlugados from '../VeiculosNaoAlugados/VeiculosNaoAlugados';
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from '../../../routes/types';
import { RouteProp, useRoute } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

type homeUserRouter = RouteProp<StackParamList, 'TelaHomeUser'>;
type homeUserNavigation = NativeStackNavigationProp<StackParamList, 'TelaHomeUser'>;

export default function TelaHome() {

  const navigation = useNavigation<homeUserNavigation>();
  const [searchText, setSearchText] = useState('');

  const route = useRoute<homeUserRouter>();
  const { cpf } = route.params;

  function goToLocaoUser() {
    navigation.navigate('LocacaoUser', {cpf: cpf});
  }

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
      
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={goToLocaoUser}> Ver Locação </Text>
        </TouchableOpacity>
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
  buttonView: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2B3A67',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
  },
});
