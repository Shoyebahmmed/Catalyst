import React from 'react';
import { useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Side_Bar_Options from './Side_Bar_Options';



export default function Side_Bar() {
  const [selectedOption, setSelectedOption] = useState(0);

  const navigation = useNavigation();

  const options = [
    { title: 'Dashboard', icon: require('../images/Side Bar Logo/dashboard.png') },
    { title: 'Take an Order', icon: require('../images/Side Bar Logo/list.png') },
    { title: 'Generate Reports', icon: require('../images/Side Bar Logo/chart.png') },
    { title: 'Manage Database', icon: require('../images/Side Bar Logo/data_manag.png') },
    { title: 'Settings', icon: require('../images/Side Bar Logo/settings.png') },
    { title: 'Log Out', icon: require('../images/Side Bar Logo/logout.png') },
];

    

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image 
            style={styles.title_logo}
            source={require('../images/logo.png')}
        />
        <Text style={styles.title_text}> CATALYST</Text>
      </View>

      <View style={styles.option_box}>
        {options.map((option, index) => (
          <Side_Bar_Options
              key={option.title}
              imageSource={option.icon}
              description={option.title}
              onSelect={() => {
                setSelectedOption(index); 
                navigation.navigate(option.title); 
              }}
              isSelected={selectedOption === index} 
          />
        ))}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 20,
  },

  title: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 40,
  },

  title_logo: {
    height: 100,
    width: 100,
  },

  title_text: {
    fontSize: 26,
    fontWeight: '100',
    marginLeft: -5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },

  option_box: {
  },


  
});
