import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { format } from 'date-fns';

interface Event {
  id: string;
  name: string;
  start: string | Date;
  repeat: string;
}

interface Props {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<Props> = ({ events, onEdit, onDelete }) => (
  <View style={styles.container}>
    {events.map(event => (
      <View key={event.id} style={styles.event}>
        <Text>{event.name} - {format(new Date(event.start), 'PPpp')}</Text>
        <Text>Repeat: {event.repeat}</Text>
        <Button title="Edit" onPress={() => onEdit(event)} />
        <Button title="Delete" onPress={() => onDelete(event.id)} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 10 },
  event: { marginBottom: 10, padding: 10, borderWidth: 1 },
});

export default EventList;