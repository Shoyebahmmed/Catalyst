import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Charge_Button() {
  return (
      <TouchableOpacity style={styles.button_style}>
        <Text style={styles.button_Text}>Place order</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button_style: {
    backgroundColor: '#3687ff',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25, 
    
  },
  button_Text: {
    fontSize: 24,
    fontWeight: '600', 
    color: '#fff',
    textAlign: 'center'
  },
});