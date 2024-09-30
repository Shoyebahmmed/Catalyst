import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Custom_Header_Component } from '../Custom_Header_Component';


export default function Settings_Page({ navigation }) {
  return (
    <View style={styles.container}>

        <View style={styles.mid_sec}>
            <Custom_Header_Component title="Settings"/>
            <Text>Settings_Page</Text>
        </View>

        <View style={styles.right_side}>
            <Text>Settings_Page</Text>
        </View>
      
        
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },

  mid_sec: {
    height: '100%',
    width: '70%',
    backgroundColor: '#f6f8fb',
  },

  right_side: {
    height: '100%',
    width: '30%',
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 10,
  },

  
});
