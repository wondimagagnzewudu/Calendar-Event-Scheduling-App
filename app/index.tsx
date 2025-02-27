import React, { useState } from 'react';
import { View, Button,ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent } from '../redux/eventSlice';
import CalendarView from '../components/CalendarView';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { isSameDay, isPast } from 'date-fns';
import { RootState, AppDispatch } from '../redux/store';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch<AppDispatch>();

  const dayEvents = events.filter(event => 
    isSameDay(new Date(event.start), selectedDate)
  );

  const handleSave = (event: any) => {
    console.log('hi');
    console.log(event);
    const hasOverlap = dayEvents.some(e => 
      e.id !== event.id && 
      new Date(e.start).getTime() === new Date(event.start).getTime()
    );
    if (hasOverlap) {
      alert('Event conflicts with existing event');
      return;
    }

    if (editingEvent) {
      dispatch(updateEvent(event));
    } else {
      dispatch(addEvent(event));
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <ScrollView style={{ flex: 1,overflow: 'scroll' }}>
      <CalendarView
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        events={events}
      />
      <Button
        title="Create New  Event"
        onPress={() => setShowForm(true)}
        disabled={isPast(selectedDate)}
      />
      <EventList
        events={dayEvents}
        onEdit={event => {
          setEditingEvent(event);
          setShowForm(true);
        }}
        onDelete={id => dispatch(deleteEvent(id))}
      />
      {showForm && (
        <EventForm
          onSave={handleSave}
          initialEvent={editingEvent}
        />
      )}
    </ScrollView>
  );
};

export default HomeScreen;