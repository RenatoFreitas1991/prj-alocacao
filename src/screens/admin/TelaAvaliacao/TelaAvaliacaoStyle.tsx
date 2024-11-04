import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Fundo escuro
    padding: 20,
  },
  label: {
    color: '#FFF', // Texto claro
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#444',
    color: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  avaliacaoContainer: {
    backgroundColor: '#FFF', // Fundo branco para destacar cada avaliação
    padding: 16,
    borderRadius: 10, // Bordas arredondadas
    marginBottom: 16,
    shadowColor: '#000', // Sombra para destacar o bloco
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // Elevação para Android
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
});

export default styles;
