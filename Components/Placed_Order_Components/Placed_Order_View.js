import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Placed_Order_View({ placedOrder }) {
  return (
    <View style={styles.container}>
      <View style={styles.orderIDs}>
        <Text style={styles.tableNum}>Table: {placedOrder.tableNumber}</Text>
        <Text style={styles.orderID}>Order ID: {placedOrder.orderId}</Text>
        <Text style={styles.time}>Time: {new Date(placedOrder.orderTime).toLocaleString()}</Text>
      </View>
      <View style={styles.quantity}>
        <Text style={styles.quantityText}>{placedOrder.totalQuantity} items</Text>
      </View>
      <View style={styles.cost}>
        <Text style={styles.costText}>${placedOrder.totalCost}</Text>
        <Text style={[
                      styles.paymentStatusText,
                      placedOrder.status === 'Paid' 
                        ? styles.statusPaid 
                        : styles.statusUnpaid
                    ]}>{placedOrder.status}</Text>
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
  statusPaid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#e0ffe6',
    borderRadius: 15,
    color: '#2e7d32',
    marginTop: 3,
  },
  statusUnpaid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#ffe6e6',
    borderRadius: 15,
    color: '#d32f2f',
    marginTop: 3,
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
