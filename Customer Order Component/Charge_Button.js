import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Charge_Button({ tableNumber }) {
  function onSubmit() {
    if (!tableNumber) {
      Alert.alert(
        'Error', 
        'Please select a table number before placing the order.'
      );
    } else {
      console.log('Table Number:', tableNumber);
    }
  }

  return (
    <TouchableOpacity style={styles.button_style} onPress={onSubmit}>
      <Text style={styles.button_Text}>Place order</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button_style: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  button_Text: {
    fontSize: 21,
    fontWeight: '600', 
    color: '#fff',
    textAlign: 'center',
  },
});
