// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../routes/types';
import styles from "./telaHomeDefinitivaStyle";

interface CardProps {
  title: string;
  iconName: string;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name={iconName} size={40} color="white" />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

interface CardData {
  title: string;
  iconName: string;
  screen: keyof StackParamList;
}

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const cards: CardData[] = [
    { title: "Veículos", iconName: "directions-car", screen: "TelaHomeAdmin" },
    { title: "Black List", iconName: "list", screen: "TelaBlackList" },
    { title: "Histórico Veículos Alugados", iconName: "history", screen: "HistoricoAlugados" },
    // { title: "Notificação", iconName: "message", screen: "Notificacoes" },
    // { title: "Pagamentos", iconName: "calendar-today", screen: "TelaCalendario" },
    { title: "Avaliação", iconName: "star", screen: "TelaAvaliacaoCliente" },
    { title: "Manutenção", iconName: "settings", screen: "TelaManutencaoVeiculo" },
    { title: "Locação", iconName: "motorcycle", screen: "TelaLocacaoVeiculo" },
  ];

  const cardRows = [];
  for (let i = 0; i < cards.length; i += 2) {
    cardRows.push(cards.slice(i, i + 2));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cardRows.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((card, cardIndex) => (
            <Card
              key={cardIndex}
              title={card.title}
              iconName={card.iconName}
              onPress={() => navigation.navigate(card.screen as any)}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
