import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    width: 150,  // Largura do card
    height: 220, // Aumentamos um pouco para dar mais espaço à imagem
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignSelf:"center",
    alignItems: 'center',
    justifyContent: 'flex-start', // Garante que a imagem fique na parte superior
  },
  img: {
    width: 150, // A imagem ocupa toda a largura do card
    height: 120,  // Damos um maior espaço para a imagem
    borderTopLeftRadius: 10,  // Arredondamento para a parte superior do card
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 5, // Diminuímos o espaço no texto
    width: '100%',
    alignItems: 'center',
    marginTop: 5, // Diminui a margem superior para aproximar do conteúdo
  },
  viewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 3, // Diminui o espaço entre as linhas
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 12, // Reduzimos o tamanho da fonte para economizar espaço
  },
  text: {
    color: '#555',
    fontSize: 12, // Reduzimos o tamanho da fonte para economizar espaço
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

  // Centraliza o contêiner de cards
  container: {
    flexDirection: 'row', // Cards lado a lado
    flexWrap: 'wrap', // Para quebrar para uma nova linha quando necessário
    justifyContent: 'center', // Centraliza os cards horizontalmente
    alignItems: 'center', // Centraliza verticalmente
    width: '100%', // Garante que ocupe toda a largura disponível
    padding: 10,
    alignSelf:'center'
  },
  TextRed: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 5,
  },
});
