import react,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



export default function Payment_Summary_Component({price}) {

return (
  <View style={styles.container}>
    <View style={styles.total_box}>
      <Text style = {{fontWeight: '500'}}>Total</Text>
  </View>

  <View style={styles.price_box}>
      <Text style = {{fontWeight: '500'}} >${price}</Text>
  </View>
    
  </View>
);
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 50,
  },
  total_box_box:{
    borderColor: '#b0b0b0',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    
  },

  price_box:{
    alignSelf: 'flex-end',


  }

  
});