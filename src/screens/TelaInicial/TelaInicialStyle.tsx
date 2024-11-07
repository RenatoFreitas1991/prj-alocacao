import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',

        
    },
    viewText: {
        backgroundColor: 'black',
        padding: '7%',
        width: '100%',
    },
    titulo: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '30%',
    },

    bemVindo: {
        fontSize: 30,
        color: 'white',
    },
    botoesContainer: {
        width: '80%',
        position: 'absolute',
        bottom: 0,
        marginBottom: '15%',
    },
    img: {
        height: 160,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: 'rgb(39, 6, 229)',
        marginTop: '5%',
        padding: '3%',
        borderRadius: 8,
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
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'black',
        height: '5%',
        width: '100%',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Escurece as imagens para o texto aparecer melhor
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;