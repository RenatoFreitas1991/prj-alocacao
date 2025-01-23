import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from '../../../routes/types';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import BR from './../../../components/BR/BR';

import { API_URL } from '@env';


type NavigationProp = NativeStackNavigationProp<StackParamList, "Conta">;

type userTabNavigatorProp = RouteProp<StackParamList, 'Conta'>;

export default function Conta() {

  const navigation = useNavigation<NavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [profissao, setProfissao] = useState('');
  const [telefone, setTelefone] = useState('');


  const route = useRoute<userTabNavigatorProp>();
  const { cpf } = route.params;

  function sair() {
    navigation.navigate('LoginUser');
  }

  const fetchLUserData = async () => {
      try {
          const url = `${API_URL}/api/backend/user/info/${cpf}`;
          console.log(`Fetching: ${url}`);
          const response = await fetch(url);
          const result = await response.json();

          const userData = result.map((user: any) => {
              setNome(user.nome);
              setProfissao(user.profissao);
              setTelefone(user.telefone);
          })

      } catch(error) {
          console.error("Erro ao buscar dados da Locação:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados da Locação.");
      }
  }

  useEffect(() => {
    fetchLUserData();
  }, [cpf]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.titleTop}>Meu Perfil</Text>
        
      </Text>
      
      <View style={styles.header}>
        {/* <Image 
          source={{ uri: 'data:image/png;base64,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' }} // Substitua com a URL da foto de perfil
          style={styles.profileImage}
        /> */}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="sign-out-alt" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Notificação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.optionButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text><Text style={styles.label}>Nome:</Text> {nome}</Text>
        <BR />

        <Text><Text style={styles.label}>CPF:</Text> {cpf}</Text>
        <BR />

        <Text><Text style={styles.label}>Profissao:</Text> {profissao}</Text>
        <BR />

        <Text><Text style={styles.label}>Telefone:</Text> {telefone}</Text>
      </View>

      <Modal 
        transparent={true}
        animationType={"fade"}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setModalVisible(false)}
              activeOpacity={1}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalButton} >
                        <Text style={styles.modalButtonText} onPress={sair}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Cinza claro
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2B3A67', // Azul escuro
    textAlign: 'center',
    marginBottom: 40,
  },
  titleTop: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  titleBottom: {
    fontSize: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#2B3A67', // Azul escuro para a borda
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2B3A67', // Azul escuro
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    width: '100%',
    padding: 10,
  },
  optionButton: {
    backgroundColor: '#2B3A67', // Azul escuro
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#FFFFFF', // Branco para o texto do botão
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: 200,
  },
  modalButton: {
      padding: 10,
      backgroundColor: 'white',
      marginVertical: 5,
      borderRadius: 5,
  },
    modalButtonText: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
});
