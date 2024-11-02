import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    container2: {
        width: '85%',
        padding: 20,
        backgroundColor: '#1e1e1e',
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    titulo: {
        fontSize: 30,
        color: '#f0f0f0',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 16,
        color: '#a9a9a9',
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
        borderColor: "#333",
        backgroundColor: "#262626",
        color: '#f0f0f0',
    },
    botoesContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#2765E5',
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
        borderColor: '#2765E5',
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        fontSize: 18,
        color: '#2765E5',
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default styles;
