import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ThemedHeader from '../components/common/ThemedHeader';

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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { isAgreement } = route.params as { isAgreement: boolean };
  const theme = useTheme();

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
      <ThemedHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
          Uyuşmazlık Türü
        </Text>
        
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
      </ScrollView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 70, // Adjust this value based on the height of your header
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
    flexGrow: 1, 
    paddingTop: 10,
    paddingBottom: 80,
    width: '100%',
    minHeight: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    width: Dimensions.get('window').width * 0.40,
    height: 90,
    marginHorizontal: Dimensions.get('window').width * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default DisputeTypeScreen;