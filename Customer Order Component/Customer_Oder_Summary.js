import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Order_Chart_Component from './Order_Chart_Component';
import Charge_Button from './Charge_Button';
import Payment_Summary_Component from './Payment_Summary_Component';
import Order_Table_component from './Order_Table_component';

export default function Customer_Oder_Summary() {

  return (

    <View style={styles.container}>
      <View style={styles.orderTableContainer}>
        <Order_Table_component table_number='3' />
      </View>

      <View style={styles.orderSection}>
        <Text style={styles.sectionTitle}>Order</Text>
        <Order_Chart_Component quantity='2' product_name='FFFU' price='20' />
        <Order_Chart_Component quantity='2' product_name='sdhfbs' price='20' />
        <Order_Chart_Component quantity='2' product_name='sdhfbs' price='20' />
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
    justifyContent: 'space-between', // Pushes content apart
  },
  orderTableContainer: {
    // Add any specific styling needed for the order table here
  },
  orderSection: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 20,
  },
  paymentSummaryContainer: {
    padding: 20,
 // For extra spacing before the bottom of the screen
  },
  chargeButtonContainer: {
    paddingTop: 40
    // This will stick to the bottom due to flex behavior
  },
});
