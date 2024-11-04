import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#333',
    },
    container:{
        minHeight: '100%',
        width: '100%',
        display: 'flex',
    },
    viewTitulo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 20,
        color: 'white',
        textAlign: 'auto',
        fontWeight: 'bold',
        marginTop: 20,
    },
    img: {
        width: '100%',
        height: '20%',
        borderRadius: 5,
        padding: 5,
        marginTop: 20,
    },
    viewInput: {
        width: "100%",
        marginTop: 30,
    },
    textLabel: {
        color: 'white',
        marginLeft: '10%',
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 15,
    },
    input: {
        width: '80%',
        backgroundColor: 'white',
        margin: 'auto',
        padding: 5,
        borderRadius: 6,
        marginTop: 5,
    },
    button: {
        margin: 'auto',
        backgroundColor: 'rgb(39, 6, 229)',
        width: '80%',
        marginTop: '5%',
        padding: '3%',
        borderRadius: 20,
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
})

export default styles;