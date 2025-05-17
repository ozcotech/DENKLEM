import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';

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

  // Butonları 2'li satırlara böl
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContentContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary, ...theme.typography.h1 }]}>
            Uyuşmazlık Türü
          </Text>
          <ScrollView
            contentContainerStyle={styles.scroll}
            style={styles.scrollViewStyle}
            showsVerticalScrollIndicator={false}
          >
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
        </View>
      </SafeAreaView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  mainContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    // fontSize and fontWeight removed, will be supplied by theme.typography.h1
    textAlign: 'center',
    marginBottom: 24,
  },
  scrollViewStyle: {
    width: '100%',
    flexGrow: 0,
  },
  scroll: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
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