import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function order_table_calculation() {
  // Orders with corrected individual price
  const orders = [
    { id: 1, name: 'Chicken Dimsum', quantity: 1, price: 15.99 },
    { id: 2, name: 'Matcha Latte', quantity: 1, price: 10.99 },
    { id: 3, name: 'Omurice', quantity: 2, price: 24.99 }, // Price per item
  ];

  const gratuity = 15.00;
  const taxRate = 0.10; // Assuming a 10% tax rate 

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return orders.reduce((total, order) => total + (order.quantity * order.price), 0);
  };

  // Function to calculate tax based on subtotal
  const calculateTax = (subtotal) => {
    return subtotal * taxRate;
  };

  // Function to calculate the total cost
  const calculateTotal = (subtotal) => {
    return subtotal + calculateTax(subtotal) + gratuity;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders #12930</Text>
      {orders.map((order) => (
        <View key={order.id} style={styles.order}>
          <Text style={styles.orderText}>x{order.quantity} {order.name}</Text>
          <Text style={styles.orderText}>${(order.quantity * order.price).toFixed(2)}</Text>
        </View>
      ))}
      <Text style={styles.title}>Payment Summary</Text>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Tax: ${tax.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Gratuity: ${gratuity.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5', // Light background for better contrast
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
  },
  summary: {
    marginTop: 20,
    width: '100%',
  },
  summaryText: {
    fontSize: 16,
  },
});

