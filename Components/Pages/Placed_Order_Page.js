import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Custom_Header_Component from '../Custom_Header_Component';
import Placed_Order_View from '../Placed_Order_Components/Placed_Order_View';
import Placed_Order_Detailed_View from '../Placed_Order_Components/Placed_Order_Detailed_View';

export default function Placed_Order({ navigation }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const placedOrders = [
    {
      orderId: 1001,
      tableNumber: 5,
      items: [
        {
          product_Id: 123456,
          product_name: 'Pizza',
          price: 12,
          quantity: 2,
        },
        {
          product_Id: 223456,
          product_name: 'Burger',
          price: 8,
          quantity: 1,
        },
      ],
      totalQuantity: 3, 
      totalCost: 32, 
      orderTime: '2024-10-04T10:15:00Z',
    },
    {
      orderId: 1002,
      tableNumber: 3,
      items: [
        {
          product_Id: 323456,
          product_name: 'Pasta',
          price: 10,
          quantity: 3,
        },
        {
          product_Id: 423456,
          product_name: 'Coke',
          price: 3,
          quantity: 2,
        },
      ],
      totalQuantity: 5, 
      totalCost: 36, 
      orderTime: '2024-10-04T10:45:00Z',
    },
    {
      orderId: 1003,
      tableNumber: 2,
      items: [
        {
          product_Id: 223456,
          product_name: 'Burger',
          price: 8,
          quantity: 3,
        },
        {
          product_Id: 423456,
          product_name: 'Coke',
          price: 3,
          quantity: 1,
        },
        {
          product_Id: 123456,
          product_name: 'Pizza',
          price: 12,
          quantity: 1,
        },
      ],
      totalQuantity: 5, 
      totalCost: 39, 
      orderTime: '2024-10-04T11:00:00Z',
    },
  ];
  

  return (
    <View style={styles.container}>
      <View style={styles.mid_sec}>
        <View style={styles.header}>
          <Custom_Header_Component title="Placed Orders" />
        </View>

        <View style={styles.list_view}>
          <FlatList
            data={placedOrders}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button_container} onPress={() => setSelectedOrder(item)}>
                <Placed_Order_View placedOrder={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.orderId.toString()}
            numColumns={1}
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>

      <View style={styles.right_side}>
          {selectedOrder ? (
            <Placed_Order_Detailed_View  selectedOrder={selectedOrder}/>
          ) : (
            <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Select an order to view details</Text>
          </View>
          )}
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
    width: '55%',
    backgroundColor: '#f6f8fb',
  },

  header: {
    height: '15%',
    justifyContent: 'center',
  },

  button_container: {
    width: '100%',
  },

  list_view: {
    flex: 1,
  },

  right_side: {
    height: '100%',
    width: '45%',
    backgroundColor: '#fff',
  },

  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    fontSize: 18,
    color: '#888',
  },

});
