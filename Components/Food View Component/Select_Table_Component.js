import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 

export default function Select_Table_Component ({ selectedTable, setSelectedTable }) {
  return (
    <View style={styles.tableSelector}>
      <Text style={styles.tableSelectorLabel}>Select Table:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTable}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTable(itemValue)}
        >
          <Picker.Item label="Table 1" value="1" />
          <Picker.Item label="Table 2" value="2" />
          <Picker.Item label="Table 3" value="3" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: '100%',
    width: '100%',
  },
  tableSelectorLabel: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: '700',
  },
  pickerContainer: {
    height: '60%',
    width: '70%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center', 
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: '100%',
  },
});
