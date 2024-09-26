import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Food_View_Component from './Components/Food_View_Component';
import Order_Table_Calculation from './Components/Order_Table_Calculation';

export default function App() {
  return (
    <View style={styles.container}>
      <Order_Table_Calculation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
