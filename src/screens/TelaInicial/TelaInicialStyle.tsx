import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(251,234,203)',
    },
    viewText: {
        position: 'absolute',
        backgroundColor: 'rgb(205,165,130)',
        padding: '7%',
        top: 0,
        width: '100%',
    },
    titulo: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    bemVindo: {
        fontSize: 30,
        color: 'rgb(99, 49, 15)',
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
        backgroundColor: 'rgb(10, 106, 189)',
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
    }
});

export default styles;