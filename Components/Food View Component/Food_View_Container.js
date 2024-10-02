import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Item_Addition_Component from './Item_Addition_Component';


export default function Food_View_Container() {

  const image_url = require('../images/shrimp.jpg')
  const [product_name, set_product_name] = useState('Shrimp Soup');
  const [product_price, set_product_price] = useState(10);
  return (
    <View style={styles.container}>
      <View style={styles.mineview}>
        <View style={styles.img}>
          <Image

            source={image_url}
            style={styles.image_style}
            resizeMode='cover'

          />
        </View>

        <View style={styles.bodySection}>
          <View style={styles.name}>
            <Text style={[styles.text, {fontWeight:'500',fontSize:20} ]}> {product_name} </Text>
          </View>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.price}>
            <Text style={styles.text}> ${product_price} </Text>
          </View>

          
          <View style={styles.add_item}>
            <Item_Addition_Component />
          </View>
        </View>

      </View>


    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:25,

  },
  mineview: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    width: '100%',
    height: '100%' ,
    borderRadius: 25// Full width of the screen
  },
  image_style: {
    width: '100%',
    height: '100%',


  },
  img: {
    //flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Center text vertically
    alignItems: 'center',
    width: '100%',
    height: '70%' // Center text horizontally
  },

  bodySection: {
    //flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '10%' // Full width of the screen
  },

  name: {
    //flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 5
   
  },

  priceSection: {
    //flex:1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    justifyContent: "space-between", // Center horizontally
    alignItems: 'center',      // Center vertically
  },
  

  price: {
    backgroundColor: '#fff',
    justifyContent: 'center',  // Center text vertically
    alignItems: 'center',      // Center text horizontally
    padding: 10,               // Add padding for spacing
  },
  
  quantity: {
    backgroundColor: '#fff',
    justifyContent: 'center',  // Center text vertically
    alignItems: 'center',      // Center text horizontally
    padding: 10,               // Add padding for spacing
  },
  
  add_item: {
    justifyContent: 'center',  // Center item vertically
    alignItems: 'center',      // Center item horizontally
    padding: 10, 
                  // Add padding for spacing
  },
    
  text: {
    color: 'black', // Text color to be visible against backgrounds
    fontSize: 20, // Font size
  },
});