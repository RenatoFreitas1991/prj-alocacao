import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "rgb(30,30,30)",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color:"white"
  },

  viewInput: {
    width: "100%",
    marginTop: 10, // Ajusta o espaçamento entre os campos e os botões
  },

  textLabel: {
    textAlign: "left",
    fontWeight: "bold",
    color:"white"
  },
  
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "rgb(86,85,92)",
  },

  errorMessage: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    paddingLeft: 20,
  },

  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Certifica-se que os botões se posicionam corretamente
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
  },

  botao: {
    width: "45%", // Mantém os botões com a mesma largura
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },

  botaoCadastrar: {
    borderColor: "rgb(39,6,229)",
    backgroundColor: "rgb(39,6,229)",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    width: "48%",
  },
  
  botaoVoltar: {
    borderColor: "#d41717",
    backgroundColor: "#d41717",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    width: "48%",
  },

  botaoInvisivel: {
    opacity: 0, // Torna o botão invisível
  },
  
  textoBotaoCadastrar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  textoBotaoVoltar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  
  viewAnimated: {
    width: "100%", // Para assegurar que a animação ocupe a largura total da tela
    flex: 1, // Flexível para permitir que o conteúdo ocupe todo o espaço disponível
  },
});

export default styles;
