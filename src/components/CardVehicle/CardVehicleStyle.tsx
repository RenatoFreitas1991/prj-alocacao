import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        width: '90%',
        alignSelf: 'center',
    },
    img: {
        width: '100%',
        height: 150,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    infoText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '70%', // Tamanho menor
        alignItems: 'center',
    },
    modalButton: {
        width: '100%', // Ocupa toda a largura
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    modalButtonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
    },
});

export default styles;
