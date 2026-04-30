import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

export default function Report_Template({ title, orderHistory, setIsOverLayOn, isOverLayOn, selectedDate = '2024-09-26' }) {
  if (!orderHistory || !Array.isArray(orderHistory)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No order history data available.</Text>
      </View>
    );
  }

  const selectedDateString = formatDate(new Date(selectedDate));
  const filteredOrders = orderHistory.filter(
    order => formatDate(order.orderTime) === selectedDateString
  );

  const hourlySalesData = Array(24).fill(0);
  let totalSales = 0;
  let totalOrders = 0;
  const categorySales = {};
  const productSales = {};

  filteredOrders.forEach(order => {
    const orderHour = new Date(order.orderTime).getUTCHours();
    hourlySalesData[orderHour] += order.totalPrice;
    totalSales += order.totalPrice;
    totalOrders += 1;

    if (order.categoryId) {
      categorySales[order.categoryId] = (categorySales[order.categoryId] || 0) + order.totalPrice;
    }

    if (Array.isArray(order.products)) {
      order.products.forEach(product => {
        const { productId, productName, quantity } = product;
        if (!productName) return;
        if (productSales[productId]) {
          productSales[productId].quantity += quantity;
        } else {
          productSales[productId] = { productName, quantity };
        }
      });
    }
  });

  const hourlyLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const averageOrderValue = totalOrders ? (totalSales / totalOrders).toFixed(2) : 0;

  const pieChartData = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map((product, index) => ({
      name: product.productName,
      sales: product.quantity,
      color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index % 5],
      legendFontColor: '#000',
      legendFontSize: 14,
    }));

  const generatePDF = async () => {
    let htmlContent = `
      <h1>${title} for ${selectedDateString}</h1>
      <p>Total Sales: $${totalSales.toFixed(2)}</p>
      <p>Number of Orders: ${totalOrders}</p>
      <p>Average Order Value: $${averageOrderValue}</p>
      <h2>Sales by Hour</h2>
      <ul>${hourlySalesData.map((sales, i) => `<li>${i}:00 - $${sales.toFixed(2)}</li>`).join('')}</ul>
    `;
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("PDF generation failed", error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title} for {selectedDateString}</Text>
        <Text style={styles.sectionTitle}>Total Sales: ${totalSales.toFixed(2)}</Text>
        <Text style={styles.sectionTitle}>Orders: {totalOrders} | Avg: ${averageOrderValue}</Text>

        <LineChart
          data={{ labels: hourlyLabels, datasets: [{ data: hourlySalesData }] }}
          width={1000} height={350}
          chartConfig={chartConfig}
          bezier
        />

        <Text style={styles.title}>Top 5 Products</Text>
        {pieChartData.length > 0 ? (
          <PieChart
            data={pieChartData}
            width={400} height={220}
            chartConfig={chartConfig}
            accessor="sales"
            backgroundColor="transparent"
            absolute
          />
        ) : <Text>No data</Text>}
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

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(9, 0, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  outerContainer: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  container: { flex: 1 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  saveButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, flex: 1, marginRight: 8, alignItems: 'center' },
  closeButton: { backgroundColor: '#FF6347', padding: 12, borderRadius: 8, flex: 1, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, marginVertical: 5 },
  errorText: { color: 'red' },
});