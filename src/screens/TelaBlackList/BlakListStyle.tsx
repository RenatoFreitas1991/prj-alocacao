import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#333', 
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    paddingRight: 10,
  },
  formContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#444',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    backgroundColor: '#444',
    color: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF',
    marginTop: 20,
  },
});

export default styles;
