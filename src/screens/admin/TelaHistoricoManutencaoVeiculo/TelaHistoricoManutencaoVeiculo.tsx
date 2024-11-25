import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { API_URL } from '@env';
import CarVehicleHistoric from '../../../components/CarVehicleHistoric/CarVehicleHistoric';
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
        imagePath?: string;
    }

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [vehicles, setVehicles] = useState<MinVeiculo[]>([]);
    const [searchText, setSearchText] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState<MinVeiculo[]>([]);
    const [idVeiculo, setIdVeiculo] = useState(id);

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
        setFilteredVehicles(vehiclesData);
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

    useEffect(() => {
        fetchData();
    }, [idVeiculo]);

    useEffect(() => {
      fetchVehicleData();
    }, [id]);

    useEffect(() => {
        const filtered = vehicles.filter(vehicle =>
            vehicle.data_manutencao.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredVehicles(filtered);
    }, [searchText, vehicles]);

    const renderInfoManutencao: ListRenderItem<MinVeiculo> = ({ item, index }) => (
      <View style={styles.tableRow} key={index}>
        <Text style={[styles.tableCell, styles.tableCellData]}>{item.data_manutencao}</Text>
        <Text style={[styles.tableCell, styles.tableCellDescricao]}>{item.descricao}</Text>
        <Text style={[styles.tableCell, styles.tableCellValor]}>0</Text>
        <Text style={[styles.tableCell, styles.tableCellPagamento]}>Pix</Text>
      </View>
    );

    return (
      <ScrollView style={styles.container}>
        {/* <Text style={styles.infoCliente}>Cliente: {clienteProp}</Text> */}
        <Text style={styles.infoCliente}>Marca do veículo: {marca || 'N/A'}</Text>
        <Text style={styles.infoCliente}>Modelo do veículo: {modelo || 'N/A'}</Text>
        <Text style={styles.infoCliente}>Placa do veículo: {placa || 'N/A'}</Text>
        <Text style={styles.title}>Histórico de Manutenções</Text>
    
        {/* Cabeçalho da tabela */}
        <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.tableCellData]}>Data</Text>
            <Text style={[styles.tableHeader, styles.tableCellDescricao]}>Descrição</Text>
            <Text style={[styles.tableHeader, styles.tableCellValor]}>Valor (R$)</Text>
            <Text style={[styles.tableHeader, styles.tableCellPagamento]}>Forma de Pagamento</Text>
        </View>
        <FlatList
            style={styles.listContainer}
            data={filteredVehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderInfoManutencao}
            numColumns={1}
            contentContainerStyle={{ paddingBottom: 80 }} // Adicionando espaço para o botão fixo
            ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Este veículo não possui manutenções.</Text>
            </View>
            }
        />
      </ScrollView>
    );
        // <View style={styles.container1}>
        // <FlatList
        //     style={styles.listContainer}
        //     data={filteredVehicles}
        //     keyExtractor={(item) => item.id.toString()}
        //     renderItem={renderCardVehicle}
        //     numColumns={1}
        //     contentContainerStyle={{ paddingBottom: 80 }} // Adicionando espaço para o botão fixo
        //     ListEmptyComponent={
        //     <View style={styles.emptyContainer}>
        //         <Text style={styles.emptyText}>Este veículo não possui manutenções.</Text>
        //     </View>
        //     }
        // />
        // </View>
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
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
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
  },
  tableHeader: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#353535',
  },
  tableCell: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  tableCellData: {
    flex: 1, // Ocupa 1 parte
  },
  tableCellDescricao: {
    flex: 3, // Ocupa 3 partes
  },
  tableCellValor: {
    flex: 1, // Ocupa 1 parte
  },
  tableCellPagamento: {
    flex: 3, // Ocupa 3 partes
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
});

// Estilo para o botão fixo
// const styles = StyleSheet.create({
//   container1: {
//     flex: 1,
//     justifyContent: "flex-start",
//     backgroundColor: "#fff",
//   },
//   listContainer: {
//     flex: 1,
//     marginHorizontal: 10,
//   },
//   fixedButtonContainer: {
//     position: 'absolute',
//     bottom: 20, // Ajuste conforme necessário
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//   },
// });
