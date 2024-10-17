import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Custom_Header_Component from '../Custom_Header_Component';
import Reports_Options from '../Generate Report Components/Reports_Oprtions';
import Generate_Daily_Report from '../Generate Report Components/Generate_Daily_Report';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function Generate_Reports_Page({ navigation }) {
  const [isOverLayOn, setIsOverLayOn] = useState(false);

  const orderHistory = [
    {
      orderId: 1,
      products: [
        { productId: 101, productName: "Pasta", quantity: 4, price: 9.65 },
        { productId: 102, productName: "Solo", quantity: 2, price: 6.29 },
        { productId: 103, productName: "Swarma", quantity: 4, price: 9.65 },
        { productId: 106, productName: "Snack Pack", quantity: 2, price: 6.29 }
      ],
      orderTime: '2024-09-26T14:24:00.123456Z',
      totalPrice: 47.18,
      categoryId: 2
    },
    {
      orderId: 21,
      products: [
        { productId: 101, productName: "Pasta", quantity: 4, price: 9.65 },
        { productId: 102, productName: "Solo", quantity: 2, price: 6.29 },
        { productId: 104, productName: "Pwan", quantity: 4, price: 9.65 },
        { productId: 105, productName: "Pizza", quantity: 2, price: 6.29 }
      ],
      orderTime: '2024-09-26T12:24:00.123456Z',
      totalPrice: 37.18,
      categoryId: 2
    },
    {
      orderId: 31,
      products: [
        { productId: 101, productName: "Pasta", quantity: 4, price: 9.65 },
        { productId: 102, productName: "Solo", quantity: 2, price: 6.29 },
        { productId: 103, productName: "Swarma", quantity: 4, price: 9.65 },
        { productId: 105, productName: "Pizza", quantity: 2, price: 6.29 }
      ],
      orderTime: '2024-09-26T15:24:00.123456Z',
      totalPrice: 87.18,
      categoryId: 2
    },
    {
      orderId: 2,
      products: [
        { productId: 201, quantity: 3, price: 13.56 }
      ],
      orderTime: '2024-09-28T06:34:00.123456Z',
      totalPrice: 40.68,
      categoryId: 1
    },
    {
      orderId: 3,
      products: [
        { productId: 301, quantity: 1, price: 17.42 },
        { productId: 302, quantity: 2, price: 15.23 }
      ],
      orderTime: '2024-09-20T09:53:00.123456Z',
      totalPrice: 47.88,
      categoryId: 5
    },
    {
      orderId: 4,
      products: [
        { productId: 401, quantity: 2, price: 19.72 }
      ],
      orderTime: '2024-09-30T18:01:00.123456Z',
      totalPrice: 39.44,
      categoryId: 3
    },
    {
      orderId: 5,
      products: [
        { productId: 501, quantity: 3, price: 11.83 },
        { productId: 502, quantity: 1, price: 7.59 }
      ],
      orderTime: '2024-09-17T15:24:00.123456Z',
      totalPrice: 43.08,
      categoryId: 2
    },

    {
      orderId: 46,
      products: [
        { productId: 4601, quantity: 2, price: 14.99 },
        { productId: 4602, quantity: 1, price: 9.49 }
      ],
      orderTime: '2024-10-09T12:30:00Z',
      totalPrice: 39.47,
      categoryId: 4
    },
    {
      orderId: 47,
      products: [
        { productId: 4701, quantity: 1, price: 10.00 },
        { productId: 4702, quantity: 4, price: 5.99 }
      ],
      orderTime: '2024-10-10T15:20:00Z',
      totalPrice: 33.96,
      categoryId: 3
    },
    {
      orderId: 48,
      products: [
        { productId: 4801, quantity: 3, price: 6.50 },
        { productId: 4802, quantity: 2, price: 8.75 }
      ],
      orderTime: '2024-10-11T09:45:00Z',
      totalPrice: 36.00,
      categoryId: 2
    },
    {
      orderId: 49,
      products: [
        { productId: 4901, quantity: 1, price: 12.99 },
        { productId: 4902, quantity: 3, price: 6.49 }
      ],
      orderTime: '2024-10-12T18:10:00Z',
      totalPrice: 32.46,
      categoryId: 5
    },
    {
      orderId: 50,
      products: [
        { productId: 5001, quantity: 2, price: 11.49 },
        { productId: 5002, quantity: 1, price: 7.99 }
      ],
      orderTime: '2024-10-13T10:25:00Z',
      totalPrice: 30.97,
      categoryId: 1
    },

    {
      orderId: 11,
      products: [
        { productId: 101, quantity: 3, price: 7.74 }
      ],
      orderTime: '2024-09-18T15:15:07.603273',
      totalPrice: 23.22,
      categoryId: 3
    },
    {
      orderId: 12,
      products: [
        { productId: 201, quantity: 2, price: 5.33 },
        { productId: 202, quantity: 5, price: 5.69 },
        { productId: 203, quantity: 2, price: 11.71 }
      ],
      orderTime: '2024-09-24T15:15:07.603313',
      totalPrice: 62.53,
      categoryId: 1
    },
    {
      orderId: 13,
      products: [
        { productId: 301, quantity: 1, price: 5.22 },
        { productId: 302, quantity: 2, price: 19.63 },
        { productId: 303, quantity: 4, price: 6.67 }
      ],
      orderTime: '2024-09-20T15:15:07.603331',
      totalPrice: 71.16,
      categoryId: 5
    },
    {
      orderId: 14,
      products: [
        { productId: 401, quantity: 1, price: 15.24 },
        { productId: 402, quantity: 3, price: 5.26 },
        { productId: 403, quantity: 1, price: 19.82 }
      ],
      orderTime: '2024-09-16T15:15:07.603347',
      totalPrice: 50.84,
      categoryId: 4
    },
    {
      orderId: 15,
      products: [
        { productId: 501, quantity: 4, price: 11.21 },
        { productId: 502, quantity: 4, price: 11.17 },
        { productId: 503, quantity: 5, price: 12.13 }
      ],
      orderTime: '2024-09-27T15:15:07.603359',
      totalPrice: 150.17,
      categoryId: 3
    },
    {
      orderId: 16,
      products: [
        { productId: 601, quantity: 3, price: 14.73 },
        { productId: 602, quantity: 4, price: 10.91 },
        { productId: 603, quantity: 5, price: 10.31 }
      ],
      orderTime: '2024-09-22T15:15:07.603372',
      totalPrice: 139.38,
      categoryId: 2
    },
    {
      orderId: 17,
      products: [
        { productId: 701, quantity: 5, price: 13.85 }
      ],
      orderTime: '2024-09-14T15:15:07.603380',
      totalPrice: 69.25,
      categoryId: 2
    },
    {
      orderId: 18,
      products: [
        { productId: 801, quantity: 1, price: 6.64 },
        { productId: 802, quantity: 2, price: 12.31 },
        { productId: 803, quantity: 3, price: 12.87 }
      ],
      orderTime: '2024-09-19T15:15:07.603393',
      totalPrice: 69.87,
      categoryId: 2
    },
    {
      orderId: 19,
      products: [
        { productId: 901, quantity: 3, price: 6.6 },
        { productId: 902, quantity: 2, price: 17.47 },
        { productId: 903, quantity: 5, price: 18.09 }
      ],
      orderTime: '2024-09-14T15:15:07.603406',
      totalPrice: 145.19,
      categoryId: 2
    },
    {
      orderId: 20,
      products: [
        { productId: 1001, quantity: 4, price: 13.8 },
        { productId: 1002, quantity: 4, price: 17.47 }
      ],
      orderTime: '2024-09-30T15:15:07.603416',
      totalPrice: 125.08,
      categoryId: 3
    }
  

  ];
  


  return (
    <View style={styles.container}>

      {isOverLayOn ? (

        <View style={styles.overlay}>

          <View style={styles.reportView}>
            <Generate_Daily_Report orderHistory={orderHistory} setIsOverLayOn={setIsOverLayOn}  isOverLayOn={isOverLayOn} />
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
