import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

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

const HomeScreen = () => {
const navigation = useNavigation();
  const cards = [
    { title: "Veiculos", iconName: "directions-car", screen: "TelaHomeAdmin" },
    { title: "Black List", iconName: "list", screen: "TelaBlackList"},
    { title: "Histórico Veículos Aludados", iconName: "history", screen: "HistoricoAlugados" },
    { title: "Notificação", iconName: "message" },
    { title: "Calendário de Pagamentos", iconName: "calendar-today", screen:"TelaCalendario" },
    { title: "Avaliação", iconName: "star", screen: "TelaAvaliacaoCliente" },
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
            <Card key={cardIndex} 
             title={card.title} 
             iconName={card.iconName} 
             onPress={() => navigation.navigate(card.screen)}/>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
