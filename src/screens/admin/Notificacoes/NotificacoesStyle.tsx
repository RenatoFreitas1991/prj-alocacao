import { StyleSheet } from "react-native";

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
    flex: 2, // Ocupa 1 parte
  },
  tableCellDescricao: {
    flex: 3, // Ocupa 3 partes
  },
  tableCellValor: {
    flex: 1, // Ocupa 1 parte
  },
  tableCellPagamento: {
    flex: 2, // Ocupa 3 partes
    textAlign: 'center'
  },
});

export default styles;