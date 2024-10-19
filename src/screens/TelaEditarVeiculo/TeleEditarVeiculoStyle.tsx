import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    titulo: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        marginTop: 5,
    },
    viewInput: {
        width: "100%",
        height: '9%',
        marginTop: 17,
    },
    textLabel: {
        marginLeft: '10%',
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 15,
    },
    label: {
        textAlign: "left",
        fontWeight: "bold",
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