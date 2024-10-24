import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#333',
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
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
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
});

export default styles;