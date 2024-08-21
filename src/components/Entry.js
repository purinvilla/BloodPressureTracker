import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const Entry = (
  {onPress, date, systolic, diastolic, heartrate, sugarLevel}
) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.entryContainer}
    >
      {/* Date */}
      <View style={styles.entryRow}>
        <Text style={[styles.dateText, styles.bold]}>
          {date}
        </Text>
        <Text style={[styles.stat]}>
          {systolic}
        </Text>
        <Text style={[styles.stat]}>
          {diastolic}
        </Text>
        <Text style={[styles.stat]}>
          {heartrate}
        </Text>
        <Text style={[styles.stat]}>
          {sugarLevel}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    backgroundColor: '#C0C0C0',
    borderRadius: 12,
    marginVertical: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  entryRow: {
    flexDirection: 'row',
  },
  dateText: {
    alignSelf: "center",
    color: "#000",
    flex: 1.5,
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
  },
  stat: {
    alignSelf: "center",
    backgroundColor: "#00000026",
    borderRadius: 12,
    color: "#000",
    flex: 1,
    fontSize: 15,
    paddingVertical: 7,
    textAlign: "center",
  },
});

export default Entry;