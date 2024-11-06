import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./NotificacoesStyle";
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    clienteProp?: string;
    marcaProp?: string;
    modeloProp?: string;
    placaProp?: string;
};

export default function Notificacoes() {
    const route = useRoute();

    const manutencoes = [
        { data: '01/04/24', descricao: 'Rodrigo quer alugar veiculo', valor: '400', placa: 'PSX-0205'},
        { data: '17/04/24', descricao: 'Paulo quer alugar veiculo', valor: '145', placa: 'PSO-0305' },
        { data: '20/07/24', descricao: 'Neymar quer alugar veiculo', valor: '340', placa: 'BGF-6712' },
        { data: '20/07/24', descricao: 'Ronaldo quer alugar veiculo', valor: '50', placa: 'JHU-5463' }
      ];

    return(
        <ScrollView style={styles.container}>
        
            <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, styles.tableCellData]}>Data</Text>
                <Text style={[styles.tableHeader, styles.tableCellDescricao]}>Descrição</Text>
                <Text style={[styles.tableHeader, styles.tableCellValor]}>Valor (R$)</Text>
                <Text style={[styles.tableHeader, styles.tableCellPagamento]}>placa</Text>
            </View>
        
            {manutencoes.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                    <Text style={[styles.tableCell, styles.tableCellData]}>{item.data}</Text>
                    <Text style={[styles.tableCell, styles.tableCellDescricao]}>{item.descricao}</Text>
                    <Text style={[styles.tableCell, styles.tableCellValor]}>{item.valor}</Text>
                    <Text style={[styles.tableCell, styles.tableCellPagamento]}>{item.placa}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
