import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { REPEAT_OPTIONS, RepeatOption } from "../constants";
import { isPast } from "date-fns";

interface Event {
  id?: string;
  name: string;
  start: string | Date;
  repeat: RepeatOption;
}

interface Props {
  onSave: (event: Event) => void;
  initialEvent?: Partial<Event> | null; // Allow null explicitly
}

const EventForm: React.FC<Props> = ({ onSave, initialEvent = {} }) => {
  const safeInitialEvent = initialEvent || {};
  const [name, setName] = useState(safeInitialEvent.name || "");
  const [start, setStart] = useState(safeInitialEvent.start || new Date());
  const [repeat, setRepeat] = useState<RepeatOption>(
    safeInitialEvent.repeat || REPEAT_OPTIONS.WEEKLY
  );

  const handleSave = () => {
    console.log("if", !name, isPast(start), !name || isPast(start));
    if (!name || isPast(start)) return;
    onSave({
      id: safeInitialEvent.id || Date.now().toString(),
      name,
      start,
      repeat,
    });
    console.log("hi", name, start, repeat);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time (e.g., 03:05 PM)"
        value={start.toString()}
        onChangeText={(text) => {
          /* Add time parsing logic */
        }}
      />
      <Picker
        selectedValue={repeat}
        onValueChange={(itemValue: RepeatOption) => setRepeat(itemValue)}
        style={styles.picker}
      >
        {Object.values(REPEAT_OPTIONS).map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      <Button
        title="Save0"
        onPress={() => {
          console.log("hi", name);
          setTimeout(() => {
            handleSave();
          }, 5);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  picker: { marginBottom: 10 },
});

export default EventForm;
