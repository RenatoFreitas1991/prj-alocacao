import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, TextInput } from 'react-native';
import VeiculosNaoAlugados from '../VeiculosNaoAlugadosAdmin/VeiculosNaoAlugados';
import VeiculosAlugados from '../VeiculosAlugadosAdmin/VeiculosAlugados';

const Tab = createMaterialTopTabNavigator();

export default function TelaHomeAdmin() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#2B3A67' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          swipeEnabled: false,
          lazy: true,
          tabBarScrollEnabled: false,
          tabBarStyle: { backgroundColor: '#2B3A67' },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'grey',
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: focused ? 'white' : 'gray',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
              {route.name}
            </Text>
          ),
          tabBarIndicatorStyle: {
            backgroundColor: '#1C1C1C',
            height: 4,
          },
        })}
      >
        <Tab.Screen name="Não Alugados">
          {() => <VeiculosNaoAlugados searchQuery={searchQuery} />}
        </Tab.Screen>
        <Tab.Screen name="Alugados">
          {() => <VeiculosAlugados searchQuery={searchQuery} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}
