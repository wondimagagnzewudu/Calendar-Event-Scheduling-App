import React from 'react';
import { Provider } from 'react-redux';
import { Tabs } from 'expo-router';
import { store } from '../redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen 
          name="index" 
          options={{ title: 'Calendar' }} 
        />
        {/* Add more tabs here if needed */}
      </Tabs>
    </Provider>
  );
}