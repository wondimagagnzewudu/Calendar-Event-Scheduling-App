import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent } from '../redux/eventSlice';
import CalendarView from '../components/CalendarView';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { isSameDay } from 'date-fns';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const events = useSelector(state => state.events.events);
  const dispatch = useDispatch();

  console.log('events',events);
  const dayEvents = events.filter(event => 
    isSameDay(new Date(event.start), selectedDate)
  );

  const handleSave = (event) => {
    // Check for overlapping events
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
    <View>
      <CalendarView
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        events={events}
      />
      <Button
        title="Create New 1 Event"
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
      {/* {showForm && (
        <EventForm
          onSave={handleSave}
          initialEvent={editingEvent}
        />
      )} */}
    </View>
  );
};

export default HomeScreen;