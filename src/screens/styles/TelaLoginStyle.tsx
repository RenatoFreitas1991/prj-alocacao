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
    container2: {
        width: '80%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%',
        backgroundColor: 'rgba(205, 165, 130, 0.711)',
        borderRadius: 13,
    },
    titulo: {
        fontSize: 32,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    viewInput:{
        width: '100%',
        marginTop: '20%',
    },
    input: {
        width: "80%",
        margin: 'auto',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ccc",
        backgroundColor: "white",
    },
    botoesContainer: {
        width: '80%',
        marginTop: '10%',
    },
    button: {
        backgroundColor: 'rgb(10, 106, 189)',
        marginTop: '5%',
        padding: '3%',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;