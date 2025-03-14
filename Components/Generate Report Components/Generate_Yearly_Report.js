import React, {useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { captureRef } from 'react-native-view-shot';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

export default function Generate_Yearly_Report ({ orderHistory, setIsOverLayOn, isOverLayOn }) {
  const chartRef = useRef();

  if (!orderHistory || !Array.isArray(orderHistory)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No order history data available.</Text>
      </View>
    );
  }

  const selectedDateString = formatDate(new Date('2024-09-26'));
  const filteredOrders = orderHistory.filter(
    order => formatDate(order.orderTime) === selectedDateString
  );

  // Prepare data for hourly sales
  const hourlySalesData = Array(24).fill(0);
  let totalSales = 0;
  let totalOrders = 0;
  const categorySales = {};
  const productSales = {};

  filteredOrders.forEach(order => {
    const orderHour = new Date(order.orderTime).getUTCHours();
    hourlySalesData[orderHour] += order.totalPrice;

    // Update total sales and order count
    totalSales += order.totalPrice;
    totalOrders += 1;

    // Update category sales
    if (order.categoryId) {
      if (!categorySales[order.categoryId]) {
        categorySales[order.categoryId] = 0;
      }
      categorySales[order.categoryId] += order.totalPrice;
    }

    // Update product sales
    if (Array.isArray(order.products)) {
      order.products.forEach(product => {
        const { productId, productName, quantity } = product;
        if (!productName) return; // Skip if no name
        if (productSales[productId]) {
          productSales[productId].quantity += quantity;
        } else {
          productSales[productId] = {
            productName: productName,
            quantity: quantity,
          };
        }
      });
    }
  });



  const hourlyLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(9, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '1',
      strokeWidth: '2',
      stroke: '#04006a',
    },
  };

  // Prepare data for the PieChart
  const sortedProductSales = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity);
  const topProducts = sortedProductSales.slice(0, 5);

  const pieChartData = topProducts.map((product, index) => ({
    name: `${product.productName}`,
    sales: product.quantity,
    color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index % 5],
    legendFontColor: '#000',
    legendFontSize: 14,
  }));

  // Calculate average order value
  const averageOrderValue = totalOrders ? (totalSales / totalOrders).toFixed(2) : 0;


  

  const generatePDF = async () => {
    let htmlContent = `
      <h1>Daily Sales Report for ${selectedDateString}</h1>
      <p>Total Sales: $${totalSales.toFixed(2)}</p>
      <p>Number of Orders: ${totalOrders}</p>
      <p>Average Order Value: $${averageOrderValue}</p>
      <h2>Sales by Hour</h2>
      <ul>
        ${hourlySalesData.map((sales, index) => `<li>${index}:00 - $${sales.toFixed(2)}</li>`).join('')}
      </ul>
      <h2>Top 5 Product Sales</h2>
      <ul>
        ${pieChartData.map(product => `<li>${product.name}: ${product.sales} sold</li>`).join('')}
      </ul>
      <h2>Category Sales Breakdown:</h2>
      <ul>
        ${Object.entries(categorySales).map(([categoryId, sales]) => `<li>Category ${categoryId}: $${sales.toFixed(2)}</li>`).join('')}
      </ul>
    `;

    try {
      // Create a PDF from HTML content
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Share the PDF
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("PDF generation failed", error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Yearly Sales Report for {selectedDateString}</Text>

        <Text style={styles.sectionTitle}>Total Sales: ${totalSales.toFixed(2)}</Text>
        <Text style={styles.sectionTitle}>Number of Orders: {totalOrders}</Text>
        <Text style={styles.sectionTitle}>Average Order Value: ${averageOrderValue}</Text>

        <Text style={styles.sectionTitle}>Sales by Hour</Text>
        <LineChart
          data={{
            labels: hourlyLabels,
            datasets: [{ data: hourlySalesData }],
          }}
          width={1000}
          height={400}
          chartConfig={chartConfig}
          bezier
        />

        <Text style={styles.summary}>
          This report summarizes sales for {selectedDateString} by hour.
          The line chart above illustrates total sales throughout the day,
          helping you understand peak sales times and overall performance.
        </Text>

        <Text style={styles.title}>Top 5 Product Sales</Text>
        {pieChartData.length > 0 ? (
          <PieChart
            data={pieChartData}
            width={400}
            height={250}
            chartConfig={chartConfig}
            accessor="sales"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        ) : (
          <Text style={styles.errorText}>No product sales data available for the selected date.</Text>
        )}
        <Text style={styles.summary}>
          This chart shows the top 5 products with the highest sales.
        </Text>

        <Text style={styles.sectionTitle}>Category Sales Breakdown:</Text>
        {Object.entries(categorySales).map(([categoryId, sales]) => (
          <Text key={categoryId} style={styles.categoryText}>
            Category {categoryId}: ${sales.toFixed(2)}
          </Text>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={generatePDF}>
          <Text style={styles.buttonText}>Save as PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsOverLayOn(!isOverLayOn)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: '100%',
    width: '100%',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  container: {
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  categoryText: {
    fontSize: 16,
    marginVertical: 2,
  },
  summary: {
    fontSize: 14,
    marginVertical: 8,
    color: '#555',
  },
});
