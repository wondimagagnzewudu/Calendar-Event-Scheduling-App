

---

## Event Management App

This is a React Native app built with Expo that allows users to manage events using a calendar view. The app includes features for creating, updating, and deleting events, with Redux for state management.

### Features
- **Calendar View**: Displays a monthly calendar with events highlighted on their respective dates.
- **Event Creation**: Users can create new events with a name, start time, and repeat option.
- **Event Editing**: Existing events can be edited.
- **Event Deletion**: Events can be deleted.
- **Conflict Detection**: Prevents overlapping events on the same date and time.
- **Responsive Design**: Works on both small and large screens.

### Components
1. **HomeScreen**:
   - Main screen that displays the calendar, event list, and a button to create new events.
   - Handles date selection and event management logic.

2. **CalendarView**:
   - Displays a monthly calendar grid.
   - Highlights dates with events.
   - Allows users to select a date.

3. **EventForm**:
   - Form for creating or editing events.
   - Includes fields for event name, start time, and repeat option.
   - Uses `DateTimePicker` for selecting future dates and times.

4. **EventList**:
   - Displays a list of events for the selected date.
   - Allows users to edit or delete events.

### Redux State Management
- **Event Slice**:
  - Manages the state of events using Redux Toolkit.
  - Includes actions for adding, updating, and deleting events.

### Key Dependencies
- `react-native`: Core library for building the app.
- `react-redux` and `@reduxjs/toolkit`: For state management.
- `date-fns`: For date manipulation and comparison.
- `@react-native-community/datetimepicker`: For selecting event start times.

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   expo start
   ```

### Code Structure
- **`HomeScreen.js`**: Main screen with calendar, event list, and event creation button.
- **`CalendarView.js`**: Displays the calendar grid.
- **`EventForm.js`**: Form for creating/editing events.
- **`EventList.js`**: Displays events for the selected date.
- **`redux/eventSlice.js`**: Redux slice for managing events.
- **`redux/store.js`**: Redux store configuration.

### Example Usage
1. Open the app and select a date on the calendar.
2. Click "Create New Event" to add an event.
3. Fill in the event details and save.
4. Edit or delete events using the buttons in the event list.

### Notes
- The app ensures that events do not overlap on the same date and time.
- Events cannot be created for past dates/times.

---