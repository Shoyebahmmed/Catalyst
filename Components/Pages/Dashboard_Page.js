import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Custom_Header_Component } from '../Custom_Header_Component';
import Food_View_Component from '../Food View Component/Food_View_Container';


export default function Dashboard_Page({ navigation }) {
  
  const foodItems = Array(10).fill(null); 

  return (
    <View style={styles.container}>

      <View style={styles.mid_sec}>
        <Custom_Header_Component title="Dashboard" />

        <View style={styles.list_view}>
          <FlatList
            data={foodItems}
            renderItem={() => (
              <View style={styles.button_container}>
                <Button title='Submit' style={{backgroundColor: 'blue'}} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} 
            columnWrapperStyle={styles.row} 
          />
        </View>
      </View>

      <View style={styles.right_side}>
        
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

  list_view: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },

  row: {
    justifyContent: 'space-between', 
  },

  button_container: {
    height: 150, 
    width: '30%', 
    marginBottom: 20,
    backgroundColor: '#676f7b',
  },

  right_side: {
    height: '100%',
    width: '30%',
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
});
