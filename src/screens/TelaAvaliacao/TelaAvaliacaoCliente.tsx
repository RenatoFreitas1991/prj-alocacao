import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './TelaAvaliacaoStyle';

const TelaAvaliacaocliente = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [motivo, setMotivo] = useState('');
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

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
    const novaAvaliacao = { nome: nomeUsuario, estrelas: avaliacao, motivo };
    
    if (editingIndex !== null) {
      const atualizadas = [...avaliacoes];
      atualizadas[editingIndex] = novaAvaliacao;
      setAvaliacoes(atualizadas);
      setEditingIndex(null);
    } else {
      setAvaliacoes([...avaliacoes, novaAvaliacao]);
    }

    Alert.alert('Avaliação Salva', `Nome: ${nomeUsuario}\nEstrelas: ${avaliacao}\nMotivo: ${motivo}`);
    setNomeUsuario('');
    setAvaliacao(0);
    setMotivo('');
  };

  const editarAvaliacao = (index) => {
    const avaliacao = avaliacoes[index];
    setNomeUsuario(avaliacao.nome);
    setAvaliacao(avaliacao.estrelas);
    setMotivo(avaliacao.motivo);
    setEditingIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.avaliacaoContainer}>
      <Text style={styles.boldText}>Nome: {item.nome}</Text>
      <Text style={styles.boldText}>Estrelas: {item.estrelas}</Text>
      <Text style={styles.boldText}>Motivo: {item.motivo}</Text>
      <TouchableOpacity style={styles.button} onPress={() => editarAvaliacao(index)}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.label, { fontWeight: 'bold' }]}>Nome do Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do usuário"
          placeholderTextColor="#aaa"
          value={nomeUsuario}
          onChangeText={setNomeUsuario}
          editable={editingIndex === null}
        />

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

export default TelaAvaliacaocliente;
