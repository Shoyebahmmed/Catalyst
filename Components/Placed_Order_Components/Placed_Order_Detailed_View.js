import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';


export default function Placed_Order_Detailed_View({ showAddItems, setShowAddItems, selectedOrder, onDeleteOrder, onUpdateOrder }) {
  const [orderDetails, setOrderDetails] = useState(selectedOrder);

  useEffect(() => {
    setOrderDetails(selectedOrder);
  }, [selectedOrder]);


  function incrementItem (productId) {
    const updatedItems = orderDetails.items.map((item) => {
      if (item.product_id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateOrderDetails(updatedItems);
  };

  function decrementItem  (productId) {
    const updatedItems = orderDetails.items
      .map((item) => {
        if (item.product_id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); 
    updateOrderDetails(updatedItems);
  };


  function updateOrderDetails (updatedItems) {
    const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setOrderDetails({
      ...orderDetails,
      items: updatedItems,
      totalQuantity,
      totalCost,
    });
  };

  function updateOrder() {
    if (onUpdateOrder) {
      onUpdateOrder(orderDetails);
    }
  }

  function handleDeleteOrder () {
    if (onDeleteOrder) {
      onDeleteOrder(orderDetails.orderId);
    }
    console.log('Deleted order:', orderDetails.orderId);
  }

  function handlePaid () {
    console.log('Paid order details:', orderDetails);
  };

  function addItems () {
    setShowAddItems(!showAddItems);
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Details</Text>
        <Text style={styles.subtitle}>Order ID: {orderDetails.orderId}</Text>
        <Text style={styles.subtitle}>Table Number: {orderDetails.tableNumber}</Text>
        <Text style={styles.subtitle}>Order Time: {new Date(orderDetails.orderTime).toLocaleString()}</Text>
        <TouchableOpacity 
          style={styles.delete}
          onPress={handleDeleteOrder}
        >
          <Text style={styles.deleteText}>Delete Order</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsCont}>
        <Text style={styles.sectionTitle}>Items</Text>
        <FlatList
          data={orderDetails.items}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemPrice}>
                  ${item.price} x {item.quantity}
                </Text>
                <Text style={styles.itemTotal}>Total: ${item.price * item.quantity}</Text>
              </View>
              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => decrementItem(item.product_id)}
                >
                  <Text style={styles.actionButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.quantityInput}
                  value={item.quantity.toString()}
                  keyboardType="numeric"
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => incrementItem(item.product_id)}
                >
                  <Text style={styles.actionButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Quantity: {orderDetails.totalQuantity} items</Text>
          <Text style={styles.totalText}>Total Cost: ${orderDetails.totalCost}</Text>
        </View>

        {orderDetails.status !== 'Paid' && (
          <View style={styles.customizeActions}>
            <TouchableOpacity
              style={[styles.customizeButton, { backgroundColor: '#28A745' }]}
              onPress={addItems}
            >
              <Text style={styles.customizeButtonText}>Add Item</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.customizeButton, { backgroundColor: '#28A745' }]}
              onPress={updateOrder}
            >
              <Text style={styles.customizeButtonText}>Update Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.customizeButton, { backgroundColor: '#28A745' }]}
              onPress={handlePaid}
            >
              <Text style={styles.customizeButtonText}>Mark as Paid</Text>
            </TouchableOpacity>
          </View>
        )}
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
    height: '23%',
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
    height: '76%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  delete: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FF1717',
    width: 130,
    marginTop: 10
  },

  deleteText: {
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '800',
    textAlign: 'center'
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
    color: 'black'
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
    marginBottom: 15
  },

  customizeButton: {
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
