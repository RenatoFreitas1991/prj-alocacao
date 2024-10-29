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
        width: '44%',
        padding: '2%',
    },
    img: {
        width: '100%',
        height: 100,
    },
    textContainer: {
        width: '75%',
        textAlign: 'left',
    },
    viewText: {
        width: '100%',
        marginTop: '2%',
        flexDirection: 'row',
        padding: '3%',
    },
    label: {
        fontWeight: 'bold',
    },
    text: {
        fontWeight: 'bold',
        color: 'red',
        marginLeft: '2%',
    },
    viewButton: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        padding: .5,
    },
    button: {
        borderColor: 'black',
        padding: '4%',
        borderRadius: 5,
        width: '90%',
    },
    buttonUpdate: {
        backgroundColor: 'rgb(49, 49, 203)',
    },
    
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    }
});

export default styles;