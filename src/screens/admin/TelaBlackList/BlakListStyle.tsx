import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1C1C1E',
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
    color: '#EAEAEA',
    paddingRight: 10,
  },
  formContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#2C2C2E', 
    borderRadius: 10,
    paddingVertical: 20,
  },
  label: {
    fontSize: 18,
    color: '#A6A6A6',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#3A3A3C',
    color: '#EAEAEA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#3A3A3C',
    color: '#EAEAEA',
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#EAEAEA',
    marginTop: 20,
  },
  scrollContainer: {
    maxHeight: 250,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#2C2C2E',
  },
  userCard: {
    backgroundColor: '#3A3A3C',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EAEAEA',
    marginBottom: 5,
  },
  userReason: {
    fontSize: 15,
    color: '#D1D1D6',
  },
  userReasonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',       
    justifyContent: 'center',    
  },
  errorMessage: {
    fontSize: 14,
    color: '#FF453A',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default styles;
