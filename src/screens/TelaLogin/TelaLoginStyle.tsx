import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(201,201,204)',
    },
    container2: {
        width: '80%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%',
        backgroundColor: 'rgb(30,30,30)',
        borderRadius: 13,
        
    },
    titulo: {
        fontSize: 32,
        color: 'white',
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
        backgroundColor: "rgb(45,45,47)",
    },
    botoesContainer: {
        width: '80%',
        marginTop: '10%',
    },
    button: {
        backgroundColor: 'rgb(39, 6, 229)',
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
});

export default styles;