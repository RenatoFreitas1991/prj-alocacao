import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { styles } from './CalendarioStyle'

export function Calendario(){
    
    return (
        
        <View style={styles.container}>
        
        <Calendar style={styles.calendar}/>
        
        </View>
    
    )
}