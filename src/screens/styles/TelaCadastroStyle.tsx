import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 150,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    marginTop: 1,
    paddingBottom: 150,  // Adicionando o espaço na parte inferior
    backgroundColor: 'rgb(254, 254, 254)'
  },

  borda: {
    width: '100%',
    height: '2%',
    backgroundColor: '#3B3C36'
  },

  titulo: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  viewInput: {
    width: '100%',
    marginTop: 18,
  },

  textLabel: {
    textAlign: 'left',
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },

  errorMessage: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    paddingLeft: 20,
  },

  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribui os botões com mais espaço
    marginTop: 20,
    width: '100%',
  },

  botao: {
    width: '45%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },

  botaoCadastrar: {
        borderColor: 'green',
        backgroundColor: 'green',
        borderWidth: 2,
    },
    botaoVoltar: {
        borderColor: '#d41717',
        backgroundColor: '#d41717',
        borderWidth: 2,
    },
    textoBotaoCadastrar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textoBotaoVoltar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default styles;
