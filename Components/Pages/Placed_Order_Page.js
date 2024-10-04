import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';
import Custom_Header_Component from '../Custom_Header_Component';
import Food_View_Component from '../Food View Component/Food_View_Container';


export default function Placed_Order({ navigation }) {
  
  const foodItems = Array(10).fill(null); 

  return (
    <View style={styles.container}>

      <View style={styles.mid_sec}>
      <View style={styles.header}>
          <Custom_Header_Component title="Placed Orders" />
        </View>

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
      <View style={styles.imageLoad}>
        <Image 
          source={require('../images/order.png')}
          style={{height: '100%', height: '100%', resizeMode: 'contain'}}
        />
        </View>
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
  
  header: {
    height: '15%',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageLoad: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
