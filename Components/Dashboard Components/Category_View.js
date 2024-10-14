import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';


export default function Category_View({categories, setSelectedCategory}) {

    const [category_list, setCategory_list] = useState([])
    useEffect(() => {
        setCategory_list(categories);
    }, [category_list])

    function handel_select (item) {
        setSelectedCategory(item);
    }
    

  return (
    <View style={styles.container}>
      <View style={styles.list_view}>
        <FlatList
          data={category_list}
          renderItem={({ item }) => (
            <View style={styles.category}>
            <View style={styles.image_box}>
                <Image 
                    source={item.image} 
                    style={styles.image} 
                    resizeMode='cover'
                />
            </View>
            <View style={styles.body}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <TouchableOpacity style={styles.listButton} onPress={() => handel_select(item)}>
                <Text style={styles.buttonText}>View Items</Text>
            </TouchableOpacity>
            </View>
            
          </View>
          )}
          keyExtractor={item => item.categoryId.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f6f8fb',
  },

  list_view: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },

  category: {
    flexDirection: 'row',
    height: 200, 
    width: '100%', 
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  image_box: {
    height: '100%',
    width: '30%',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  body: {
    height: '100%',
    width: '70%',
    paddingLeft: 30,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },

  description: {
    fontSize: 15,
    color: '#666',
    marginVertical: 5,
    width: '80%',
    lineHeight: 20,
    letterSpacing: 1
  },

  listButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18
  },
});
