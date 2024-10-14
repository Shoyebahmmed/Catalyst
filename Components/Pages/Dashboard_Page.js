import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Custom_Header_Component from '../Custom_Header_Component';
import Category_View from '../Dashboard Components/Category_View';
import Product_List_View from '../Dashboard Components/Product_List_View';

export default function Dashboard_Page({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([
    {
      categoryId: 1,
      name: "Pasta",
      description: "Delicious Italian pasta dishes, including various types like spaghetti, fettuccine, and penne, topped with rich sauces and fresh ingredients that transport you to Italy.",
      image: require('../images/breakfast.jpg') 
    },
    {
      categoryId: 2,
      name: "Beverages",
      description: "Refreshing drinks that cater to every taste, including sodas, juices, smoothies, and cocktails, perfect for quenching your thirst and complementing your meals.",
      image: require('../images/shrimp.jpg') 
    },
    {
      categoryId: 3,
      name: "Desserts",
      description: "Indulge in a variety of sweet treats that include cakes, ice creams, pastries, and more, each crafted to satisfy your sweet tooth and make every meal memorable.",
      image: require('../images/chef.png') 
    },
    {
      categoryId: 4,
      name: "Salads",
      description: "Healthy salads made with a mix of fresh vegetables, greens, and dressings, offering a light yet satisfying meal option for those who appreciate nutritious eating.",
      image: require('../images/report.png') 
    },
    {
      categoryId: 5,
      name: "Snacks",
      description: "Tasty snacks for every craving, from crispy chips and savory nuts to sweet treats, ensuring there's something for everyone at any time of the day.",
      image: require('../images/data.png') 
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.mid_sec}>
        <View style={styles.header}>
          <Custom_Header_Component title="Dashboard" />
        </View>
        <View style={styles.categories}>
          <Category_View categories={categories} setSelectedCategory={setSelectedCategory} />
        </View>
      </View>

      <View style={styles.right_side}>
        {selectedCategory ? (
          <View style={styles.listView}>
            <Product_List_View image={selectedCategory.image} category={selectedCategory} />
          </View>

        ) : (
          <View style={styles.imageLoad}>
            <Image 
              source={require('../images/eating_together.png')}
              style={styles.placeholderImage}
            />
            <Text style={styles.noCategoryText}>No items to display.{"\n"}Select a category to continue.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  mid_sec: {
    height: '100%',
    width: '60%',
    backgroundColor: '#f6f8fb',
  },
  header: {
    height: '15%',
    justifyContent: 'center',
  },
  categories: {
    width: '100%',
    height: '85%',
    flex: 1,
  },
  right_side: {
    height: '100%',
    width: '40%',
    backgroundColor: '#fff',
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listView: {
    height: '100%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLoad: {
    height: '50%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  noCategoryText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
