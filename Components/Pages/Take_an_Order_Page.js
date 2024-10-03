import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import RNPickerSelect from 'react-native-picker-select';

import { Custom_Header_Component } from '../Custom_Header_Component';
import Food_View_Component from '../Food View Component/Food_View_Container';
import Customer_Order_Summary from '../../Customer Order Component/Customer_Order_Summary';

export default function Take_an_Order_Page({ navigation }) {
  const [products, setProducts] = useState([]);
  const [orderSummary, setOrderSummary] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const food_products = [
      { product_id: 123456, name: 'Pizza', img: require('../images/shrimp.jpg'), price: 12 },
      { product_id: 223456,name: 'Burger', img: require('../images/shrimp.jpg'), price: 8 },
      { product_id: 323456,name: 'Pasta', img: require('../images/shrimp.jpg'), price: 10 },
    ];

    const productsWithQuantity = food_products.map(product => ({
      ...product,
      quantity: 0,
    }));

    setProducts(productsWithQuantity);


  }, [])


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
      }
      else {
        return [
          ...prevOrderSummary,
          {
            product_Id: product.product_id,
            product_name: product.name,
            price: product.price,
            quantity: 1,
          }
        ]
      }
    })
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
        <Custom_Header_Component title="Take an Order" />


        <View style={styles.tableSelector}>
          <Text style={styles.tableSelectorLabel}>Select Table:</Text>
          <Picker
            selectedValue={selectedTable}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedTable(itemValue)}
          >
            <Picker.Item label="Table 1" value="1" />
            <Picker.Item label="Table 2" value="2" />
            <Picker.Item label="Table 3" value="3" />
          </Picker>
          
        </View>



        <View style={styles.food_view}>
          <FlatList
            data={products}
            renderItem={({item}) => (
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
        <Customer_Order_Summary orderSummary={orderSummary} tableNumber={selectedTable}/>
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
    paddingBottom: 15 
  },

  food_container: {
    height: 350, 
    width: '27%', 
    paddingBottom: 30,
    borderRadius: 25,
  },

  right_side: {
    height: '100%',
    width: '30%',
  },

  tableSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 15,
  },

  tableSelectorLabel: {
    fontSize: 16,
    marginRight: 10,
  },

  picker: {
    height: 50,
    width: 150,
  },
});
