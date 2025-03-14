import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

export default function Generate_Weekly_Report({ orderHistory, setIsOverLayOn, isOverLayOn }) {
  const selectedDate = new Date('2024-10-19');

  if (!orderHistory || !Array.isArray(orderHistory)) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No order history data available.</Text>
      </View>
    );
  }

  const currentDayOfWeek = selectedDate.getDay();
  const weekStartDate = new Date(selectedDate);
  weekStartDate.setDate(weekStartDate.getDate() - currentDayOfWeek);

  const filteredOrders = orderHistory.filter(order => {
    const orderDate = new Date(order.orderTime);
    return orderDate >= weekStartDate && orderDate <= selectedDate;
  });

  const dailyHourlySales = Array(7).fill().map(() => Array(24).fill(0));
  const dayLabels = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  filteredOrders.forEach(order => {
    const orderDate = new Date(order.orderTime);
    const dayIndex = orderDate.getDay();
    const hour = orderDate.getUTCHours();

    // Only consider orders that fall within the desired week range.
    if (orderDate >= weekStartDate && orderDate <= selectedDate) {
      dailyHourlySales[dayIndex][hour] += order.totalPrice;
    }
  });

  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const colorPalette = [
    'rgba(10, 0, 255, 1)',  // Saturday
    'rgba(255, 0, 0, 1)',  // Sunday
    'rgba(200, 0, 255, 1)',  // Monday
    'rgba(0, 142, 39, 1)',  // Tuesday
    'rgba(255, 247, 0, 1)', // Wednesday
    'rgba(255, 0, 116, 1)',  // Thursday
    'rgba(0, 0, 0, 1)', // Friday
  ];

  const datasets = dailyHourlySales.map((daySales, index) => ({
    data: daySales,
    color: () => colorPalette[index], // Set line color for each day
    strokeWidth: 2,
    label: dayLabels[index],
    fillShadowGradient: colorPalette[index], // Use the same color for the fill gradient
    fillShadowGradientOpacity: 0.3, // Adjust the opacity to your liking
  }));

  const visibleDatasets = datasets.slice(0, currentDayOfWeek + 1);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`, // Adjust for label and axis colors
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '2',
      strokeWidth: '3',
      stroke: '#000000',
    },
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Weekly Sales Report</Text>
        <Text style={styles.sectionTitle}>Week of {formatDate(weekStartDate)}</Text>

        <LineChart
          data={{
            labels: labels,
            datasets: visibleDatasets,
          }}
          width={1000}
          height={400}
          chartConfig={chartConfig}
          bezier
        />

        <View style={styles.legendContainer}>
          {dayLabels.map((day, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: colorPalette[index] }]} />
              <Text style={styles.legendText}>{day}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.summary}>
          This report summarizes weekly sales from {formatDate(weekStartDate)} to {formatDate(selectedDate)}.
          The line chart shows hourly sales data for each day up to {dayLabels[currentDayOfWeek]}.
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
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
  summary: {
    fontSize: 14,
    marginVertical: 8,
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  categoryText: {
    fontSize: 16,
    marginVertical: 2,
  },
  legendContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingRight: 40
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius:15
  },
  legendText: {
    fontSize: 16,
  },
});
