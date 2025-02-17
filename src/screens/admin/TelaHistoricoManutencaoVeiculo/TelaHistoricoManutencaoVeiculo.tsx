import React, { useState, useEffect } from "react";
import { 
  View, 
  FlatList, 
  ListRenderItem, 
  StyleSheet, 
  Text, 
  ScrollView, 
  Alert, 
  Modal, 
  TouchableOpacity,
  Image } from "react-native";
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_URL } from '@env';
import { StackParamList } from '../../../routes/types';

type RouteParams = {
    id: number;
};

type TelaHistoricoManutencaoVeiculo = RouteProp<StackParamList, 'TelaHistoricoManutencaoVeiculo'>;

export default function TelaHistoricoManutencaoVeiculo() {

    const route = useRoute<TelaHistoricoManutencaoVeiculo>();
    const navigation = useNavigation<NavigationProp<StackParamList>>();
    const { id } = route.params;

    interface MinVeiculo {
        id: number;
        data_manutencao: string;
        descricao:string;
        valor?:string;
        imagePath?: string;
    }

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
    const [searchText, setSearchText] = useState('');
    //const [filteredVehicles, setFilteredVehicles] = useState<MinVeiculo[]>([]);
    const [idVeiculo, setIdVeiculo] = useState(id);
    const [modalVisible, setModalVisible] = useState(false);
    const [valorManutencao, setValorManutencao] = useState('');
    const [imgPath, setImgPath] = useState('');

    const fetchData = async () => {
        try {
        const url = `${API_URL}/api/backend/manutencao/vehicle/${idVeiculo}`;
        const response = await fetch(url);
        const result = await response.json();

        const vehiclesData = result.map((vehicle: any) => {
            let imagePath = null;

            if (vehicle.imagePath) {
                try {
                    const imagePathArray = JSON.parse(vehicle.imagePath);
                    if (Array.isArray(imagePathArray) && imagePathArray.length > 0) {
                    imagePath = `${API_URL}${imagePathArray[0]}`;
                    }
                } catch (parseError) {
                    console.error('Erro ao parsear imagePath:', parseError);
                }
            }

            return {
            ...vehicle,
            imagePath,
            };
        });

        setVehicles(vehiclesData);
        //setFilteredVehicles(vehiclesData);
        } catch (error) {
            console.error('Erro ao buscar os dados dos veículos ->', error);
        }
    };

    const fetchVehicleData = async () => {
      try {
          const url = `${API_URL}/api/backend/vehicle/info/${id}`;
          const response = await fetch(url);
          const result = await response.json();

          result.map((vehicle: any) => {
            setModelo(vehicle.modelo);
            setMarca(vehicle.marca);
            setPlaca(vehicle.placa);
          });
      } catch (error) {
          Alert.alert("Erro", "Não foi possível carregar os dados do veículo.");
      }
    };

    const viewIamge = (imgPath:string) => {
      setImgPath(imgPath);
      setModalVisible(true);
    }

    useEffect(() => {
        fetchData();
    }, [idVeiculo]);

    useEffect(() => {
      fetchVehicleData();
    }, [id]);

    // useEffect(() => {
    //     const filtered = vehicles.filter(vehicle =>
    //         vehicle.data_manutencao.toLowerCase().includes(searchText.toLowerCase())
    //     );
    //     //setFilteredVehicles(filtered);
    // }, [searchText, vehicles]);

    const renderInfoManutencao: ListRenderItem<MinVeiculo> = ({ item, index }) => (
      <View style={styles.tableRow} key={index}>
        <Text style={styles.cell}>{item.data_manutencao}</Text>
        <Text style={styles.cell}>{item.descricao}</Text>
        <Text style={styles.cell}>{item.valor}</Text>
        <Text style={styles.cell} onPress={() => viewIamge(item.imagePath || "")}>
          <Icon name="image" size={18} color="blue" />
        </Text>
      </View>
    );

    return (
      <View style={styles.scrollViewContent}>
        <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
            activeOpacity={1}
            >
              <View style={styles.modalContainer}>
                {imgPath != '' ? (
                  //<Image source={{ uri: imgPath }} style={styles.img} resizeMode="contain" />
                  <Text>{imgPath}</Text>
                ) : (
                  <Text>Nenhuma imagem foi regustrada</Text>
                )}
              </View>
          </TouchableOpacity>
        </Modal>
        {/* <Text style={styles.infoCliente}>Cliente: {clienteProp}</Text> */}
        <Text style={styles.infoCliente}>Marca do veículo: {marca || 'N/A'}</Text>
        <Text style={styles.infoCliente}>Modelo do veículo: {modelo || 'N/A'}</Text>
        <Text style={styles.infoCliente}>Placa do veículo: {placa || 'N/A'}</Text>
        <Text style={styles.title}>Histórico de Manutenções</Text>
    
        {/* Cabeçalho da tabela */}
        <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.tableCellData]}>Data</Text>
            <Text style={[styles.tableHeader, styles.tableCellDescricao]}>Descrição</Text>
            <Text style={[styles.tableHeader, styles.tableCellValor]}>R$</Text>
            <Text style={[styles.tableHeader, styles.tableCellValor]}><Icon name="image" size={20} color="white" /></Text>
        </View>
        <FlatList
            style={styles.listContainer}
            data={vehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderInfoManutencao}
            numColumns={1}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Este veículo não possui manutenções.</Text>
              </View>
            }
        />
      </View>
    );
}

const searchStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 50,
    color: "#333",
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  modalContainer2: {
    width: '100%',  // Largura do card
    height: '100%', // Aumentamos um pouco para dar mais espaço à imagem
    margin: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignSelf:"center",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cell: {
    color: "white",
    marginLeft: '7%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  infoCliente: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 15,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#fafafa',
    width: '90%',
  },
  tableRender: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#fafafa',
    width: '90%',
  },
  tableHeader: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#353535',
  },
  tableCell: {
    width: '90%',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  tableCellData: {
    flex: 1, // Ocupa 1 parte
    color: 'white',
  },
  tableCellDescricao: {
    flex: 3, // Ocupa 3 partes
  },
  tableCellValor: {
    flex: 1, // Ocupa 1 parte
  },
  tableViewImage: {
    flex: 3, // Ocupa 3 partes
    color: 'blue',
    textDecorationLine: 'underline',
  },
  container1: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
    emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  img: {
    width: 150,
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});