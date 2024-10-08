import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function Placed_Order_View({ placedOrder }) {
  
  return (
    <View style={styles.container}>

        <View style={styles.orderIDs}>
            <Text style={styles.tableNum}>{placedOrder.tableNumber}</Text>
            <Text style={styles.orderID}>{placedOrder.orderId}</Text>
            <Text style={styles.time}>{placedOrder.orderTime}</Text>
        </View>
        <View style={styles.quantity}>
            <Text>{placedOrder.totalQuantity}</Text>
        </View>
        <View style={styles.cost}>
            <Text>{placedOrder.totalCost}</Text>
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

  orderIDs: {
    flexDirection: 'column',
  },

  orderID: {},

  tableNum: {},

  time: {},

  quantity: {},

  cost: {},
});
