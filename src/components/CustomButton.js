import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const CustomButton = ({onPress, title, style, textStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, style]}
    >
      <Text style={[styles.appButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#FF5757",
    borderRadius: 10,
    justifyContent: "center",
    // paddingVertical: 10,
    // paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  }
});

export default CustomButton;