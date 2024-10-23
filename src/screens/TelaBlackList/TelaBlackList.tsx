import React, { useState } from 'react'; 
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { motivos } from '../TelaBlackList/motivosBlackList'; // Importando os motivos
import styles from '../TelaBlackList/BlakListStyle';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const TelaBlackList = () => {
  const [userName, setUserName] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const handleAddToBlacklist = () => {
    console.log(`Usuário: ${userName}, Motivo: ${selectedReason}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lista Negra</Text>
        <Icon name="block" size={50} color="red"  />
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
      </View>

      <Text style={styles.description}>
        Esta tela exibe todos os usuários que foram adicionados à blacklist.
      </Text>
    </View>
  );
};

export default TelaBlackList;
