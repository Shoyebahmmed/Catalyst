import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import Custom_Header_Component from '../Custom_Header_Component';
import Placed_Order_View from '../Placed_Order_Components/Placed_Order_View';

export default function Placed_Order({ navigation }) {
  const placedOrders = [
    {
      orderId: 100001,
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
      totalCost: 32,
      totalQuantity: 3,
      orderTime: '2024-10-04T10:15:00Z',
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
              <View style={styles.button_container}>
                <Placed_Order_View placedOrder={item} />
              </View>
            )}
            keyExtractor={(item) => item.orderId.toString()}
            numColumns={1}
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>

      <View style={styles.right_side}>
        <View style={styles.imageLoad}>
          <Image
            source={require('../images/order.png')}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
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

  button_container: {
    height: 150,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  right_side: {
    height: '100%',
    width: '30%',
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageLoad: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
