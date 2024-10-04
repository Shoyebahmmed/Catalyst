import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Custom_Header_Component from '../Custom_Header_Component';


export default function Generate_Reports_Page({ navigation }) {
  return (
    <View style={styles.container}>

        <View style={styles.mid_sec}>
        <View style={styles.header}>
          <Custom_Header_Component title="Generate Reports" />
        </View>
        </View>

        <View style={styles.right_side}>
        <View style={styles.imageLoad}>
        <Image 
          source={require('../images/report.png')}
          style={{height: '100%', height: '100%', resizeMode: 'contain'}}
        />
        </View>
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

  header: {
    height: '15%',
    justifyContent: 'center',
  },

  right_side: {
    height: '100%',
    width: '30%',
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageLoad: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
