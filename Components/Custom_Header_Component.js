// CustomHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function  Custom_Header_Component ({ title, breadcrumb }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.breadcrumbText}>{breadcrumb}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: '15%',
    backgroundColor: '#f6f8fb', 
    paddingLeft: 50,
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#bec3cc', 
    paddingLeft: 20,
    marginTop: 5,

  },
  titleText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#676f7b',
    marginTop: 50,
    paddingBottom: 10,
    borderBottomColor: '#bec3cc',
    borderBottomWidth: 0.3,

  },
});

 
