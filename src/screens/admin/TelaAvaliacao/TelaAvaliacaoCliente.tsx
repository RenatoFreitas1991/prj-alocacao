import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './TelaAvaliacaoStyle';

import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../../routes/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { API_URL } from '@env';
import axios from 'axios';

type AvaliacaoUser = {
  cpfUser: string;
  nome: string;
  estrelas: number;
  motivo: string;
};

type TelaAvaliacaoClienteRouteProp = RouteProp<StackParamList, 'TelaAvaliacaoCliente'>;
type NavigationProp = NativeStackNavigationProp<StackParamList, 'TelaAvaliacaoCliente'>;

const TelaAvaliacaoCliente = () => {

  const route = useRoute<TelaAvaliacaoClienteRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { cpf } = route.params;

  const [cpfUser, setCpf] = useState(cpf);
  const [nome, setNome] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [motivo, setMotivo] = useState('');
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoUser[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const salvarAvaliacao = () => {
    if (!cpfUser || !nome) {
      Alert.alert("Erro", "Por favor, insira um CPF válido e preencha todos os campos.");
      return;
    }

    const novaAvaliacao = { cpfUser, nome, estrelas: avaliacao, motivo };

    if (editingIndex !== null) {
      const atualizadas = [...avaliacoes];
      atualizadas[editingIndex] = novaAvaliacao;
      setAvaliacoes(atualizadas);
      setEditingIndex(null);
    } else {
      setAvaliacoes([...avaliacoes, novaAvaliacao]);
    }

    Alert.alert('Avaliação Salva', `CPF: ${cpfUser}\nNome: ${nome}\nEstrelas: ${avaliacao}\nMotivo: ${motivo}`);
    setCpf('');
    setNome('');
    setAvaliacao(0);
    setMotivo('');
  };

  const editarAvaliacao = (index: number) => {
    const avaliacao = avaliacoes[index];
    setCpf(avaliacao.cpfUser);
    setNome(avaliacao.nome);
    setAvaliacao(avaliacao.estrelas);
    setMotivo(avaliacao.motivo);
    setEditingIndex(index);
  };

  const removerAvaliacao = (index: number) => {
    const atualizadas = avaliacoes.filter((_, i) => i !== index);
    setAvaliacoes(atualizadas);
  };


  const renderItem = ({ item, index }: { item: AvaliacaoUser, index: number }) => (
    <View style={styles.avaliacaoContainer}>
      <Text style={styles.boldText}>CPF: {item.cpfUser}</Text>
      <Text style={styles.boldText}>Nome: {item.nome}</Text>
      <Text style={styles.boldText}>Estrelas: {item.estrelas}</Text>
      <Text style={styles.boldText}>Motivo: {item.motivo}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => editarAvaliacao(index)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => removerAvaliacao(index)}>
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    if(cpfUser.length == 14) {
      fetchLocacaoUserData();
    } else {
      setNome("");
    }
  }, [cpf]);

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

        <TouchableOpacity style={styles.button} onPress={cadastrarAvaliacao}>
          <Text style={styles.buttonText}>{editingIndex !== null ? 'Atualizar Avaliação' : 'Salvar Avaliação'}</Text>
        </TouchableOpacity>

        <FlatList
          data={avaliacoes}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default TelaAvaliacaoCliente;
