import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Placed_Order_View({ placedOrder }) {
  return (
    <View style={styles.container}>
      <View style={styles.orderIDs}>
        <Text style={styles.tableNum}>Table: {placedOrder.tableNumber}</Text>
        <Text style={styles.orderID}>Order ID: {placedOrder.orderId}</Text>
        <Text style={styles.time}>Time: {placedOrder.orderTime}</Text>
      </View>
      <View style={styles.quantity}>
        <Text style={styles.quantityText}>{placedOrder.totalQuantity} items</Text>
      </View>
      <View style={styles.cost}>
        <Text style={styles.costText}>${placedOrder.totalCost}</Text>
      </View>
      <View style={styles.sign}>
        <Text style={styles.signText}>{">"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // borderRadius: 8,
    marginBottom: 2,
    // elevation: 2,
    alignItems: 'center',
  },
  orderIDs: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 10,
  },
  tableNum: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
  },
  orderID: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  quantity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#444',
  },
  cost: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  costText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#444',
  },
  sign: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  signText: {
    fontSize: 24,
    color: '#444',
    fontWeight: 'bold',
  },
});
