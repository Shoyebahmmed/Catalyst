import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

import Custom_Header_Component from '../Custom_Header_Component';
import Food_View_Component from '../Food View Component/Food_View_Container';
import Customer_Order_Summary from '../../Customer Order Component/Customer_Order_Summary';
import Select_Table_Component from '../Food View Component/Select_Table_Component';
import Category_View_Componetnt from '../Food View Component/Category_View_Component';

export default function Take_an_Order_Page({ navigation }) {
  const [products, setProducts] = useState([]);
  const [orderSummary, setOrderSummary] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryData = [
      { categoryId: 1, name: 'Fast Food' },
      { categoryId: 2, name: 'Italian' },
      { categoryId: 3, name: 'Beverages' },
    ];

    const food_products = [
      { product_id: 123456, name: 'Pizza', img: require('../images/shrimp.jpg'), price: 12, categoryId: 2 },
      { product_id: 223456, name: 'Burger', img: require('../images/shrimp.jpg'), price: 8, categoryId: 1 },
      { product_id: 323456, name: 'Pasta', img: require('../images/shrimp.jpg'), price: 10, categoryId: 2 },
      { product_id: 423456, name: 'Coke', img: require('../images/shrimp.jpg'), price: 3, categoryId: 3 },
    ];

    const productsWithQuantity = food_products.map(product => ({
      ...product,
      quantity: 0,
    }));

    setProducts(productsWithQuantity);
    setCategories(categoryData);
  }, []);

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  function updateOrderSummaryForIncrement(product) {
    setOrderSummary(prevOrderSummary => {
      if (prevOrderSummary.length === 0) {
        return [{
          product_Id: product.product_id,
          product_name: product.name,
          price: product.price,
          quantity: 1,
        }];
      }

      const existing_Product = prevOrderSummary.findIndex(item => item.product_Id === product.product_id);
      if(existing_Product !== -1) {
        return prevOrderSummary.map(item =>
          item.product_Id === product.product_id
          ? { ...item, quantity: item.quantity + 1}
          : item
        );
      } else {
        return [
          ...prevOrderSummary,
          {
            product_Id: product.product_id,
            product_name: product.name,
            price: product.price,
            quantity: 1,
          }
        ];
      }
    });
  }

  function updateOrderSummaryForDecrement(product) {
    setOrderSummary(prevOrderSummary => {
      if (prevOrderSummary.length === 0) {
        return []; 
      }
  
      const existingProductIndex = prevOrderSummary.findIndex(item => item.product_Id === product.product_id);
  
      if (existingProductIndex !== -1) {
        const updatedProduct = prevOrderSummary[existingProductIndex];
  
        if (updatedProduct.quantity > 1) {
          return prevOrderSummary.map(item =>
            item.product_Id === product.product_id
            ? { ...item, quantity: item.quantity - 1 }
            : item
          );
        } else {
          return prevOrderSummary.filter(item => item.product_Id !== product.product_id);
        }
      }
  
      return prevOrderSummary;
    });
  }

  function incrementQuantity(id) {
    const productToIncrement = products.find(product => product.product_id === id);
    setProducts(products => products.map(product =>
      product.product_id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));

    updateOrderSummaryForIncrement(productToIncrement);
  }

  function decrementQuantity(id) {
    const productToDecrement = products.find(product => product.product_id === id);

    setProducts(products => products.map(product =>
      product.product_id === id && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
    ));

    updateOrderSummaryForDecrement(productToDecrement);
  }

  return (
    <View style={styles.container}>

      <View style={styles.mid_sec}>
        <View style={styles.header}>
          <Custom_Header_Component title="Take an Order" />
        </View>

        <View style={styles.tableSelector}>
          <Select_Table_Component selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
        </View>

        <View style={styles.catBox}>
          <Category_View_Componetnt 
            categories={categories} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        </View>

        <View style={styles.food_view}>
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <View style={styles.food_container}>
                <Food_View_Component 
                  product={item}
                  addProduct={incrementQuantity}
                  reomoveProduct={decrementQuantity}
                />
              </View>
            )}
            keyExtractor={item => item.product_id.toString()}
            numColumns={3}
            columnWrapperStyle={styles.list_row}
          />
        </View>
      </View>

      <View style={styles.right_side}>
        <Customer_Order_Summary orderSummary={orderSummary} tableNumber={selectedTable} />
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

  tableSelector: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: '8%',
    width: '100%',
  },

  tableSelectorLabel: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: '700',
  },

  picker: {
    height: '60%',
    width: '70%',
    borderRadius: 30,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  catBox: {
    width: '100%',
    height: '5%',
  },

  categoryScroller: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },

  categoryItem: {
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },

  categoryItemSelected: {
    backgroundColor: '#007bff',
  },

  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },

  food_view: {
    height: '72%',
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },

  list_row: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 15,
  },

  food_container: {
    height: 350,
    width: '27%',
    paddingBottom: 30,
    borderRadius: 25,
    marginRight: '6%',
  },

  right_side: {
    height: '100%',
    width: '30%',
  },


});
