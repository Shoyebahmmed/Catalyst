import react,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function Order_Chart_Component({quantity, product_name, price}) {

  return (
    <View style={styles.container}>
     
      <View style={styles.quantity_box}>
        <Text>x{quantity}</Text>
    </View>
      <View style={styles.product_name_box}>
        <Text >{product_name}</Text>
    </View>

    <View style={styles.price_box}>
        <Text>${price}</Text>
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
  quantity_box:{
    borderColor: '#b0b0b0',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    
  },
  product_name_box:{
    flex:2,
    paddingLeft: 30,
  
    alignSelf: 'center',


  },

  price_box:{
    alignSelf: 'flex-end',


  }

  
});