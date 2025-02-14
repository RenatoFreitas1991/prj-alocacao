import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, FlatList, ListRenderItem } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './TelaAvaliacaoStyle';

import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { API_URL } from '@env';
import axios from 'axios';


type NavigationProp = NativeStackNavigationProp<StackParamList, 'TelaAvaliacaoHome'>;

const TelaAvaliacaoHome = () => {

  interface Avaliaties {
    id: number;
    cpf: string;
    nome: string;
    avaliacao: number;
    motivo: string;
  }

  const navigation = useNavigation<NavigationProp>();

  const [cpfUser, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [motivo, setMotivo] = useState('');
  const [avaliaties, setAvaliaties] = useState<Avaliaties[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if(cpfUser == '' || motivo == '') {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  })

  function formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  const fetchLocacaoUserData = async () => {
      try {
          const url = `${API_URL}/api/backend/user/info/${cpfUser}`;
          const response = await fetch(url);
          const result = await response.json();

          const userData = result.map((data: any) => {
            setNome(data.nome);
          })

      } catch(error) {
          console.error("Erro ao buscar dados da Locação:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados da Locação.");
      }
  }

  const cadastrarAvaliacao = async () => {

    const locacaoData = {
      cpfUser,
      avaliacao,
      motivo,
    }

    try {
        const response = await axios.post(`${API_URL}/api/backend/avaliacao/`, locacaoData);
        Alert.alert('Sucesso', 'Avaliação realizada com sucesso!');
        navigation.navigate('telaHomeDefinitiva');
    } catch (error) {
        console.error('Erro ao registrar avaliação:', error);
        Alert.alert('Erro', 'Não foi possível registrar a avaliação.');
    }
  }

  
  const fetchData = async () => {
    try {
        const url = `${API_URL}/api/backend/avaliacao/avaliaties`;
        console.log(`Fetching: ${url}`);
        const response = await fetch(url);
        const result = await response.json();
    
        const avaliaties = result.map((assessment : any) => {

            return {
                ...assessment,
            };
        });

        setAvaliaties(avaliaties);
    } catch (error) {
        console.error('Erro ao buscar os dados dos veículos ->', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderEstrelas = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity key={index} onPress={() => setAvaliacao(index + 1)}>
        <FontAwesome
          name={index < avaliacao ? 'star' : 'star-o'}
          size={24}
          color="#FFD700"
        />
      </TouchableOpacity>
    ));
  };

  const renderItem: ListRenderItem<Avaliaties> = ({ item }) => (
    <View style={styles.avaliacaoContainer}>
      <Text style={styles.boldText}>CPF: {item.cpf}</Text>
      <Text style={styles.boldText}>Nome: {item.nome}</Text>
      <Text style={styles.boldText}>Estrelas: {item.avaliacao}</Text>
      <Text style={styles.boldText}>Motivo: {item.motivo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.label, { fontWeight: 'bold' }]}>CPF do Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CPF do usuário"
          placeholderTextColor="#aaa"
          value={cpfUser}
          onChangeText={(text: string) => setCpf(formatCPF(text))} 
          keyboardType="numeric"
          editable={editingIndex === null}
          maxLength={12}
        />

        {nome ? <Text style={styles.nomeText}>Nome: {nome}</Text> : null}

        <Text style={[styles.label, { fontWeight: 'bold' }]}>Avaliação:</Text>
        <View style={styles.starsContainer}>{renderEstrelas()}</View>

        <Text style={[styles.label, { fontWeight: 'bold' }]}>Motivo da Avaliação:</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Digite o motivo da avaliação"
          placeholderTextColor="#aaa"
          multiline
          value={motivo}
          onChangeText={setMotivo}
        />

        {/* <TouchableOpacity style={styles.button} onPress={cadastrarAvaliacao}>
          <Text style={styles.buttonText}>{editingIndex !== null ? 'Atualizar Avaliação' : 'Salvar Avaliação'}</Text>
        </TouchableOpacity> */}

        {btnDisabled != true ? (
            <TouchableOpacity style={styles.button} onPress={cadastrarAvaliacao}>
                <Text style={styles.buttonText}>{editingIndex !== null ? 'Atualizar Avaliação' : 'Salvar Avaliação'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.deactivatedButton} disabled={true}>
              <Text style={styles.buttonText}>{editingIndex !== null ? 'Atualizar Avaliação' : 'Salvar Avaliação'}</Text>
            </TouchableOpacity>
          )}

      <FlatList
        style={styles.listContainer}
        data={avaliaties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 100 }} // Adicionando espaço para o botão fixo
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum avaliação foi cadastrada.</Text>
          </View>
        }
      />
      </ScrollView>
    </View>
  );
};

export default TelaAvaliacaoHome;
