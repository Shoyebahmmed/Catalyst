import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Item_Addition_Component from './Item_Addition_Component';


export default function Food_View_Container({product, addProduct, reomoveProduct}) {


  return (
    <View style={styles.container}>
      <View style={styles.mineview}>
        <View style={styles.img}>
          <Image

            source={product.img}
            style={styles.image_style}
            resizeMode='cover'

          />
        </View>

        <View style={styles.bodySection}>
          <View style={styles.name}>
            <Text style={styles.text}> {product.name} </Text>
          </View>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.price}>
            <Text style={styles.text}> ${product.price} </Text>
          </View>

          
          <View style={styles.add_item}>
            <Item_Addition_Component 
              quantity={product.quantity}
              on_add={() => addProduct(product.product_id)}
              on_remove={() => reomoveProduct(product.product_id)}
            />
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
    borderRadius: 25
  },
  image_style: {
    width: '100%',
    height: '100%',


  },
  img: {
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '70%' 
  },

  bodySection: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '10%'
  },

  name: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10
   
  },

  priceSection: {

    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    justifyContent: "space-between", 
    alignItems: 'center',      
  },
  

  price: {
    backgroundColor: '#fff',
    justifyContent: 'center',  
    alignItems: 'center',      
    padding: 10,               
  },
  
  quantity: {
    backgroundColor: '#fff',
    justifyContent: 'center',  
    alignItems: 'center',      
    padding: 10,              
  },
  
  add_item: {
    justifyContent: 'center', 
    alignItems: 'center',      
    paddingRight: 10
  },
    
  text: {
    color: 'black', 
    fontWeight:'800',
    fontSize:20
  },
});