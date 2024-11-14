import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Fundo principal branco
    },
    container2: {
        width: '85%',
        padding: 20,
        backgroundColor: '#f7f7f7', // Fundo do card branco suave
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    titulo: {
        fontSize: 30,
        color: '#2B3A67', // Azul escuro
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 16,
        color: '#4f4f4f', // Cinza suave para o subtítulo
        textAlign: 'center',
        marginBottom: 30,
    },
    viewInput: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#2B3A67", // Azul escuro para borda
        backgroundColor: "#f0f0f0", // Fundo cinza claro
        color: '#2B3A67', // Texto azul escuro
    },
    botoesContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#2B3A67', // Fundo azul escuro
        paddingVertical: 12,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonSecondary: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#2B3A67', // Azul escuro para borda
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff', // Texto branco para o botão principal
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        fontSize: 18,
        color: '#2B3A67', // Texto azul escuro para botão secundário
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default styles;
