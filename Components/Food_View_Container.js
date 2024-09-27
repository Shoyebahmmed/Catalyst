import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';


export default function Food_View_Container() {

  const image_url = require('./images/shrimp.jpg')
  const[product_name, set_product_name]= useState('Shrimp Soup');
  const[product_price, set_product_price] = useState(10);
  return (
    <View style={styles.container}>
      <View style={styles.mineview}>
      <View style={styles.img}>
        <Image
        
        source = {image_url}
        style = {styles.image_style}
        resizeMode='contain'

        />
        </View>

        <View style={styles.bodySection}>
            <View style={styles.name}>
                <Text style={styles.text}> {product_name} </Text>
            </View>
        </View>

        <View style={styles.priceSection}>
        <View style={styles.price}>
        <Text style={styles.text}> ${product_price} </Text>
        </View>

        <View style={styles.quantity}>
              <Text style={styles.text}>
                Quantity
              </Text>
              </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mineview: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    width: '100%', // Full width of the screen
  },
  image_style:{
    width:'100%',
    height:'100%',


  },
  img: {
    //flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center', // Center text vertically
    alignItems: 'center',
    width: '100%',
    height:'60%' // Center text horizontally
  },

  bodySection: {
    //flex: 1,
    backgroundColor: 'red',
    flexDirection: 'column',
    width: '100%',
    height: '20%' // Full width of the screen
  },

  name: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center', // Center text vertically
    //alignItems: 'center',
    // Center text horizontally
  },

  priceSection: {
    //flex: 1,
    backgroundColor: 'pink',
    flexDirection: 'row',
    width: '100%',
    height:'20%' // Full width of the screen
  },
  
  price: {
    //flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },

  quantity: {
    //flex: 1,
    backgroundColor: 'brown',
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },

  text: {
    color: 'black', // Text color to be visible against backgrounds
    fontSize: 18, // Font size
  },
});