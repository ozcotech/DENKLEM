import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ThemedButton from '../components/common/ThemedButton';
import ScreenContainer from '../components/common/ScreenContainer';

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

  // Navigation handlers
  const navigateToHome = () => {
    navigation.navigate('Main' as never);
  };

  const navigateToAbout = () => {
    navigation.navigate('Main', { screen: 'About' } as never);
  };

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
      <ScreenContainer paddingTop={50} marginBottom={140}>
        <View style={styles.centerContainer}>
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
        </View>
      </ScreenContainer>
      
      {/* Custom Tab Bar for DisputeTypeScreen */}
      <View style={styles.tabBarWrapper}>
        <View 
          style={[
            styles.tabBarContainer, 
            { 
              backgroundColor: theme.colors.card.background,
              borderTopColor: theme.colors.button.border,
              borderColor: theme.colors.button.border,
            }
          ]}
        >
          {/* Home Button */}
          <TouchableOpacity 
            style={[styles.tabButton]} 
            onPress={navigateToHome}
          >
            <View style={styles.tabButtonInner}>
              <Image
                source={require('../../assets/images/home-icon.png')}
                style={[styles.tabIcon, { tintColor: theme.colors.text.secondary }]}
              />
              <Text 
                style={[
                  styles.tabText, 
                  { color: theme.colors.text.secondary }
                ]}
              >
                Ana Sayfa
              </Text>
            </View>
          </TouchableOpacity>

          {/* Middle spacer - can be used for additional buttons */}
          <View style={styles.middleSpacer} />

          {/* Info Button (About Screen) */}
          <TouchableOpacity 
            style={[styles.tabButton]} 
            onPress={navigateToAbout}
          >
            <View style={styles.tabButtonInner}>
              <Image
                source={require('../../assets/images/info-icon.png')}
                style={[styles.tabIcon, { tintColor: theme.colors.text.secondary }]}
              />
              <Text 
                style={[
                  styles.tabText, 
                  { color: theme.colors.text.secondary }
                ]}
              >
                Hakkında
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  // Tab Bar Styles
  tabBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60, // moved up to leave space for footer
    alignItems: 'center',
    zIndex: 10,
  },
  tabBarContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 25, // Rounded corners for tab bar
    width: '85%',
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? 70 : 65, // Adjusted height
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 0, // Remove padding to allow button height control
    backgroundColor: '#fff', // fallback, will be overridden by theme
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    borderRadius: 10,
    height: '90%',
    overflow: 'hidden', // Prevents content from overflowing
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabButtonInner: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 6,
  },
  middleSpacer: {
    flex: 3, // This gives more space in the middle
  },
});

export default DisputeTypeScreen;