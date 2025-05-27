import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Removed Dimensions
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import ScreenHeader from '../components/common/ScreenHeader';

const disputeTypes = [
  `İşçi-İşveren`,
  `Ticari`,
  `Tüketici`,
  `Ortaklığın Giderilmesi`,
  `Kira, Komşu Hakkı, Kat Mülkiyeti`,
  `Diğer`,
  `Aile`,
];

const DisputeTypeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { isAgreement } = route.params as { isAgreement: boolean };
  const theme = useTheme();

  const getRows = () => {
    let rows: string[][] = [];
    for (let i = 0; i < disputeTypes.length; i += 2) {
      rows.push(disputeTypes.slice(i, i + 2));
    }
    return rows;
  };
  const rows = getRows();

  return (
    <ThemedBackground>
      <ScreenHeader 
        title="Uyuşmazlık Türü" 
        useCard={true} 
        isScrollable={true} 
        marginBottom={20} 
      />

      <ScreenContainer paddingTop={10} marginBottom={120} scrollable={true}>
        <View style={styles.centerContainer}>
          {rows.map((row, i) => (
            <View style={styles.rowButtonContainer} key={i}>
              {row.map((type) => (
                <ThemedButton
                  key={type}
                  title={type}
                  onPress={() => navigation.navigate('Input', { isAgreement, disputeType: type })}
                  style={styles.halfButton}
                  textStyle={styles.smallButtonText}
                />
              ))}
              {row.length === 1 && <View style={[styles.halfButton, { opacity: 0 }]} />}
            </View>
          ))}
        </View>
      </ScreenContainer>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '5%', // Reduced from 7.5% to match tabbar width
    paddingTop: 20, 
  },
  rowButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  halfButton: {
    flex: 1,
    margin: 5,
    height: 100, 
    minHeight: 90, 
    padding: 5,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButtonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default DisputeTypeScreen;