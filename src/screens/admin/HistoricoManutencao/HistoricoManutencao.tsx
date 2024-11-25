import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./HistoricoManutencaoStyle";
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    clienteProp:string;
    marcaProp:string;
    modeloProp:string;
    placaProp:string;
};

export default function HistoricoManutencao() {
    const route = useRoute();
    const { clienteProp, marcaProp, modeloProp, placaProp } = route.params as RouteParams;


    const manutencoes = [
        { data: '01/04/24', descricao: 'Lona e pastilha', valor: '80', pagamento: 'Cartão de Crédito' },
        { data: '17/04/24', descricao: 'Amortecedor', valor: '145', pagamento: 'Pix' },
        { data: '20/07/24', descricao: 'Pastilha dianteira', valor: '25', pagamento: 'Pix' },
        { data: '20/07/24', descricao: 'Lona traseira', valor: '25', pagamento: 'Pix' },
        { data: '20/07/24', descricao: 'Lâmpada de freio', valor: '8', pagamento: 'Pix' },
        { data: '20/07/24', descricao: 'Filtro de ar', valor: '25', pagamento: 'Pix' },
        { data: '20/07/24', descricao: 'Carga da bateria', valor: '20', pagamento: 'Pix' },
        { data: '20/07/24', descricao: 'Óleo de freio', valor: '10', pagamento: 'Pix' },
      ];

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.infoCliente}>Cliente: {clienteProp}</Text>
            <Text style={styles.infoCliente}>Marca do veículo: {marcaProp}</Text>
            <Text style={styles.infoCliente}>Modelo do veículo: {modeloProp}</Text>
            <Text style={styles.infoCliente}>Placa do veículo: {placaProp}</Text>
            <Text style={styles.title}>Histórico de Manutenções</Text>
        
            {/* Cabeçalho da tabela */}
            <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, styles.tableCellData]}>Data</Text>
                <Text style={[styles.tableHeader, styles.tableCellDescricao]}>Descrição</Text>
                <Text style={[styles.tableHeader, styles.tableCellValor]}>Valor (R$)</Text>
                <Text style={[styles.tableHeader, styles.tableCellPagamento]}>Forma de Pagamento</Text>
            </View>
        
            {/* Linhas de dados */}
            {manutencoes.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                    <Text style={[styles.tableCell, styles.tableCellData]}>{item.data}</Text>
                    <Text style={[styles.tableCell, styles.tableCellDescricao]}>{item.descricao}</Text>
                    <Text style={[styles.tableCell, styles.tableCellValor]}>{item.valor}</Text>
                    <Text style={[styles.tableCell, styles.tableCellPagamento]}>{item.pagamento}</Text>
                </View>
            ))}
        </ScrollView>
    )
}