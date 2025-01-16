import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A243E', // Fundo do app em tom mais escuro para contraste
    },
    container2: {
        width: '85%',
        padding: 20,
        backgroundColor: '#2B3A67', // Cor principal de fundo do card de login
        borderRadius: 15,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 32,
        color: '#F1F5FF', // Cor clara para contraste com o fundo escuro
        fontWeight: 'bold',
        marginBottom: 30,
    },
    viewInput: {
        width: '100%',
        marginBottom: 25,
    },
    input: {
        width: '100%',
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#4A587A",
        backgroundColor: "#F1F5FF",
        color: "#2B3A67", // Cor do texto de entrada
    },
    botoesContainer: {
        width: '100%',
    },
    button: {
        backgroundColor: '#1A76D2', // Azul mais vibrante para destacar o botão de ação
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        borderColor: '#F1F5FF',
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#F1F5FF', // Cor clara para o texto do botão principal
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: '#F1F5FF', // Mesma cor clara para o botão secundário para manter o tema
        fontSize: 18,
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default styles;
