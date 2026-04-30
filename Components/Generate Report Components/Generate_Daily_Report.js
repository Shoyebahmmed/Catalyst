import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Report_Template from '../Pages/Report_Template';
import { VictoryChart, VictoryLine, VictoryPie, VictoryAxis, VictoryTheme, VictoryVoronoiContainer } from 'victory-native';
import { width as screenWidth, moderateScale } from '../../Scaling';
import { useTheme } from '../../ThemeContext';

const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Generate_Daily_Report ({ orderHistory, setIsOverLayOn, isOverLayOn }) {
  const { colors } = useTheme();

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

  const averageOrderValue = totalOrders ? (totalSales / totalOrders).toFixed(2) : "0.00";
  const lineChartData = hourlySalesData.map((sales, hour) => ({ x: `${hour}:00`, y: sales }));
  const pieChartData = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map(product => ({ x: product.productName, y: product.quantity }));

  const pdfContent = `
    <h1>Daily Sales Report for ${selectedDateString}</h1>
    <p>Total Sales: $${totalSales.toFixed(2)}</p>
    <p>Orders: ${totalOrders}</p>
    <p>Avg Order: $${averageOrderValue}</p>
  `;


  return (
    <Report_Template 
      title="Daily Sales Report" 
      reportPeriod={`for ${selectedDateString}`}
      setIsOverLayOn={setIsOverLayOn} 
      isOverLayOn={isOverLayOn} 
      pdfContent={pdfContent}
    >
      {/* DAILY SPECIFIC VISUALS GO HERE */}
      <Text style={styles.sectionTitle}>Total Sales: ${totalSales.toFixed(2)}</Text>
      <Text style={styles.sectionTitle}>Orders: {totalOrders} | Avg: ${averageOrderValue}</Text>

      <View style={styles.chartWrapper}>
        <VictoryChart
          theme={VictoryTheme.material}
          width={screenWidth * 0.8}
          height={moderateScale(350)}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryAxis fixLabelOverlap />
          <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />
          <VictoryLine
            data={lineChartData}
            interpolation="catmullRom"
            style={{ data: { stroke: colors.primary, strokeWidth: 3 } }}
          />
        </VictoryChart>
      </View>

      <Text style={styles.title}>Top 5 Products</Text>
      <View style={styles.pieWrapper}>
        <VictoryPie
          data={pieChartData}
          colorScale={[colors.primary, colors.secondary, colors.warning, colors.error, colors.textHeader]}
          width={moderateScale(350)}
          height={moderateScale(300)}
          innerRadius={50}
        />
      </View>
    </Report_Template>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: moderateScale(18), marginVertical: 5, fontWeight: '600' },
  title: { fontSize: moderateScale(22), fontWeight: 'bold', marginTop: 20 },
  chartWrapper: { backgroundColor: '#fff', borderRadius: 15, marginVertical: 10, alignItems: 'center' },
  pieWrapper: { alignItems: 'center' }
});
