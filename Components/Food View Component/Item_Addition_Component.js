import React, { useState } from 'react';
import Food_View_Container from "./Food_View_Container";
import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';




//plus  pluscircle
// minus

export default function Item_Addition_Component(){

    const[quantity,set_quantity]=useState(10);
    function increment(){

        set_quantity(quantity+1);

    };

    function decrement(){

        if(quantity>0){
            set_quantity(quantity-1)
        }

    };


    return(
        <View style={Styles.button_box}>
          <TouchableOpacity onPress={()=>decrement()}>
            <AntDesign name="minus" size={30} color="black" />
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 20, fontSize:20 }}>{quantity}</Text>
          <TouchableOpacity onPress={()=>increment()} >
            <AntDesign name="pluscircle" size={30} color="black" />
          </TouchableOpacity>
        </View>
    )
}



const Styles=StyleSheet.create({

    button_box:{
        flexDirection: 'row', 
        alignItems: 'center' ,
        borderWidth: 0.5,
        borderColor:"#b0b0b0",
        borderRadius:25,
        paddingHorizontal:15,
        paddingVertical: 5,
        
        

    },

});