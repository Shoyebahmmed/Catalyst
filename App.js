import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Side_Bar from './Components/Side Bar Component/Side_Bar';
import Dashboard_Page from './Components/Pages/Dashboard_Page';
import Take_an_Order_Page from './Components/Pages/Take_an_Order_Page';
import Generate_Reports_Page from './Components/Pages/Generate_Reports_Page';
import Manage_Database_Page from './Components/Pages/Manage_Database_Page';
import Settings_Page from './Components/Pages/Settings_Page';
import { Custom_Header_Component } from './Components/Custom_Header_Component';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.sideBar}>
          <Side_Bar />
        </View>

        <View style={styles.rightSide}>
          <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen name="Dashboard" component={Dashboard_Page} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Take an Order" component={Take_an_Order_Page} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Generate Reports" component={Generate_Reports_Page} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Manage Database" component={Manage_Database_Page} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="Settings" component={Settings_Page} options={{ headerShown: false , animationEnabled: false}} />
          </Stack.Navigator>
        </View>
      </View>
        
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  sideBar: {
    width: '25%',
  },

  rightSide: {
    width: '75%',
  },

  
});
