import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Food_View_Component() {
  return (
    <View style={styles.container}>
      <View style={styles.mineview}>
        <View style={styles.img}>
          <Text style={styles.text}>Image Section</Text> {/* Added Text for visibility */}
        </View>

        <View style={styles.body}> 
          <View style={styles.name}>
            <Text style={styles.text}>Food Name</Text> {/* Added Text for visibility */}
          </View>

          <View style={styles.priceSection}>
            <View style={styles.price}>
              <Text style={styles.text}>Price</Text> {/* Added Text for visibility */}
            </View>
            <View style={styles.quantity}>
              <Text style={styles.text}>Quantity</Text> {/* Added Text for visibility */}
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" /> {/* Keep the status bar visible */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mineview: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    width: '100%', // Full width of the screen
  },

  img: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },

  body: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'column',
    width: '100%', // Full width of the screen
  },

  name: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },

  priceSection: {
    flex: 1,
    backgroundColor: 'pink',
    flexDirection: 'row',
    width: '100%', // Full width of the screen
  },
  
  price: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },

  quantity: {
    flex: 1,
    backgroundColor: 'brown',
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },

  text: {
    color: 'white', // Text color to be visible against backgrounds
    fontSize: 18, // Font size
  },
});
