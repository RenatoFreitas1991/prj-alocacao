import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#2B3A67',
    },
    container: {
        padding: 20,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    label: {
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    botao: {
        flex: 1,
        marginHorizontal: 5,
    },
    viewImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: 'white',
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
    },
    messageError: {
        color: 'red',
    },
});

export default styles;