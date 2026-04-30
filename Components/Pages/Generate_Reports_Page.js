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
      orderId: 11,
      products: [
        { productId: 101, productName: "Pasta", quantity: 4, price: 9.65 },
        { productId: 102, productName: "Solo", quantity: 2, price: 6.29 },
        { productId: 103, productName: "Swarma", quantity: 4, price: 9.65 },
        { productId: 106, productName: "Snack Pack", quantity: 2, price: 6.29 }
      ],
      orderTime: "2024-10-12T14:24:00.123456Z",
      totalPrice: 47.18,
      categoryId: 2
    },
    {
      orderId: 12,
      products: [
        { productId: 101, productName: "Pasta", quantity: 3, price: 9.65 },
        { productId: 105, productName: "Pizza", quantity: 1, price: 6.29 }
      ],
      orderTime: "2024-10-13T11:15:00.123456Z",
      totalPrice: 35.59,
      categoryId: 1
    },
    {
      orderId: 13,
      products: [
        { productId: 102, productName: "Solo", quantity: 5, price: 6.29 },
        { productId: 103, productName: "Swarma", quantity: 3, price: 9.65 }
      ],
      orderTime: "2024-10-14T13:45:00.123456Z",
      totalPrice: 50.57,
      categoryId: 2
    },
    {
      orderId: 14,
      products: [
        { productId: 106, productName: "Snack Pack", quantity: 2, price: 6.29 },
        { productId: 104, productName: "Pwan", quantity: 4, price: 9.65 }
      ],
      orderTime: "2024-10-15T16:30:00.123456Z",
      totalPrice: 53.82,
      categoryId: 3
    },
    {
      orderId: 15,
      products: [
        { productId: 105, productName: "Pizza", quantity: 3, price: 6.29 },
        { productId: 101, productName: "Pasta", quantity: 2, price: 9.65 }
      ],
      orderTime: "2024-10-16T09:20:00.123456Z",
      totalPrice: 37.87,
      categoryId: 1
    },
    {
      orderId: 16,
      products: [
        { productId: 101, productName: "Pasta", quantity: 2, price: 9.65 },
        { productId: 103, productName: "Swarma", quantity: 1, price: 9.65 },
        { productId: 106, productName: "Snack Pack", quantity: 2, price: 6.29 }
      ],
      orderTime: "2024-10-17T14:10:00.123456Z",
      totalPrice: 41.53,
      categoryId: 2
    },
    {
      orderId: 17,
      products: [
        { productId: 105, productName: "Pizza", quantity: 4, price: 6.29 },
        { productId: 104, productName: "Pwan", quantity: 2, price: 9.65 }
      ],
      orderTime: "2024-10-18T18:45:00.123456Z",
      totalPrice: 47.88,
      categoryId: 3
    },
    {
      orderId: 18,
      products: [
        { productId: 102, productName: "Solo", quantity: 3, price: 6.29 },
        { productId: 103, productName: "Swarma", quantity: 2, price: 9.65 }
      ],
      orderTime: "2024-10-19T10:05:00.123456Z",
      totalPrice: 38.52,
      categoryId: 1
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
