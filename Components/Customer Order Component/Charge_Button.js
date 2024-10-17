import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Charge_Button({ orderSummary, tableNumber }) {
  function onSubmit() {
    if (!orderSummary || orderSummary.length === 0) {
      Alert.alert(
        'Error', 
        'The order is empty. Please add items to the order before proceeding.'
      );
    } else if (!tableNumber) {
      Alert.alert(
        'Error', 
        'Please select a table number before placing the order.'
      );
    } else {
      console.log('Table Number:', tableNumber);
      console.log('Order Summary:', orderSummary);
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
    backgroundColor: '#E2802F',
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
