import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AddButton from '../components/AddButton';
import Entry from "../components/Entry";

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
  FlatList
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

export default function EntryList({ navigation }) {
  const user = useSelector(state => state.user.data);
  
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('records')
      .onSnapshot(querySnapshot => {
        const records = [];
  
        querySnapshot.forEach(documentSnapshot => {
          records.push({
            key: documentSnapshot.key,
            ...documentSnapshot.data(),
          });
        });

        // Sort by date, descending
        records.sort((a, b) => b.values.date.toString().localeCompare(a.values.date.toString()));
  
        setRecords(records);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  
  if (loading) {
    return <ActivityIndicator />;
  }

  const renderEntry = ({item}) => {
    return (
      <Entry
        // onPress={() => navigation.navigate("Entry Page", { id: JSON.stringify(item.key) })}
        date={JSON.stringify(
          item.values.date.toDate().toLocaleString()
        ).replace(/"/g, '')}
        systolic={JSON.stringify(item.values.systolic)}
        diastolic={JSON.stringify(item.values.diastolic)}
        heartrate={JSON.stringify(item.values.heartrate)}
        sugarLevel={JSON.stringify(item.values.sugarLevel)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tableTop}>
        <Text style={[styles.tableLabel, styles.dateLabel]}>Date</Text>
        <Text style={styles.tableLabel}>Syst.</Text>
        <Text style={styles.tableLabel}>Dias.</Text>
        <Text style={styles.tableLabel}>Heart Rate</Text>
        <Text style={styles.tableLabel}>Sugar Level</Text>
      </View>

      <FlatList
        style={styles.scrollingList}
        data={records}
        renderItem={renderEntry}
        keyExtractor={item => String(item?.key)}
      />

      <AddButton
        style={styles.addButton}
        onPress={() => navigation.navigate('Add Entry')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    position: "relative",
    height: '99%',
  },
  tableTop: {
    backgroundColor: "black",
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 6,
    position: "absolute",
    zIndex: 1,
  },
  tableLabel: {
    alignSelf: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  dateLabel: {
    flex: 1.5,
    marginRight: 10,
    textAlign: "left",
  },
  scrollingList: {
    marginTop: 55,
    marginBottom: 15,
    paddingBottom: 50,
  },
  button: {
    backgroundColor: "red",
  },
  addButton: {
    position: 'absolute',
    bottom: '5%',
    right: '1%',
  }
});
