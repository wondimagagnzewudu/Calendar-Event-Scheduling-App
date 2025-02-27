import eventReducer, { addEvent } from '../redux/eventSlice';

describe('eventSlice', () => {
  it('should add an event', () => {
    const initialState = { events: [] };
    const event = { id: '1', name: 'Test', start: new Date(), repeat: 'Weekly' };
    const newState = eventReducer(initialState, addEvent(event));
    expect(newState.events).toHaveLength(1);
    expect(newState.events[0]).toEqual(event);
  });
});