import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import Order_Chart_Component from './Order_Chart_Component';
import Charge_Button from './Charge_Button';
import Payment_Summary_Component from './Payment_Summary_Component';


export default function Customer_Order_Summary({orderSummary, tableNumber}) {
  const [totalCost, setTotalCost] = useState(0);



  useEffect(() => {
    if (orderSummary && orderSummary.length > 0) {
      const total = orderSummary.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalCost(total);
    } else {
      setTotalCost(0);
    }
  }, [orderSummary]);


  return (

    <View style={styles.container}>
      <View style={styles.orderTableContainer}>
        <Text style={styles.tableText}>Table   #{tableNumber}</Text>
        <View style={styles.imageLoad}>
        <Image 
          source={require('../images/chef.png')}
          style={{height: '100%', height: '100%', resizeMode: 'contain'}}
        />
        </View>
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
        <Payment_Summary_Component price={totalCost} />
          <View style={styles.chargeButtonContainer}>
            <Charge_Button orderSummary={orderSummary} tableNumber={tableNumber}/>
          </View>

      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

  tableText: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  imageLoad: {
    height: '95%',
    width: '100%',
    alignItems: 'center',
  },

  orderTableContainer: {
    height: '30%',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  orderSection: {
    height: '55%',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 5,
    borderBottomWidth: 0.3,
    borderBottomColor: '#b0b0b0',
  },
  paymentSummaryContainer: {
    height: '15%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#b0b0b0',
  },
  chargeButtonContainer: {
    width: '50%',
    alignSelf: 'center',
  },
});
