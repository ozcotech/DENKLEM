import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedCard } from './ThemedCard';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  useCard?: boolean; // Use ThemedCard for StartScreen
  isScrollable?: boolean; // For screens with scroll content
  marginBottom?: number; // Custom margin bottom
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ 
  title, 
  subtitle, 
  useCard = false, // Default to normal header
  isScrollable = false, // Default to non-scrollable
  marginBottom = 10 // Default margin bottom
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const content = (
    <>
      <Text style={[styles.headerText, { color: theme.colors.text.primary }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          {subtitle}
        </Text>
      )}
    </>
  );

  if (useCard) {
    return (
      <View style={[
        styles.headerContainer, 
        { marginTop: insets.top + 10, marginBottom: marginBottom },
        !isScrollable && styles.absolutePosition // Only absolute for non-scrollable (StartScreen)
      ]}>
        <ThemedCard style={styles.headerCard}>
          {content}
        </ThemedCard>
      </View>
    );
  }

  return (
    <View style={[styles.header, { marginTop: insets.top + 10, marginBottom: marginBottom }]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  absolutePosition: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    width: '100%',
  },
  headerCard: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '90%',
    alignSelf: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default ScreenHeader;