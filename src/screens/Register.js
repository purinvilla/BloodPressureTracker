import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Checkbox from '../components/Checkbox';

export default function Register({ navigation }) {
  const [agree, setAgree] = useState(false);
  const [values, setValues] = useState({});

  const onCheckboxPress = () => {
    setAgree(value => !value);
  };

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = async (e) => {
    if (!values.firstName || !values.lastName) {
      Alert.alert('Please enter first name and last name.');
      return;
    }

    if (!values.password || !values.confirmPassword) {
      Alert.alert('Passwords should not be empty.');
      return;
    }

    if (values.password !== values.confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    if (!agree) {
      Alert.alert('You must agree to the terms and conditions.');
      return;
    }

    // auth coming from react native firebase
    await auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: `${values.firstName} ${values.lastName}`,
        });
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email address.');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <Text style={styles.loginText}>Registration</Text>

          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={val => onChange(val, 'firstName')}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={val => onChange(val, 'lastName')}
            autoCapitalize="none"
          />

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
            onChangeText={val => onChange(val, 'password')}
            autoCapitalize="none"
            secureTextEntry
          />

          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            onChangeText={val => onChange(val, 'confirmPassword')}
            autoCapitalize="none"
            secureTextEntry
          />

          <View style={styles.row}>
            <Checkbox checked={agree} onPress={onCheckboxPress} />
  
            <Text style={styles.agreeText}>
              I have read and accept the <Text style={styles.links}>Terms and Conditions</Text> and <Text style={styles.links}>Privacy Policy</Text>.
            </Text>
          </View>

          <Text></Text>
          <Button
            title="Register"
            color="#FF5757"
            onPress={onSubmit}
          />
    
          <Text></Text>
          <Button
            title="Cancel"
            color="#FF5757"
            onPress={() => navigation.navigate('Login')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    // marginTop: 30,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  agreeText: {
    color: '#808080',
    fontSize: 12,
    marginLeft: 8,
  },
  links: {
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: "red",
  },
});