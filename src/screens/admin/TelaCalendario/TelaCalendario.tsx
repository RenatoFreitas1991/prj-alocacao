import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { DayState } from 'react-native-calendars/src/types';
import { styles } from './TelaCalendarioStyle';
import { ptBR } from './localeCalendarConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function TelaCalendario() {
  const [day, setDay] = useState<DateData>();
  
  const formatDate = (dateString:any) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Calendar
        renderArrow={(direction:any) => (
          <Feather size={24} color="#E8E8E8" name={`chevron-${direction}`} />
        )}
        headerStyle={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#E8E8E8',
          paddingBottom: 10,
          marginBottom: 10,
        }}
        theme={{
          textMonthSize: 18,
          monthTextColor: '#E8E8E8',
          todayTextColor: '#f06543',
          selectedDayBackgroundColor: '#F06543',
          selectedDayTextColor: '#E8E8E8',
          arrowColor: '#E8E8E8',
          calendarBackground: 'transparent',
          textDayStyle: { color: '#E8E8E8' },
          textDisableColor: '#717171',
          arrowStyle: {
            margin: 0,
            padding: 0,
          },
        }}
        minDate={today}
        hideExtraDays={true}
        onDayPress={setDay}
        markedDates={
          day ? { [day.dateString]: { selected: true } } : {}
        }
        dayComponent={({ date, state }: { date: DateData, state: DayState }) => {
          const isToday = today === date.dateString;
          const isSelected = day?.dateString === date.dateString;
          const isPast = date.dateString < today; 
          return (
            <TouchableOpacity
    style={[
        styles.day,
        isSelected && styles.selectedDay, // Aplica o estilo do dia selecionado
          ]}
                    onPress={() => {
                if (!isPast) { 
            setDay(date);
                   }
                }}
                disabled={isPast}
              >
              <Text
                style={[
                  styles.dayText,
                  (state === "inactive" || state === "disabled") && styles.disabled,
                  isToday ? { color: "#F06543" } : isPast ? { color: "#717171" } : { color: "#E8E8E8" },
                  isSelected && { color: "#E8E8E8" }, 
                ]}
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text style={styles.selected}>
        Data Selecionada: {day ? formatDate(day.dateString) : ''}
      </Text>
    </View>
  );
}
