import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { moderateScale } from '../../Scaling';

export default function Report_Template({ 
  title, 
  reportPeriod, 
  setIsOverLayOn, 
  isOverLayOn,
  children,
  pdfContent // Pass HTML string specifically for the PDF
}) {
  const generatePDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html: pdfContent || `<h1>${title}</h1>` });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("PDF generation failed", error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title} {reportPeriod}</Text>
        
        {/* This is where the specific graphs from Daily/Weekly files will appear */}
        {children}
        
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
  outerContainer: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  container: { flex: 1 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  saveButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: moderateScale(8), flex: 1, marginRight: 8, alignItems: 'center' },
  closeButton: { backgroundColor: '#FF6347', padding: 12, borderRadius: moderateScale(8), flex: 1, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: moderateScale(16) },
  closeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: moderateScale(16) },
  title: { fontSize: moderateScale(22), fontWeight: 'bold', marginBottom: 10 },
  errorText: { color: 'red' }
});