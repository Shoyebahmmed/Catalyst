import react,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function Order_Table_component({table_number}) {

  return (
    <View style={styles.container}>
      <View style={styles.table_number_box}>
        <Text style = {{fontWeight: 'bold', fontSize: 24,}} >Table {table_number}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  table_number_box:{
    flex:2,
    
  }

  
});