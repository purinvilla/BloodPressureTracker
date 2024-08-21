import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert
} from 'react-native';

export default function Login({ navigation }) {
  const [values, setValues] = useState({});
  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      Alert.alert('Please enter an email and password.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        Alert.alert('Signed in!');
        navigation.navigate('Entry List');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email address.');
        } else {
          Alert.alert(error.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Blood Pressure Tracker</Text>
      <Text style={styles.loginText}>Login</Text>

      <TextInput
        style={styles.textInput}
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={val => onChange(val, 'email')}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.textInput}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={val => onChange(val, 'password')}
        secureTextEntry
      />

      <Text></Text>
      <Button
        title="Login"
        color="#FF5757"
        onPress={onSubmit}
      />

      <Text></Text>
      <Button
        title="Register New User"
        color="#FF5757"
        onPress={() => navigation.navigate('Register')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  textInput: {
    borderColor: "#000000",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 15,
    marginVertical: 12,
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  button: {
    backgroundColor: "red",
  }
});