import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,  // Ajusta o padding vertical para dar mais equilíbrio ao card
    paddingHorizontal: 10,
    height: 120,  // Ajusta a altura para o card ficar mais compacto
    width: '90%',
  },
  img: {
    width: 120,  // Reduz o tamanho da imagem para ter mais espaço para o texto
    height: 98,
    borderRadius: 10,
    marginRight: -60,  // Diminui o espaço entre a imagem e o texto
  },
  textContainer: {
    flex: 1,  // Usa todo o espaço restante para o texto
    justifyContent: 'center',
    paddingVertical: 5,  // Ajusta o padding vertical para não deixar os textos tão distantes
  },
  modeloText: {
    color: '#2B3A67',  // Azul escuro
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,  // Diminui o espaço abaixo do modelo
  },
  marcaText: {
    color: '#6E6E6E',  // Cinza
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3,  // Mantém o espaço baixo consistente
  },
  placaText: {
    color: '#6E6E6E',  // Cinza
    fontWeight: 'bold',
    fontSize: 14,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFAFA",
  },
  listContainer: {
    width: '100%',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default styles;
