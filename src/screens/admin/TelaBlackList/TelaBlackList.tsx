import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Share, 
  Alert,
  ListRenderItem,
  Platform,
  FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { motivos } from '../TelaBlackList/motivosBlackList';
import styles from '../TelaBlackList/BlakListStyle';
import pickerSelectStyles from '../../styles/selectStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_URL } from '@env';
import { formatCPF, isValidCPF } from '../../../utils/cpfUtils';

// type BlacklistUser = {
//   id: number;
//   cpf: string;
//   reason: string;
//   nome: string;
// };

export default function TelaBlackList() {

  interface BlacklistUser {
    id: number;
    cpf: string;
    reason: string;
    nome: string;
  };

  const [cpf, setCpf] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [blacklist, setBlacklist] = useState<BlacklistUser[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<BlacklistUser[]>([]);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const fetchBlacklistUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/backend/user/blacklist`);
      if (!response.ok) {
        throw new Error(`Erro na resposta do servidor: ${response.status}`);
      }
      const data = await response.json();
      const formattedData = data.map((user: any) => ({
        id: user.id,
        cpf: user.cpf,
        reason: user.motivo_blacklist,
        nome: user.nome,
      }));
      console.log(formattedData)
      setBlacklist(formattedData);
    } catch (error) {
      console.error('Erro ao buscar usuários na blacklist ->', error);
      setErrorMessage("Erro ao carregar usuários na blacklist.");
    }
  };

  useEffect(() => {
    fetchBlacklistUsers();
  }, []);

  const handleAddToBlacklist = async () => {
    if (!cpf) {
      setErrorMessage("Por favor, digite o CPF do usuário.");
      return;
    }

    if (!isValidCPF(cpf)) {
      setErrorMessage("CPF inválido.");
      return;
    }

    if (!selectedReason) {
      setErrorMessage("Por favor, selecione um motivo.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/backend/user/blacklist`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: cpf.replace(/\D/g, ""), // Remove a pontuação antes de enviar
          motivo: selectedReason
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na resposta do servidor: ${response.status}`);
      }

      await fetchBlacklistUsers();
      
      setCpf('');
      setSelectedReason('');
      setErrorMessage('');
    } catch (error) {
      console.error('Erro ao adicionar usuário à blacklist ->', error);
      setErrorMessage("Erro ao adicionar usuário à blacklist ou erro de conexão com o servidor.");
    }
  };

  const handleRemoveUser = (cpf: string) => {
    Alert.alert(
      'Confirmação de Exclusão',
      'Você tem certeza que quer excluir?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão cancelada'),
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/api/backend/user/blacklist`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf })
              });
  
              if (!response.ok) {
                throw new Error(`Erro na resposta do servidor: ${response.status}`);
              }
  
              await fetchBlacklistUsers();
            } catch (error) {
              console.error('Erro ao remover usuário da blacklist ->', error);
              setErrorMessage("Erro ao remover usuário da blacklist ou erro de conexão com o servidor.");
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  
  const onShare = async (nome:string, cpf:String, reason:string) => {
    const result = await Share.share({
      message:
        `O usuário de nome ${nome} de portador do cpf: ${cpf}. Está na black list pelo devido motivo: ${reason}`,
    });
  };

  useEffect(() => {
    if (searchText) {
      const filtered = blacklist.filter(blacklist =>
        blacklist.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        blacklist.cpf.toLowerCase().includes(searchText.toLowerCase()) ||
        blacklist.reason.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles(blacklist);
    }
  }, [searchText, blacklist]);

  const renderBlackList: ListRenderItem<BlacklistUser> = ({ item }) => {
    return(
      <View key={item.id} style={styles.userCard}>
        <Text style={styles.userName}>
          Nome: {item.nome}
        </Text>
        <Text style={styles.userName}>
          CPF: {item.cpf}
        </Text>
        <View style={styles.userReasonContainer}>
          <Text style={styles.userReason}>
            Motivo: {item.reason}
          </Text>
          <TouchableOpacity onPress={() => onShare(item.nome, item.cpf, item.reason)} style={styles.shareButton}>
            <Icon name="share" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveUser(item.cpf)} style={styles.removeButton}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container1}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lista Negra</Text>
          <Icon name="block" size={50} color="red" />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>CPF do Usuário:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o CPF do usuário"
            placeholderTextColor="#AAA"
            keyboardType="numeric"
            value={cpf}
            onChangeText={(text) => setCpf(formatCPF(text))}
          />

          <Text style={styles.label}>Motivo:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedReason(value)}
            items={motivos.map(motivo => ({ label: motivo.label, value: motivo.value }))}
            style={pickerSelectStyles}
            placeholder={{ label: 'Selecione o motivo', value: '' }}
            value={selectedReason}
          />

          <Button
            title="Adicionar à Lista Negra"
            onPress={handleAddToBlacklist}
            color="red"
          />

          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
        </View>

        <Text style={styles.description}>
          Esta tela exibe todos os usuários que foram adicionados à blacklist.
        </Text>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar veículos..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

        <ScrollView style={styles.scrollContainer}>
          <FlatList 
            data={filteredVehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBlackList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum usuário está na blacklist.</Text>
              </View>
            }
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

//export default TelaBlackList;