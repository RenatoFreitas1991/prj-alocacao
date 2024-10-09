import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        width: '40%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 10,
    },
    viewImg: {

    },
    img: {
        display: 'flex',
        margin: 'auto',
        height: '55%',
        resizeMode: 'contain',
    },
    textContainer: {
        width: '75%',
        textAlign: 'left',
    },
    viewText: {
        width: '100%',
        marginTop: '2%',
        flexDirection: 'row',
    },
    label: {
        fontWeight: 'bold',
    },
    text: {
        marginLeft: '2%',
    },
});

export default styles;