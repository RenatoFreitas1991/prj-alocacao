import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../routes/stack.routes"; // Import StackParamList type
import styles from './styles/TelaHomeStyle'

import CardVeiculo from '../components/CardVehicle';

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'Login'>;

function HomeScreen() {
    const navigation = useNavigation<NavigationPropInicial>();

    return (
      <ScrollView style={styles.container}>
        {/* <Button
          onPress={() => navigation.navigate('Home')}
          title="Go to notifications"
        /> */}
        <View>

        </View>
        <View  style={styles.cardsContainer}>
          <CardVeiculo/>
          <CardVeiculo/>
          <CardVeiculo/>
          <CardVeiculo/>
          <CardVeiculo/>
        </View>
      </ScrollView>
    );
  }

const Drawer = createDrawerNavigator();

export default function TelaHome() {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Tela Home" component={HomeScreen} />
        </Drawer.Navigator>
    )
}