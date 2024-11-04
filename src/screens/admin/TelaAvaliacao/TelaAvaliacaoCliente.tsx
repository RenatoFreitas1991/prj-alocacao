import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './TelaAvaliacaoStyle';

type AvaliacaoUser = {
  cpf: string;
  nome: string;
  estrelas: number;
  motivo: string;
};

// Teste e Verificando busca de CPF do usuário ( remover apos finalização )
const buscarNomePorCPF = (cpf) => {
  const usuariosSimulados = {
    "12345678900": "Joãozinho",
    "09876543210": "Joaquim",

  };
  return usuariosSimulados[cpf] || "Usuário não encontrado";
};


const TelaAvaliacaoCliente = () => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [motivo, setMotivo] = useState('');
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoUser[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleCpfChange = (inputCpf) => {
    const apenasNumeros = inputCpf.replace(/[^0-9]/g, '');
    setCpf(apenasNumeros);

    if (apenasNumeros.length === 11) {
      const nomeEncontrado = buscarNomePorCPF(apenasNumeros);
      setNome(nomeEncontrado);
    } else {
      setNome('');
    }
  };

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
    if (!cpf || !nome) {
      Alert.alert("Erro", "Por favor, insira um CPF válido e preencha todos os campos.");
      return;
    }

    const novaAvaliacao = { cpf, nome, estrelas: avaliacao, motivo };

    if (editingIndex !== null) {
      const atualizadas = [...avaliacoes];
      atualizadas[editingIndex] = novaAvaliacao;
      setAvaliacoes(atualizadas);
      setEditingIndex(null);
    } else {
      setAvaliacoes([...avaliacoes, novaAvaliacao]);
    }

    Alert.alert('Avaliação Salva', `CPF: ${cpf}\nNome: ${nome}\nEstrelas: ${avaliacao}\nMotivo: ${motivo}`);
    setCpf('');
    setNome('');
    setAvaliacao(0);
    setMotivo('');
  };

  const editarAvaliacao = (index: number) => {
    const avaliacao = avaliacoes[index];
    setCpf(avaliacao.cpf);
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
      <Text style={styles.boldText}>CPF: {item.cpf}</Text>
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.label, { fontWeight: 'bold' }]}>CPF do Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CPF do usuário"
          placeholderTextColor="#aaa"
          value={cpf}
          onChangeText={handleCpfChange}
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

        <TouchableOpacity style={styles.button} onPress={salvarAvaliacao}>
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
