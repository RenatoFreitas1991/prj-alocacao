import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
        color: 'black',
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

})

export default styles;