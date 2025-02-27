import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format, isPast, isSameDay } from 'date-fns';

interface Event {
  id: string;
  name: string;
  start: string | Date;
  repeat: string;
}

interface EventState {
  events: Event[];
}

const initialState: EventState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state.events[index] = action.payload;
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;