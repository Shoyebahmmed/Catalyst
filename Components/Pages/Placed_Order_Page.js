import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import Custom_Header_Component from '../Custom_Header_Component';
import Placed_Order_View from '../Placed_Order_Components/Placed_Order_View';
import Placed_Order_Detailed_View from '../Placed_Order_Components/Placed_Order_Detailed_View';
import Add_More_Items_View from '../Placed_Order_Components/Add_More_Items_View';

export default function Placed_Order_Page({ navigation }) {
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddItems, setShowAddItems] = useState(false);


  const [placedOrders, setPlacedOrders] = useState([
    {
      orderId: 1001,
      tableNumber: 5,
      items: [
        {
          product_id: 123456,
          product_name: 'Pizza',
          price: 12,
          quantity: 2,
        },
        {
          product_id: 223456,
          product_name: 'Burger',
          price: 8,
          quantity: 1,
        },
      ],
      totalQuantity: 3, 
      totalCost: 32, 
      orderTime: '2024-10-04T10:15:00Z',
      status: 'Paid',
    },
    {
      orderId: 1002,
      tableNumber: 3,
      items: [
        {
          product_id: 323456,
          product_name: 'Pasta',
          price: 10,
          quantity: 3,
        },
        {
          product_id: 423456,
          product_name: 'Coke',
          price: 3,
          quantity: 2,
        },
      ],
      totalQuantity: 5, 
      totalCost: 36, 
      orderTime: '2024-10-04T10:45:00Z',
      status: 'Unpaid',
    },
    {
      orderId: 1003,
      tableNumber: 2,
      items: [
        {
          product_id: 223456,
          product_name: 'Burger',
          price: 8,
          quantity: 3,
        },
        {
          product_id: 423456,
          product_name: 'Coke',
          price: 3,
          quantity: 1,
        },
        {
          product_id: 123456,
          product_name: 'Pizza',
          price: 12,
          quantity: 1,
        },
      ],
      totalQuantity: 5, 
      totalCost: 39, 
      orderTime: '2024-10-04T11:00:00Z',
      status: 'Paid',
    },
  ]);


  useEffect(() => {
    if(selectedOrder){
    const food_products = [
      { product_id: 123456, name: 'Pizza', img: require('../images/shrimp.jpg'), price: 12, categoryId: 2 },
      { product_id: 223456, name: 'Burger', img: require('../images/shrimp.jpg'), price: 8, categoryId: 1 },
      { product_id: 323456, name: 'Pasta', img: require('../images/shrimp.jpg'), price: 10, categoryId: 2 },
      { product_id: 423456, name: 'Coke', img: require('../images/shrimp.jpg'), price: 3, categoryId: 3 },
    ];


    const productsWithQuantity = food_products.map((product) => {
      const matchedItem = selectedOrder.items.find(
        (item) => item.product_id === product.product_id
      );
      return {
        ...product,
        quantity: matchedItem ? matchedItem.quantity : 0,
      };
    });
    setProducts(productsWithQuantity);
  }
  }, [selectedOrder, placedOrders])


  const toggleOverlay = () => {
    setShowAddItems(!showAddItems);
  };



  const updateOrderDetails = (updatedItems) => {
    const updatedOrders = placedOrders.map((order) => {
      if (order.orderId === selectedOrder.orderId) {
        const totalQuantity = updatedItems.reduce((total, item) => total + item.quantity, 0);
        const totalCost = updatedItems.reduce((total, item) => total + item.quantity * item.price, 0);
  
        return {
          ...order,
          items: updatedItems,
          totalQuantity,
          totalCost,
        };
      }
      return order;
    });
  

    const updatedSelectedOrder = updatedOrders.find(order => order.orderId === selectedOrder.orderId);
    
    setSelectedOrder(updatedSelectedOrder);
    setPlacedOrders(updatedOrders);

  };



  

  return (
    <View style={styles.container}>
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
            <Placed_Order_Detailed_View  
              showAddItems={showAddItems}
              setShowAddItems={setShowAddItems}
              selectedOrder={selectedOrder}
              onDeleteOrder={(orderId) => {
                console.log('Delete order with ID:', orderId); // --------------
              }} 
              onUpdateOrder={updateOrderDetails}
            />
          ) : (
            <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Select an order to view details</Text>
          </View>
          )}
      </View>
      
      </View>

      {
  showAddItems && selectedOrder && (
    <View style={styles.overlay}>
      <View style={styles.itemsBox}>
      <Add_More_Items_View
        products={products} 
        currentOrderItems={selectedOrder.items} 
        onDone={(updatedOrderItems) => {
          updateOrderDetails(updatedOrderItems);
          toggleOverlay(); 
        }}
      />
      </View>
    </View>
  )
}

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

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },

  itemsBox: {
    height: '70%',
    width: '70%',
    padding: 10
  },


});
