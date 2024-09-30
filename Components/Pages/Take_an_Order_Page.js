import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Custom_Header_Component } from '../Custom_Header_Component';
import Food_View_Component from '../Food View Component/Food_View_Container';

export default function Take_an_Order_Page({ navigation }) {
  
  const foodItems = Array(10).fill(null); 

  return (
    <View style={styles.container}>

      <View style={styles.mid_sec}>
        <Custom_Header_Component title="Take an Order" />

        <View style={styles.food_view}>
          <FlatList
            data={foodItems}
            renderItem={() => (
              <View style={styles.food_container}>
                <Food_View_Component />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} 
            columnWrapperStyle={styles.list_row} 
          />
        </View>
      </View>

      <View style={styles.right_side}>
        <Text>Take_an_Order_Page</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },

  mid_sec: {
    height: '100%',
    width: '70%',
    backgroundColor: '#f6f8fb',
  },

  food_view: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },

  list_row: {
    justifyContent: 'space-between', 
  },

  food_container: {
    height: 350, 
    width: '30%', 
    marginBottom: 20,
  },

  right_side: {
    height: '100%',
    width: '30%',
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
});
