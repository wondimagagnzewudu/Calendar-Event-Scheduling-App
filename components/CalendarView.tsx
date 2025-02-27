import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, getDay, isSameDay } from 'date-fns';

interface Props {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  events: { id: string; name: string; start: string | Date; repeat: string }[];
}

const CalendarView: React.FC<Props> = ({ selectedDate, onDateSelect, events }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <View style={styles.container}>
      <Text style={styles.month}>{format(selectedDate, 'MMMM yyyy')}</Text>
      <View style={styles.daysGrid}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Text key={day} style={styles.dayHeader}>{day}</Text>
        ))}
        {Array(getDay(monthStart)).fill(null).map((_, i) => (
          <View key={`empty-${i}`} style={styles.day} />
        ))}
        {days.map(day => {
          const hasEvent = events.some(event => 
            isSameDay(new Date(event.start), day)
          );
          return (
            <TouchableOpacity
              key={day.toString()}
              style={[styles.day, hasEvent && styles.eventDay]}
              onPress={() => onDateSelect(day)}
            >
              <Text>{format(day, 'd')}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  month: { fontSize: 20, textAlign: 'center', marginBottom: 10 },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayHeader: { width: '14.28%', textAlign: 'center' },
  day: { width: '14.28%', padding: 10, alignItems: 'center' },
  eventDay: { backgroundColor: '#e6f3ff' },
});

export default CalendarView;