import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';

const Checkbox = ({checked, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, checked ? {borderWidth: 2} : {}]}>
      {checked ? <View style={styles.innerSquare} /> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 3,
    justifyContent: 'center',
    marginVertical: 2,
    height: 18,
    width: 18,
  },
  innerSquare: {
    width: 10,
    height: 10,
    backgroundColor: '#FF0000',
  },
});

export default Checkbox;
