import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';

export default function Placed_Order_Detailed_View({ selectedOrder }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Details</Text>
        <Text style={styles.subtitle}>Order ID: {selectedOrder.orderId}</Text>
        <Text style={styles.subtitle}>Table Number: {selectedOrder.tableNumber}</Text>
        <Text style={styles.subtitle}>Order Time: {new Date(selectedOrder.orderTime).toLocaleString()}</Text>
      </View>

      <View style={styles.detailsCont}>
        <Text style={styles.sectionTitle}>Items</Text>
        <FlatList
          data={selectedOrder.items}
          keyExtractor={(item) => item.product_Id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
                <Text style={styles.itemTotal}>Total: ${item.price * item.quantity}</Text>
              </View>
              <View style={styles.itemActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput 
                  style={styles.quantityInput}
                  value={item.quantity.toString()}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Quantity: {selectedOrder.totalQuantity} items</Text>
          <Text style={styles.totalText}>Total Cost: ${selectedOrder.totalCost}</Text>
        </View>

        <View style={styles.customizeActions}>
          <TouchableOpacity style={styles.customizeButton}>
            <Text style={styles.customizeButtonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customizeButton}>
            <Text style={styles.customizeButtonText}>Remove Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customizeButton}>
            <Text style={styles.customizeButtonText}>Update Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },

  header: {
    height: '20%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#f6f8fb',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },

  detailsCont: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  itemDetails: {
    flex: 2,
  },

  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  itemPrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },

  itemTotal: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },

  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  actionButtonText: {
    color: '#fff',
    fontSize: 18,
  },

  quantityInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: 40,
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
  },

  totalContainer: {
    padding: 10,
    backgroundColor: '#f6f8fb',
    borderRadius: 8,
    marginVertical: 10,
  },

  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  customizeActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  customizeButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  customizeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
