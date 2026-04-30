import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Custom_Header_Component from '../Custom_Header_Component';
import Reports_Options from '../Generate Report Components/Reports_Oprtions';
import Generate_Daily_Report from '../Generate Report Components/Generate_Daily_Report';
import Generate_Weekly_Report from '../Generate Report Components/Generate_Weekly_Report';
import Generate_Monthly_Report from '../Generate Report Components/Generate_Monthly_Report';
import Generate_Yearly_Report from '../Generate Report Components/Generate_Yearly_Report';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function Generate_Reports_Page({ navigation }) {
  const [isOverLayOn, setIsOverLayOn] = useState(false);
  const [reportType, setReportType] = useState('daily');

  const orderHistory = [
    // --- DAILY DATA (Target: 2024-09-26) ---
    { orderId: 1, categoryId: 2, totalPrice: 45.50, orderTime: '2024-09-26T08:30:00Z', products: [{ productId: 101, productName: "Pasta", quantity: 2, price: 15.00 }, { productId: 105, productName: "Pizza", quantity: 1, price: 15.50 }] },
    { orderId: 2, categoryId: 1, totalPrice: 12.00, orderTime: '2024-09-26T09:15:00Z', products: [{ productId: 102, productName: "Burger", quantity: 1, price: 12.00 }] },
    { orderId: 3, categoryId: 3, totalPrice: 6.00, orderTime: '2024-09-26T10:00:00Z', products: [{ productId: 103, productName: "Coke", quantity: 2, price: 3.00 }] },
    { orderId: 4, categoryId: 2, totalPrice: 32.00, orderTime: '2024-09-26T12:00:00Z', products: [{ productId: 105, productName: "Pizza", quantity: 2, price: 16.00 }] },
    { orderId: 5, categoryId: 2, totalPrice: 25.00, orderTime: '2024-09-26T12:30:00Z', products: [{ productId: 101, productName: "Pasta", quantity: 2, price: 12.50 }] },
    { orderId: 6, categoryId: 1, totalPrice: 24.00, orderTime: '2024-09-26T13:15:00Z', products: [{ productId: 102, productName: "Burger", quantity: 2, price: 12.00 }] },
    { orderId: 7, categoryId: 3, totalPrice: 15.00, orderTime: '2024-09-26T14:00:00Z', products: [{ productId: 103, productName: "Coke", quantity: 5, price: 3.00 }] },
    { orderId: 8, categoryId: 2, totalPrice: 60.00, orderTime: '2024-09-26T18:00:00Z', products: [{ productId: 105, productName: "Pizza", quantity: 4, price: 15.00 }] },
    { orderId: 9, categoryId: 1, totalPrice: 36.00, orderTime: '2024-09-26T19:30:00Z', products: [{ productId: 102, productName: "Burger", quantity: 3, price: 12.00 }] },
    { orderId: 10, categoryId: 2, totalPrice: 18.00, orderTime: '2024-09-26T21:00:00Z', products: [{ productId: 101, productName: "Pasta", quantity: 1, price: 18.00 }] },
    { orderId: 11, categoryId: 2, totalPrice: 42.00, orderTime: '2024-09-26T12:45:00Z', products: [{ productId: 105, productName: "Pizza", quantity: 2, price: 21.00 }] },
    { orderId: 12, categoryId: 1, totalPrice: 12.50, orderTime: '2024-09-26T13:45:00Z', products: [{ productId: 102, productName: "Burger", quantity: 1, price: 12.50 }] },
    { orderId: 13, categoryId: 3, totalPrice: 9.00, orderTime: '2024-09-26T15:20:00Z', products: [{ productId: 103, productName: "Coke", quantity: 3, price: 3.00 }] },
    { orderId: 14, categoryId: 2, totalPrice: 22.00, orderTime: '2024-09-26T19:00:00Z', products: [{ productId: 101, productName: "Pasta", quantity: 2, price: 11.00 }] },
    { orderId: 15, categoryId: 1, totalPrice: 25.00, orderTime: '2024-09-26T20:15:00Z', products: [{ productId: 102, productName: "Burger", quantity: 2, price: 12.50 }] },

    // --- WEEKLY DATA (Target Range: Oct 12 - Oct 19) ---
    {
      orderId: 101,
      categoryId: 1,
      totalPrice: 55.00,
      orderTime: "2024-10-12T14:24:00Z",
      products: [{ productId: 102, productName: "Burger", quantity: 4, price: 13.75 }]
    },
    {
      orderId: 102,
      categoryId: 2,
      totalPrice: 35.50,
      orderTime: "2024-10-13T11:15:00Z",
      products: [{ productId: 101, productName: "Pasta", quantity: 2, price: 17.75 }]
    },
    {
      orderId: 103,
      categoryId: 2,
      totalPrice: 50.00,
      orderTime: "2024-10-14T13:45:00Z",
      products: [{ productId: 105, productName: "Pizza", quantity: 3, price: 16.66 }]
    },
    {
      orderId: 104,
      categoryId: 3,
      totalPrice: 21.00,
      orderTime: "2024-10-15T16:30:00Z",
      products: [{ productId: 103, productName: "Coke", quantity: 7, price: 3.00 }]
    },
    {
      orderId: 105,
      categoryId: 1,
      totalPrice: 38.00,
      orderTime: "2024-10-16T09:20:00Z",
      products: [{ productId: 102, productName: "Burger", quantity: 3, price: 12.66 }]
    },
    {
      orderId: 106,
      categoryId: 2,
      totalPrice: 41.50,
      orderTime: "2024-10-17T14:10:00Z",
      products: [{ productId: 101, productName: "Pasta", quantity: 3, price: 13.83 }]
    },
    {
      orderId: 107,
      categoryId: 3,
      totalPrice: 47.00,
      orderTime: "2024-10-18T18:45:00Z",
      products: [{ productId: 103, productName: "Coke", quantity: 15, price: 3.13 }]
    },
    {
      orderId: 108,
      categoryId: 1,
      totalPrice: 38.50,
      orderTime: "2024-10-19T10:05:00Z",
      products: [{ productId: 102, productName: "Burger", quantity: 3, price: 12.83 }]
    },
    {
      orderId: 109,
      categoryId: 2,
      totalPrice: 120.00,
      orderTime: "2024-10-19T19:00:00Z",
      products: [{ productId: 105, productName: "Pizza", quantity: 6, price: 20.00 }]
    },

    // --- YEARLY DATA (Scattered across 2024) ---
    {
      orderId: 201,
      categoryId: 2,
      totalPrice: 200.00,
      orderTime: "2024-01-15T12:00:00Z",
      products: [{ productId: 105, productName: "Pizza", quantity: 10, price: 20.00 }]
    },
    {
      orderId: 202,
      categoryId: 1,
      totalPrice: 150.00,
      orderTime: "2024-03-10T14:00:00Z",
      products: [{ productId: 102, productName: "Burger", quantity: 12, price: 12.50 }]
    },
    {
      orderId: 203,
      categoryId: 2,
      totalPrice: 300.00,
      orderTime: "2024-06-20T18:00:00Z",
      products: [{ productId: 101, productName: "Pasta", quantity: 15, price: 20.00 }]
    },
    {
      orderId: 204,
      categoryId: 3,
      totalPrice: 80.00,
      orderTime: "2024-08-05T15:00:00Z",
      products: [{ productId: 103, productName: "Coke", quantity: 26, price: 3.07 }]
    },
    {
      orderId: 205,
      categoryId: 2,
      totalPrice: 450.00,
      orderTime: "2024-09-01T12:00:00Z",
      products: [{ productId: 105, productName: "Pizza", quantity: 20, price: 22.50 }]
    },
    {
      orderId: 206,
      categoryId: 1,
      totalPrice: 95.00,
      orderTime: "2024-11-20T17:00:00Z",
      products: [{ productId: 102, productName: "Burger", quantity: 7, price: 13.57 }]
    },
    {
      orderId: 207,
      categoryId: 2,
      totalPrice: 320.00,
      orderTime: "2024-12-24T20:00:00Z",
      products: [{ productId: 105, productName: "Pizza", quantity: 15, price: 21.33 }]
    }
  ];

  const renderReportComponent = () => {
    switch (reportType) {
      case 'daily':
        return <Generate_Daily_Report orderHistory={orderHistory} setIsOverLayOn={setIsOverLayOn} isOverLayOn={isOverLayOn} />;
      case 'weekly':
        return <Generate_Weekly_Report orderHistory={orderHistory} setIsOverLayOn={setIsOverLayOn} isOverLayOn={isOverLayOn} />;
      case 'monthly':
        return <Generate_Monthly_Report orderHistory={orderHistory} setIsOverLayOn={setIsOverLayOn} isOverLayOn={isOverLayOn} />;
       case 'yearly':
        return <Generate_Yearly_Report orderHistory={orderHistory} setIsOverLayOn={setIsOverLayOn} isOverLayOn={isOverLayOn} />;
      default:
        return null;
    }
  };
  


  return (
    <View style={styles.container}>

      {isOverLayOn ? (

        <View style={styles.overlay}>

          <View style={styles.reportView}>
            {renderReportComponent()}
          </View>
        </View>


      ) : (
        <View style={styles.notOverlay}> 
        <View style={styles.mid_sec}>
        <View style={styles.header}>
          <Custom_Header_Component title="Generate Reports" />
        </View>

        <View style={styles.body}>

          <View style={styles.genRepo}>

          </View>

          <View style={styles.genOption}>
            <Reports_Options 
              order_history={orderHistory} 
              setIsOverLayOn={setIsOverLayOn}
              isOverLayOn={isOverLayOn}
              setReportType={setReportType}
            />
          </View>

        </View>

        </View>

        <View style={styles.right_side}>
        <View style={styles.imageLoad}>
        <Image 
          source={require('../images/report.png')}
          style={{height: '100%', height: '100%', resizeMode: 'contain'}}
        />
        </View>
        </View>
        </View>
      )}

        
      
        
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
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
    elevation: 10,
  },

  reportView: {
    backgroundColor: '#fff',
    height: '85%',
    width: '90%',
    borderRadius: 25,
    padding: 20,
  },

  notOverlay: {
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

  body: {
    height: '85%',
    width: '100%',
  },

  genRepo: {
    height: '60%',
    width: '100%',
    backgroundColor: '#fff'
  },

  genOption: {
    height: '40%',
    width: '100%',
    backgroundColor: 'pink',
  },

  right_side: {
    height: '100%',
    width: '30%',
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageLoad: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },


});
