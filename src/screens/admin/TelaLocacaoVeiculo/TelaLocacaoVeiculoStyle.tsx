import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'black',
    },
    scrollViewContent: {
        flexGrow: 1, // Permite que o ScrollView expanda verticalmente
        justifyContent: 'center', // Alinha o conteúdo verticalmente
        alignItems: 'center', // Alinha o conteúdo horizontalmente
        
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    viewImg: {
        // width: '90%',
        // height: '20%',
        // padding: 20,
        // borderWidth: 2,
        // borderColor: 'black',
        // borderRadius: 10,
    },
    viewInput: {
        margin: 'auto',
        width: '90%',
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    textLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#2B3A67',
        paddingVertical: 15,
        borderRadius: 8,
        marginVertical: 20,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;