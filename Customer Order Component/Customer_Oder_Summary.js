import react from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Order_Chart_Component from './Order_Chart_Component';
import Charge_Button from './Charge_Button';
import Payment_Summary_Component from './Payment_Summary_Component';


export default function Customer_Oder_Summary() {

  return (
    <View>
    <View style={{padding: 20, paddingBottom: 40}} >
          <Text style = {{fontWeight: 'bold', fontSize: 24, paddingBottom:20}} >Order</Text>
          <Order_Chart_Component quantity='2'product_name='FFFU' price= '20'/>
          <Order_Chart_Component quantity='2'product_name='sdhfbs' price= '20'/>
          <Order_Chart_Component quantity='2'product_name='sdhfbs' price= '20'/>
        </View>
        <View style={{padding: 20}}>
          <Text style = {{fontWeight: 'bold', fontSize: 24, paddingBottom:20}} >Payment Summary</Text>
          <Payment_Summary_Component price='120'/>
        </View>
        <View>
          <Charge_Button />
        </View>
    </View>

  );
};