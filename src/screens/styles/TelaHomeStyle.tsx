import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(251,234,203)',
    },
    container2: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(251,234,203)',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    br: {
        height: '1%',
        marginTop:'5%',
    }
});

export default styles;