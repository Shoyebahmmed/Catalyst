import React, { useState } from 'react';
import Food_View_Container from "./Food_View_Container";
import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';




export default function Item_Addition_Component({quantity, on_add, on_remove}){

    return(
        <View style={Styles.button_box}>
          <TouchableOpacity onPress={()=>on_remove()}>
            <AntDesign name="minus" size={30} color="black" />
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 20, fontSize:20 }}>{quantity}</Text>
          <TouchableOpacity onPress={()=>on_add()} >
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