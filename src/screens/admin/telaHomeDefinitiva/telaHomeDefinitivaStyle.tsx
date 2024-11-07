// telaHomeDefinitivaStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B3A67', // Fundo em azul escuro
        paddingVertical: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 10,
    },
    card: {
        width: '45%',
        aspectRatio: 1.2,
        backgroundColor: '#354A84', // Azul escuro sólido para destacar
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 12,
        borderWidth: 1,
        borderColor: '#1A294E', // Contorno sutil
    },
    cardText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default styles;
