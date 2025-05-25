import React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import ThemedBackground from '../components/common/ThemedBackground';
import { useTheme } from '../theme/ThemeContext';

const LegislationScreen = () => {
  const theme = useTheme();
  const { width, height } = Dimensions.get('window');

  // iOS için bundle-assets formatı
  const source = { 
    uri: 'bundle-assets://arabuluculuk-tarifesi-2025.pdf',
    cache: true 
  };

  const onLoadComplete = (numberOfPages: number) => {
    console.log(`PDF yüklendi: ${numberOfPages} sayfa`);
  };

  const onError = (error: any) => {
    console.log('PDF Error:', error);
    Alert.alert('Hata', 'PDF dosyası yüklenemedi. Lütfen daha sonra tekrar deneyin.');
  };

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: theme.colors.card.background }]}>
          <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
            Arabuluculuk Tarifesi 2025
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Resmi tarife ve ücret çizelgesi
          </Text>
        </View>
        
        <View style={styles.pdfContainer}>
          <Pdf
            source={source}
            onLoadComplete={onLoadComplete}
            onError={onError}
            style={[styles.pdf, { width: width - 20, height: height - 180 }]}
            enablePaging={true}
            spacing={10}
            scale={1.0}
            minScale={0.5}
            maxScale={3.0}
          />
        </View>
      </View>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  pdfContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
    backgroundColor: 'transparent',
  },
});

export default LegislationScreen;