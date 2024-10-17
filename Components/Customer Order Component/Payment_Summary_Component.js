import react,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



export default function Payment_Summary_Component({price}) {

return (
  <View style={styles.container}>

    <Text style = {{fontWeight: '800', fontSize: 25}}>Total</Text>
    <Text style = {{fontWeight: '800', fontSize: 25}} >${price}</Text>

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
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  
});