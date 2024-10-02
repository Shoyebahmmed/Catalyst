import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import Order_Chart_Component from './Order_Chart_Component';
import Charge_Button from './Charge_Button';
import Payment_Summary_Component from './Payment_Summary_Component';


export default function Customer_Order_Summary({orderSummary}) {
  const orderTableNum = 3;
  return (

    <View style={styles.container}>
      <View style={styles.orderTableContainer}>
        <Text style={styles.tableText}>Table   #{orderTableNum}</Text>
        <Image 
          source={require('../Components/images/chef.png')}
          style={styles.imageLoad}
        />
      </View>

      <View style={styles.orderSection}>
        <Text style={styles.sectionTitle}>Order</Text>
        
        <FlatList
          data={orderSummary}
          keyExtractor={item => item.product_Id.toString()}
          renderItem={({ item }) => (
            <Order_Chart_Component 
              quantity={item.quantity} 
              product_name={item.product_name} 
              price={item.price} 
            />
          )}
        />

      </View>

      <View style={styles.paymentSummaryContainer}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <Payment_Summary_Component price='120' />
          <View style={styles.chargeButtonContainer}>
            <Charge_Button />
          </View>

      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  tableText: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  imageLoad: {
    height: '30%',
    width: '30%'
  },

  orderTableContainer: {

  },
  orderSection: {

  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  paymentSummaryContainer: {

  },
  chargeButtonContainer: {

  },
});
