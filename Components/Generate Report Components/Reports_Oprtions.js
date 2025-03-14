import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Reports_Options({ order_history, setIsOverLayOn, isOverLayOn, setReportType}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#1abc9c' }]} 
        onPress={() => {
          setIsOverLayOn(!isOverLayOn);
          setReportType('daily');
        }}
      >
        <View style={styles.buttonView}>
          <MaterialCommunityIcons name="calendar-today" size={35} color="black" />
          <Text style={styles.buttonText}>Daily Report</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#b158d6' }]} 
        onPress={() => {
          setIsOverLayOn(!isOverLayOn);
          setReportType('weekly');
        }}
      >
        <View style={styles.buttonView}>
          <MaterialCommunityIcons name="calendar-week" size={35} color="black" />
          <Text style={styles.buttonText}>Weekly Report</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#e67e22' }]}         
        onPress={() => {
          setIsOverLayOn(!isOverLayOn);
          setReportType('monthly');
        }} 
      >
        <View style={styles.buttonView}>
          <MaterialCommunityIcons name="calendar-month-outline" size={35} color="black" />
          <Text style={styles.buttonText}>Monthly Report</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#f5d142' }]} 
        onPress={() => {
          setIsOverLayOn(!isOverLayOn);
          setReportType('yearly');
        }} 
      >
        <View style={styles.buttonView}>
          <MaterialCommunityIcons name="calendar-weekend-outline" size={35} color="black" />
          <Text style={styles.buttonText}>Yearly Report</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#f6f8fb',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingTop: 30,
  },
  button: {
    height: '30%',
    width: '45%',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
});
