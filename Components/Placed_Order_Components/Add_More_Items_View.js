import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import Food_View_Container from '../Food View Component/Food_View_Container';

export default function Add_More_Items_View({products, currentOrderItems, onDone}) {
    const [product_list, set_produt_list] = useState(() => {
        return products.map((product) => {
            const orderItem = currentOrderItems.find(item => item.product_id === product.product_id);
            return {
                ...product,
                quantity: orderItem ? orderItem.quantity : 0
            };
        });
    });

    const addProduct = (productId) => {
        const updatedList = product_list.map((product) => {
          if (product.product_id === productId) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
        set_produt_list(updatedList);
      };

      const removeProduct = (productId) => {
        const updatedList = product_list.map((product) => {
          if (product.product_id === productId && product.quantity > 0) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
        set_produt_list(updatedList);
      };

      const handleDone = () => {
        const updatedOrderItems = product_list.filter(product => product.quantity > 0);
        onDone(updatedOrderItems);
      };

      return (
        <View style={styles.container}>
            <FlatList
                data={product_list}
                keyExtractor={(item) => item.product_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.food_container}>
                        <Food_View_Container
                            product={item}
                            addProduct={addProduct}
                            reomoveProduct={removeProduct}
                        />
                    </View>
                )}
                numColumns={3}
                columnWrapperStyle={styles.list_row}
            />
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 30,
            backgroundColor: '#f6f8fb',
        },
        doneButton: {
            padding: 15,
            width: 100,
            backgroundColor: '#28A745',
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20,
        },
        doneButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        food_container: {
            height: 350, 
            width: '27%', 
            paddingBottom: 30,
            borderRadius: 25,
            marginRight: '6%',
        },
        list_row: {
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            paddingBottom: 15,
        },
    });