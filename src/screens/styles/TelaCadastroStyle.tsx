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
    width: '48%', // Largura fixa para ambos os botões
    paddingVertical: 12, // Altura do botão padronizada
    alignItems: 'center',
    borderRadius: 8, // Deixando as bordas um pouco mais arredondadas
    backgroundColor: 'green',
    borderWidth: 2,
    marginTop: 25,   
  },
  botaoVoltar: {
    borderColor: '#d41717',
    backgroundColor: '#d41717',
    width: '48%', // Largura fixa para ambos os botões
    paddingVertical: 12, // Altura do botão padronizada
    alignItems: 'center',
    borderRadius: 8, // Deixando as bordas um pouco mais arredondadas
    borderWidth: 2,
    marginTop: 25,
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
  viewAnimated: {
    width: '100%',  // Para assegurar que a animação ocupe a largura total da tela
    flex: 1,        // Flexível para permitir que o conteúdo ocupe todo o espaço disponível
}
});

export default styles;
