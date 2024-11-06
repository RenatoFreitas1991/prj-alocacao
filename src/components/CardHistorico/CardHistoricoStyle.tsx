import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        width: '75%',
        padding: '4%',
    },
    img: {
        width: '100%',
        height: 100,
    },
    textContainer: {
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: '2%',
    },
    viewText: {
        width: '100%',
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '2%',
        paddingHorizontal: '1%',
    },
    label: {
        fontWeight: 'bold',
    },
    text: {
        flex: 1,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: '2%',
        flexWrap: 'wrap',
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