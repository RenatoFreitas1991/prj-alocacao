import React, { useState } from "react";
import { View, Button } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../routes/stack.routes"; // Import StackParamList type

type NavigationPropInicial = NativeStackNavigationProp<StackParamList, 'Login'>;

function HomeScreen() {
    const navigation = useNavigation<NavigationPropInicial>();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Button
          onPress={() => navigation.navigate('Home')}
          title="Go to notifications"
        /> */}
      </View>
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