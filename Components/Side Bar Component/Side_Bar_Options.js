import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';



export default function Side_Bar_Options({iconName, iconLib: IconLib, description, onSelect, isSelected}) {
  const selectedColor = '#e2802f'; 
  const defaultColor = 'black'; 


    function onClickLog(text) {
        console.log("from ", text);
        onSelect();
    }

  return (
    <TouchableOpacity 
        style={isSelected ? styles.options_box_selected : styles.options_box} 
        onPress={() => onClickLog(description)}
    >
      <View style={styles.icon}>
        <IconLib
          name={iconName}
          size={24}
          color={isSelected ? selectedColor : defaultColor} 
        />
      </View>

        <Text style={isSelected ? styles.options_text_selected : styles.options_text}>{description}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
     options_box: {
        flexDirection: 'row',
        padding: 20,
        marginVertical: 10,
        paddingLeft: 45,
      },

      options_box_selected: {
        flexDirection: 'row',
        padding: 20,
        marginVertical: 10,
        paddingLeft: 45,
        backgroundColor: '#f4f4f4',
      },
    
      icon: {
        height: 25,
        width: 25,
        opacity: 0.9,
      },
      
      options_text: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 20,
        opacity: 0.7,
      },

      options_text_selected: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 20,
        opacity: 0.9,
        color: '#e2802f',
        fontWeight: 'bold',
      },
  
});
