import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { motivos } from '../TelaBlackList/motivosBlackList'; // Importando os motivos
import styles from '../TelaBlackList/BlakListStyle';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const TelaBlackList = () => {
  const [userName, setUserName] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [blacklist, setBlacklist] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro

  const handleAddToBlacklist = () => {
    if (!userName) {
      setErrorMessage("Por favor, digite o nome do usuário.");
      return;
    }
    if (!selectedReason) {
      setErrorMessage("Por favor, selecione um motivo.");
      return;
    }

    const newUser = { name: userName, reason: selectedReason };
    setBlacklist([...blacklist, newUser]);
    setUserName('');
    setSelectedReason('');
    setErrorMessage(''); // Limpa a mensagem de erro ao adicionar com sucesso
  };

  const handleRemoveUser = (index: number) => {
    const updatedBlacklist = blacklist.filter((_, i) => i !== index);
    setBlacklist(updatedBlacklist);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lista Negra</Text>
        <Icon name="block" size={50} color="red" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome do Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do usuário"
          placeholderTextColor="#AAA"
          value={userName}
          onChangeText={setUserName}
        />

        <Text style={styles.label}>Motivo:</Text>
        <Picker
          selectedValue={selectedReason}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedReason(itemValue)}
        >
          <Picker.Item label="Selecione o motivo" value="" />
          {motivos.map((motivo) => (
            <Picker.Item key={motivo.value} label={motivo.label} value={motivo.value} />
          ))}
        </Picker>

        <Button
          title="Adicionar à Lista Negra"
          onPress={handleAddToBlacklist}
          color="red"
        />

        {errorMessage ? ( // Exibe a mensagem de erro se existir
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>

      <Text style={styles.description}>
        Esta tela exibe todos os usuários que foram adicionados à blacklist.
      </Text>

      <ScrollView style={styles.scrollContainer}>
        {blacklist.map((user, index) => (
          <View key={index} style={styles.userCard}>
            <Text style={styles.userName}>
              Nome: {user.name}
            </Text>
            <View style={styles.userReasonContainer}>
              <Text style={styles.userReason}>
                Motivo: {user.reason}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveUser(index)} style={styles.removeButton}>
                <Icon name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TelaBlackList;
