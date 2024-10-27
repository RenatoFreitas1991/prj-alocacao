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
  scrollContainer: {
    maxHeight: 200, 
    marginTop: 20,
    backgroundColor: '#444', 
    padding: 10,
    borderRadius: 5,
  },
  userCard: {
    backgroundColor: '#555',  
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',  
  },
  userReason: {
    fontSize: 14,
    color: '#CCC', 
  },
  userReasonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    padding: 5,
  },
  errorMessage: {
    fontSize: 14,
    color: 'red', 
    marginTop: 10,
    textAlign: 'center',  
  },
});

export default styles;
