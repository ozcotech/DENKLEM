import React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import ThemedBackground from '../components/common/ThemedBackground';
import ScreenContainer from '../components/common/ScreenContainer';
import ScreenHeader from '../components/common/ScreenHeader';
import { useTheme } from '../theme/ThemeContext';

const LegislationScreen = () => {
  const theme = useTheme();
  const { width, height } = Dimensions.get('window');

  const source = {
    uri: 'bundle-assets://arabuluculuk-tarifesi-2025.pdf',
    cache: true,
  };

  const onLoadComplete = (numberOfPages: number, filePath: string) => {
    console.log(`PDF yüklendi: ${numberOfPages} sayfa`);
  };

  const onPageChanged = (page: number, numberOfPages: number) => {
    console.log(`Sayfa ${page}/${numberOfPages}`);
  };

  const onError = (error: any) => {
    console.log(`PDF yükleme hatası:`, error);
    Alert.alert(
      `Hata`,
      `PDF dosyası yüklenemedi. Lütfen daha sonra tekrar deneyin.`,
      [{ text: `Tamam` }]
    );
  };

  return (
    <ThemedBackground>
      {/* Header with ScreenHeader component */}
      <ScreenHeader 
        title="Arabuluculuk Tarifesi 2025"
        subtitle="Resmi tarife ve ücret çizelgesi"
      />
      
      <ScreenContainer paddingTop={10} marginBottom={110}>
        <View style={styles.pdfContainer}>
          <Pdf
            source={source}
            onLoadComplete={onLoadComplete}
            onPageChanged={onPageChanged}
            onError={onError}
            style={[styles.pdf, { width: width - 20, height: height - 280 }]}
            enablePaging={true}
            enableRTL={false}
            enableAnnotationRendering={true}
            horizontal={false}
            spacing={10}
            password={``}
            scale={1.0}
            minScale={0.5}
            maxScale={3.0}
            renderActivityIndicator={() => (
              <View style={styles.loadingContainer}>
                <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
                  {'PDF yükleniyor...'}
                </Text>
              </View>
            )}
          />
        </View>
      </ScreenContainer>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  pdfContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pdf: {
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
});

export default LegislationScreen;