import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Category_View_Componetnt  ({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroller}>
      {categories.map(category => (
        <TouchableOpacity 
          key={category.categoryId} 
          onPress={() => setSelectedCategory(category.categoryId)}
          style={[
            styles.categoryItem,
            selectedCategory === category.categoryId && styles.categoryItemSelected
          ]}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryScroller: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 25,
  },
  categoryItem: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryItemSelected: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

