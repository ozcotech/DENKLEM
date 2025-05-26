import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Added import

const disputeTypes = [
  'İşçi-İşveren',
  'Ticari',
  'Tüketici',
  'Ortaklığın Giderilmesi',
  'Kira, Komşu Hakkı, Kat Mülkiyeti',
  'Diğer',
  'Aile',
];

const DisputeTypeScreen = () => {
  // ✅ Stack navigation'a çevrildi
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { isAgreement } = route.params as { isAgreement: boolean };
  const theme = useTheme();
  const insets = useSafeAreaInsets(); // Added insets

  // Function to split the dispute types into rows of two
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
      <View style={[styles.header, { marginTop: insets.top + 10 }]}>
        <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
          Uyuşmazlık Türü
        </Text>
      </View>
      <ScreenContainer paddingTop={10} marginBottom={140}>
        <View style={styles.centerContainer}>
          {/* <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
            Uyuşmazlık Türü
          </Text> */}
          
          {rows.map((row, i) => (
            <View style={styles.row} key={i}>
              {row.map((type, j) => (
                <ThemedButton
                  key={type}
                  title={type}
                  onPress={() => navigation.navigate('Input', { isAgreement, disputeType: type })}
                  style={styles.button}
                />
              ))}
              {/* If there's a single item in the row, complete it with an invisible View */}
              {row.length === 1 && <View style={[styles.button, { opacity: 0 }]} />}
            </View>
          ))}
        </View>
      </ScreenContainer>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  header: { // Added header style
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Example background, adjust as needed
    width: '85%',
    alignSelf: 'center',
  },
  headerText: { // Added headerText style
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '7.5%', 
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    // Bu stil artık headerText tarafından yönetiliyor, isterseniz kaldırılabilir.
  },
  row: {
    flexDirection: 'row',
    width: '100%', 
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    width: Dimensions.get('window').width * 0.3778, 
    height: 90,
    marginHorizontal: Dimensions.get('window').width * 0.0236,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default DisputeTypeScreen;