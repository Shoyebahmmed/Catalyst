import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function Product_List_View({ image, category }) {
  const [food_products, set_food_products] = useState([
    { product_id: 123456, name: 'Spaghetti Bolognese', img: require('../images/shrimp.jpg'), price: 12, categoryId: 1 },
    { product_id: 123457, name: 'Fettuccine Alfredo', img: require('../images/shrimp.jpg'), price: 14, categoryId: 1 },
    { product_id: 123458, name: 'Penne Arrabbiata', img: require('../images/shrimp.jpg'), price: 11, categoryId: 1 },
    { product_id: 223456, name: 'Orange Juice', img: require('../images/shrimp.jpg'), price: 4, categoryId: 2 },
    { product_id: 223457, name: 'Latte', img: require('../images/shrimp.jpg'), price: 5, categoryId: 2 },
    { product_id: 223458, name: 'Lemonade', img: require('../images/shrimp.jpg'), price: 3, categoryId: 2 },
    { product_id: 323456, name: 'Chocolate Cake', img: require('../images/shrimp.jpg'), price: 6, categoryId: 3 },
    { product_id: 323457, name: 'Vanilla Ice Cream', img: require('../images/shrimp.jpg'), price: 5, categoryId: 3 },
    { product_id: 323458, name: 'Tiramisu', img: require('../images/shrimp.jpg'), price: 7, categoryId: 3 },
    { product_id: 423456, name: 'Caesar Salad', img: require('../images/shrimp.jpg'), price: 8, categoryId: 4 },
    { product_id: 423457, name: 'Greek Salad', img: require('../images/shrimp.jpg'), price: 9, categoryId: 4 },
    { product_id: 423458, name: 'Cobb Salad', img: require('../images/shrimp.jpg'), price: 10, categoryId: 4 },
    { product_id: 523456, name: 'Chips', img: require('../images/shrimp.jpg'), price: 2, categoryId: 5 },
    { product_id: 523457, name: 'Mixed Nuts', img: require('../images/shrimp.jpg'), price: 4, categoryId: 5 },
    { product_id: 523458, name: 'Pretzels', img: require('../images/shrimp.jpg'), price: 3, categoryId: 5 },
  ]);
// need to update
  const filteredProducts = food_products.filter(item => item.categoryId === category.categoryId);
  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.titleText}>{category.name}</Text>
        </View>
        <View style={styles.image_box}>
            <Image 
                source={image} 
                style={styles.image} 
                resizeMode='cover'
            />
        </View>
      <View style={styles.list_view}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 30}}>Items</Text>
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <View style={styles.body}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.product_id}>{`ID: ${item.product_id}`}</Text>
              </View>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          )}
          keyExtractor={item => item.product_id.toString()}
        />
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },

  title: {
    width: '100%',
    height: '5%',
  },

  titleText:{
    fontSize: 30,
    fontWeight: 'bold',
  },

  list_view: {
    width: '100%',
    height: '65%',
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: '#bec3cc',
  },
  image_box: {
    width: '100%',
    height: '30%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    marginRight: 10,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  product_id: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
