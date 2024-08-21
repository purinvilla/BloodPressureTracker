import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth, {Timestamp} from '@react-native-firebase/auth';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  KeyboardAvoidingView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import getDate from '../functions/GetDate'

export default function TestAdd({navigation}) {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    // month: 1,
    // day: 1,
    // year: 2024,
    date: new Date(),
    systolic: 0,
    diastolic: 0,
    heartrate: 0,
    sugarLevel: 0,
  });

  const [currentDate, setCurrentDate] = useState(getDate());

  const onChange = (value, key) => {
    if (!value || value < 0) {
      setValues(vals => ({
        ...vals,
        [key]: 0,
      }));
    } else {
      setValues(vals => ({
        ...vals,
        [key]: value,
      }));
    }
  };

  const onSubmit = () => {
    if (!values) {
      Alert.alert('Please fill in every box.');
      return;
    }

    values.date = new Date();

    firestore()
      .collection('records')
      .add({
        key: Math.random(),
        values,
      })
      .then(() => {
        console.log('Data Recorded!');
        navigation.goBack();
      })
      .catch(e => {
        console.log('Error when adding entry.', e);
        Alert.alert(e.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView contentContainerStyle={{gap: 16}}>
          <View style={styles.greyBox}>
            <Text style={styles.label}>Entry for {currentDate}</Text>
          </View>

          <View style={styles.row}>
            <View style={[styles.greyBox, styles.pressure]}>
              <CustomButton
                title="-"
                style={styles.numButton}
                textStyle={styles.buttonText}
                // onPress={() => values.systolic -= 1}
                onPress={() => onChange(--values.systolic, 'systolic')}
              />

              <View style={styles.counter}>
                <Text style={styles.label}>Systolic</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  onChangeText={val => onChange(parseInt(val), 'systolic')}
                  autoCapitalize="none"
                >
                  {values.systolic}
                </TextInput>
              </View>

              <CustomButton
                title="+"
                style={styles.numButton}
                textStyle={styles.buttonText}
                onPress={() => onChange(++values.systolic, 'systolic')}
              />
            </View>

            <View style={[styles.greyBox, styles.pressure]}>
              <CustomButton
                title="-"
                style={styles.numButton}
                textStyle={styles.buttonText}
                onPress={() => onChange(--values.diastolic, 'diastolic')}
              />

              <View style={styles.counter}>
                <Text style={styles.label}>Diastolic</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  onChangeText={val => onChange(parseInt(val), 'diastolic')}
                  autoCapitalize="none"
                >
                  {values.diastolic}
                </TextInput>
              </View>

              <CustomButton
                title="+"
                style={styles.numButton}
                textStyle={styles.buttonText}
                onPress={() => onChange(++values.diastolic, 'diastolic')}
              />
            </View>
          </View>

          <View style={[styles.greyBox, styles.row]}>
            <CustomButton
              title="-"
              style={[styles.horizontalButton, styles.leftButton]}
              textStyle={styles.buttonText}
              onPress={() => onChange(--values.heartrate, 'heartrate')}
            />

            <Text style={[styles.label, styles.extraMargin]}>Heartrate</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={val => onChange(parseInt(val), 'heartrate')}
              autoCapitalize="none"
            >
              {values.heartrate}
            </TextInput>

            <CustomButton
              title="+"
              style={[styles.horizontalButton, styles.rightButton]}
              textStyle={styles.buttonText}
              onPress={() => onChange(++values.heartrate, 'heartrate')}
            />
          </View>

          <View style={[styles.greyBox, styles.row]}>
            <CustomButton
              title="-"
              style={[styles.horizontalButton, styles.leftButton]}
              textStyle={styles.buttonText}
              onPress={() => onChange(--values.sugarLevel, 'sugarLevel')}
            />

            <Text style={[styles.label, styles.extraMargin]}>Sugar Level</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={val => onChange(parseInt(val), 'sugarLevel')}
              autoCapitalize="none"
            >
              {values.sugarLevel}
            </TextInput>

            <CustomButton
              title="+"
              style={[styles.horizontalButton, styles.rightButton]}
              textStyle={styles.buttonText}
              onPress={() => onChange(++values.sugarLevel, 'sugarLevel')}
            />
          </View>

          <Button
            title="Add Entry"
            color="#FF5757"
            onPress={() => onSubmit()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Background & boxes
  container: {
    alignContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  greyBox: {
    backgroundColor: '#C0C0C0',
    borderRadius: 12,
    padding: 12,
  },

  // Miscellaneous
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraMargin: {
    marginRight: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    paddingHorizontal: 18,
    paddingVertical: 6,
    textAlign: 'center',
  },

  // Systolic & diastolic blood pressure
  pressure: {
    gap: 6,
    width: '50%',
  },
  numButton: {
    height: 40,
  },
  buttonText: {
    fontSize: 20,
    // position: 'relative',
    // top: 5
  },

  // Heartrate & sugar level
  horizontalButton: {
    height: 50,
    width: 60,
  },
  leftButton: {
    position: 'absolute',
    left: 10,
  },
  rightButton: {
    position: 'absolute',
    right: 10,
  },
  counter: {
    marginBottom: 10,
  },
  bigNum: {
    fontSize: 40,
  },
});
