import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Estilos do card
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        width: '90%',
    },
    img: {
        width: '100%',
        height: 150, // Aumenta para ocupar mais espaço
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer: {
        padding: 10,
    },
    viewText: {
        flexDirection: 'row',
        marginVertical: 2,
    },
    label: {
        fontWeight: 'bold',
    },
    text: {
        marginLeft: 5,
        color: 'blue',
    },

    // Estilos do modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalButton: {
        width: '100%',
        padding: 15,
        backgroundColor: 'rgb(49, 49, 203)',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
