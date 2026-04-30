import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Report_Template from '../Pages/Report_Template';
import { VictoryChart, VictoryLine, VictoryPie, VictoryAxis, VictoryTheme, VictoryVoronoiContainer, VictoryBar, VictoryArea } from 'victory-native';
import { width as screenWidth, moderateScale, height } from '../../Scaling';
import { useTheme } from '../../ThemeContext';

const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
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

  // Revenue Trend Data: Sorting filtered orders by time to show growth
  const sortedOrders = [...filteredOrders].sort((a, b) => new Date(a.orderTime) - new Date(b.orderTime));
  let cumulativeRevenue = 0;
  const revenueTrendData = sortedOrders.map(order => {
    cumulativeRevenue += order.totalPrice;
    const time = new Date(order.orderTime);
    return {
      x: `${time.getUTCHours()}:${String(time.getUTCMinutes()).padStart(2, '0')}`,
      y: cumulativeRevenue
    };
  });

  // Category Pie Data
  const categoryPieData = Object.entries(categorySales).map(([id, sales]) => ({
    x: `Cat ${id}`,
    y: sales
  }));

  const averageOrderValue = totalOrders ? (totalSales / totalOrders).toFixed(2) : "0.00";

  // Line Chart: Hourly Sales
  const lineChartData = hourlySalesData.map((sales, hour) => ({ x: hour, y: sales }));
  const maxHourlySales = Math.max(...hourlySalesData);

  // Bar Chart: Top 5 Products
  const topProductsData = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map(product => ({ 
      x: product.productName.length > 8 ? product.productName.slice(0, 8) + '..' : product.productName, 
      y: product.quantity 
    }));

  const pdfContent = `
    <h1>Daily Sales Report for ${selectedDateString}</h1>
    <p>Total Sales: $${totalSales.toFixed(2)}</p>
    <p>Orders: ${totalOrders}</p>
    <p>Avg Order: $${averageOrderValue}</p>
    <p>Revenue Trend calculated over ${filteredOrders.length} orders.</p>
  `;


  return (
    <Report_Template 
      title="Daily Sales Report" 
      reportPeriod={`for ${selectedDateString}`}
      setIsOverLayOn={setIsOverLayOn} 
      isOverLayOn={isOverLayOn} 
      pdfContent={pdfContent}
    >
      {/* SUMMARY STATS DASHBOARD */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { borderLeftColor: colors.primary }]}>
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>{totalOrders}</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: colors.secondary }]}>
          <Text style={styles.statLabel}>Total Sales</Text>
          <Text style={styles.statValue}>${totalSales.toFixed(2)}</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#3498db' }]}>
          <Text style={styles.statLabel}>Avg Order</Text>
          <Text style={styles.statValue}>${averageOrderValue}</Text>
        </View>
      </View>

      {/* HOURLY SALES LINE CHART */}
      <Text style={styles.chartTitle}>Hourly Sales Peak</Text>
      <View style={styles.chartWrapper}>
        <VictoryChart 
          theme={VictoryTheme.clean} 
          // Increase width to 0.9 or 1 because 0.6 is very narrow
          width={screenWidth * 0.9} 
          height={550}
          domain={{ y: [0, maxHourlySales > 0 ? maxHourlySales * 1.2 : 200] }}
        >
          <VictoryAxis 
            tickValues={[0, 4, 8, 12, 16, 20, 23]} 
            tickFormat={(t) => `${t}:00`} 
            style={{ 
              tickLabels: { fontSize: 15, padding: 5 },
              grid: { stroke: "#ececec" } 
            }} 
          />
          <VictoryAxis 
            dependentAxis 
            tickFormat={(x) => `$${x}`} 
            style={{ 
              tickLabels: { fontSize: 15, padding: 5 },
              grid: { stroke: "#ececec" }
            }}
          />
          <VictoryLine 
            data={lineChartData} 
            interpolation="monotoneX" 
            style={{ data: { stroke: colors.primary, strokeWidth: 3 } }} 
          />
        </VictoryChart>
      </View>

      {/* TOP SELLING ITEMS BAR CHART */}
      <Text style={styles.chartTitle}>Top Selling Items</Text>
      <View style={styles.chartWrapper}>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20} width={screenWidth * 0.85} height={moderateScale(250)}>
          <VictoryAxis style={{ tickLabels: { fontSize: 10, fontWeight: 'bold' } }} />
          <VictoryAxis dependentAxis />
          <VictoryBar 
            data={topProductsData} 
            style={{ data: { fill: colors.secondary, width: 25 } }} 
            labels={({ datum }) => `${datum.y}`}
          />
        </VictoryChart>
      </View>

      <View style={styles.rowLayout}>
        {/* REVENUE TREND AREA CHART */}
        <View style={{ width: '55%' }}>
          <Text style={styles.chartTitle}>Revenue Trend</Text>
          <View style={styles.chartWrapper}>
            <VictoryChart theme={VictoryTheme.material} width={screenWidth * 0.45} height={moderateScale(220)}>
              <VictoryAxis fixLabelOverlap style={{ tickLabels: { fontSize: 7 } }} />
              <VictoryArea 
                data={revenueTrendData} 
                interpolation="stepAfter"
                style={{ data: { fill: colors.primary, fillOpacity: 0.2, stroke: colors.primary, strokeWidth: 2 } }} 
              />
            </VictoryChart>
          </View>
        </View>

        {/* CATEGORY CONTRIBUTION PIE CHART */}
        <View style={{ width: '45%' }}>
          <Text style={styles.chartTitle}>Category Mix</Text>
          <View style={styles.pieWrapper}>
            <VictoryPie
              data={categoryPieData}
              colorScale={[colors.primary, colors.secondary, '#3498db', '#9b59b6', colors.warning]}
              width={screenWidth * 0.35}
              height={moderateScale(220)}
              innerRadius={40}
              labels={({ datum }) => `${datum.x}`}
              style={{ labels: { fontSize: 8, fontWeight: 'bold' } }}
            />
          </View>
        </View>
      </View>

    </Report_Template>
  );
}

const styles = StyleSheet.create({
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    width: '31%', 
    elevation: 2, 
    borderLeftWidth: 5 
  },
  statLabel: { fontSize: 12, color: '#7f8c8d', fontWeight: 'bold', textTransform: 'uppercase' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginTop: 5 },
  chartTitle: { fontSize: moderateScale(16), fontWeight: 'bold', marginTop: 15, color: '#34495e', marginLeft: 5 },
  chartWrapper: { backgroundColor: '#fff', borderRadius: 15, marginVertical: 8, paddingVertical: 10},
  pieWrapper: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, marginVertical: 8 },
  rowLayout: { flexDirection: 'row', justifyContent: 'space-between' }
});
