import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

export default function EntryPage({navigation}) {
  const id = navigation.params?.id;

  const entry = firestore().collection('records').where(documentId(), '==', id);

  // const [values, setValues] = useState({
  //   date: route.params?.date,
  //   systolic: route.params?.systolic,
  //   diastolic: route.params?.diastolic,
  //   heartrate: route.params?.heartrate,
  //   sugarLevel: route.params?.sugarLevel,
  // });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView contentContainerStyle={{gap: 16}}>
            <View style={styles.greyBox}>
              <Text style={styles.label}>Entry for {values.date}</Text>
            </View>

            <View style={styles.row}>
              <View style={[styles.greyBox, styles.pressure]}>
                <View style={styles.counter}>
                <Text style={styles.label}>Systolic</Text>
                  <Text style={styles.bigNum}>
                    {values.systolic}
                  </Text>
                </View>
              </View>

              <View style={[styles.greyBox, styles.pressure]}>
                <View style={styles.counter}>
                  <Text style={styles.label}>Diastolic</Text>
                  <Text style={styles.bigNum}>
                    {values.diastolic}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.greyBox, styles.row]}>
              <Text style={[styles.label, styles.extraMargin]}>Heartrate</Text>
              <Text style={styles.bigNum}>
                {values.heartrate}
              </Text>
            </View>

            <View style={[styles.greyBox, styles.row]}>
              <Text style={[styles.label, styles.extraMargin]}>Sugar Level</Text>
              <Text style={styles.bigNum}>
                {values.sugarLevel}
              </Text>
            </View>
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
    marginRight: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
  },

  // Systolic & diastolic blood pressure
  pressure: {
    gap: 6,
    width: '50%',
  },

  // Heartrate & sugar level
  counter: {
    marginBottom: 10,
  },
  bigNum: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
