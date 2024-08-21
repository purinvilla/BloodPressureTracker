import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

const AddButton = ({onPress, style, textStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.addButtonContainer, style]}
    >
      <Text style={[styles.addButtonText, textStyle]}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    // elevation: 8,
    backgroundColor: "#38B6FF",
    borderRadius: 100,
    justifyContent: "center",
    height: 80,
    width: 80,
  },
  addButtonText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    position: "relative",
    bottom: 2,
  }
});

export default AddButton;