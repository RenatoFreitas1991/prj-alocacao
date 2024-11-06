import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', 
    padding: 20,
  },
  label: {
    color: '#FFF',
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
  nomeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#FFF', 
    padding: 16,
    borderRadius: 10, 
    marginBottom: 16,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, 
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#cc0000', 
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default styles;
