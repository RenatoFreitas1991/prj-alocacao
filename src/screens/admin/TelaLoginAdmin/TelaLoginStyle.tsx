import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111', // Cor de fundo mais escura
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container2: {
        width: '90%',
        height: '80%',
        padding: '5%',
        backgroundColor: '#1e1e1e', // Fundo mais escuro
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 30, // Espaço abaixo do título
    },
    viewInput: {
        width: '100%',
        marginTop: 15,
    },
    input: {
        width: '100%',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        borderColor: "#ccc",
        borderWidth: 1,
        backgroundColor: "#33363b", // Cor do fundo dos inputs
        color: 'white',
        fontSize: 16,
    },
    botoesContainer: {
        width: '100%',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#2765E5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    buttonVoltar: {
        backgroundColor: '#1e1e1e',
        borderWidth: 2,
        borderColor: '#2765E5',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonTextVoltar: {
        fontSize: 18,
        textAlign: 'center',
        color: '#2765E5',
        fontWeight: 'bold',
    },
});

export default styles;
