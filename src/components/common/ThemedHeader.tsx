import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../theme/ThemeContext';

interface ThemedHeaderProps {
  showHomeButton?: boolean; // Optional prop to show/hide the Home button
}

const ThemedHeader: React.FC<ThemedHeaderProps> = ({ showHomeButton = true }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  return (
    <View style={styles.headerContainer}>
      {/* Empty left section */}
      <View style={styles.leftSection} />

      {/* Center section (for future titles, etc.) */}
      <View style={styles.centerSection} />

      {/* Right section (for Home button) */}
      <View style={styles.rightSection}>
        {showHomeButton && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Start')} 
            style={styles.homeButton}
          >
            <Image
              source={require('../../../assets/images/home-icon.png')}
              style={styles.homeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 65, 
    paddingHorizontal: 25, 
    height: 95, 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, 
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 3,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  homeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    borderRadius: 50, 
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5, 
  },
  homeIcon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff', 
  },
});

export default ThemedHeader;
