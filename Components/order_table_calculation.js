import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function OrderSummary() {
  const orders = [
    { id: 1, name: 'Chicken Dimsum', quantity: 1, price: 15.99 },
    { id: 2, name: 'Matcha Latte', quantity: 1, price: 10.99 },
    { id: 3, name: 'Omurice', quantity: 2, price: 49.98 }, // Price is for 2
  ];

  const gratuity = 15.00;
  const taxRate = 0.10; // Assuming a 10% tax rate 

  const calculateSubtotal = () => {
    return orders.reduce((total, order) => total + (order.quantity * order.price), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * taxRate;
  };

  const calculateTotal = (subtotal) => {
    return subtotal + calculateTax(subtotal) + gratuity;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  return (
    <View style={styles.container}>
      <Text>Orders #12930</Text>
      {orders.map((order) => (
        <View key={order.id} style={styles.order}>
          <Text>x{order.quantity} {order.name}</Text>
          <Text>${(order.quantity * order.price).toFixed(2)}</Text>
        </View>
      ))}
      <Text>Payment Summary</Text>
      <View style={styles.summary}>
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>Tax: ${tax.toFixed(2)}</Text>
        <Text>Gratuity: ${gratuity.toFixed(2)}</Text>
        <Text>Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const App = () => {
  return (
    <View style={styles.container}>
      <OrderSummary />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summary: {
    marginTop: 20,
  },
});

export default App;