import React from "react";
import { View, ScrollView } from "react-native";
import styles from '../../styles/TelaHomeStyle';
import CardHistorico from '../../../components/CardHistorico/CardHistorico';
import BR from '../../../components/BR/BR'

export default function HistoricoAlugados() {
    return(
        <View style={styles.container1}>
        <ScrollView style={styles.container2}>
        <View>

        </View>
        <View  style={styles.cardsContainer}>
          <CardHistorico
            nomeCliente="Jotaro Kujo"
            dataEntrega="20/03/2024"
            dataDevolucao="30/07/2024"
            modelo="Creta"
            marca="Hyundai"
            placa="HOX-0681"
            nameButton="Histórico de Manutenções"
          />

        <CardHistorico
            nomeCliente="Rohan Kishibe"
            dataEntrega="20/03/2024"
            dataDevolucao="30/07/2024"
            modelo="Mobi"
            marca="Fiat"
            placa="HOL-0986"
            nameButton="Histórico de Manutenções"
          />
          
          
        </View>
      </ScrollView>
      <BR/>
    </View>
    );
}