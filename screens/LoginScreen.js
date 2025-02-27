// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import OTPInput from 'react-native-otp-inputs';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('YOUR_API_URL/login', { email });
      setShowOtp(true);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('YOUR_API_URL/verify-otp', { email, otp });
      // Store JWT token
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {!showOtp ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Send OTP" onPress={handleLogin} />
        </>
      ) : (
        <>
          <OTPInput
            numberOfInputs={6}
            style={styles.otp}
            handleChange={(code) => setOtp(code)}
          />
          <Button title="Verify OTP" onPress={verifyOtp} />
        </>
      )}
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  otp: { marginVertical: 20 }
});

export default LoginScreen;