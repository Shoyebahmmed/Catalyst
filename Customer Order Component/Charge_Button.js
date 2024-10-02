import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Charge_Button() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button_style}>
        <Text style={styles.button_Text}>Place order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center the button horizontally
    justifyContent: 'center', // Center the button vertically if needed
    flex: 1, // Take the full height of the parent
  },
  button_style: {
    backgroundColor: '#3687ff',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 15, // Optional: Add rounded corners
  },
  button_Text: {
    fontSize: 24,
    fontWeight: '500', // Use a string for fontWeight
    color: '#fff',
  },
});