import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { ThemedCard } from './ThemedCard';
import { LAYOUT_CONSTANTS } from '../../constants/dimensions';

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
  marginBottom = LAYOUT_CONSTANTS.SCREEN_HEADER.DEFAULT_MARGIN_BOTTOM // Default margin bottom
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
        { 
          marginTop: insets.top + LAYOUT_CONSTANTS.SCREEN_HEADER.TOP_OFFSET, 
          marginBottom: marginBottom 
        },
        !isScrollable && styles.absolutePosition // Only absolute for non-scrollable (StartScreen)
      ]}>
        <ThemedCard style={styles.headerCard}>
          {content}
        </ThemedCard>
      </View>
    );
  }

  return (
    <View style={[
      styles.header, 
      { 
        marginTop: insets.top + LAYOUT_CONSTANTS.SCREEN_HEADER.TOP_OFFSET, 
        marginBottom: marginBottom 
      }
    ]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: LAYOUT_CONSTANTS.SCREEN_HEADER.DEFAULT_MARGIN_BOTTOM,
  },
  absolutePosition: {
    position: 'absolute',
    top: 0,
    zIndex: LAYOUT_CONSTANTS.SCREEN_HEADER.Z_INDEX,
    width: '100%',
  },
  headerCard: {
    width: LAYOUT_CONSTANTS.SCREEN_HEADER.WIDTH_PERCENTAGE,
    padding: LAYOUT_CONSTANTS.SCREEN_HEADER.PADDING,
    borderRadius: LAYOUT_CONSTANTS.SCREEN_HEADER.BORDER_RADIUS,
    alignItems: 'center',
  },
  header: {
    padding: LAYOUT_CONSTANTS.SCREEN_HEADER.PADDING,
    borderRadius: LAYOUT_CONSTANTS.SCREEN_HEADER.BORDER_RADIUS,
    marginBottom: LAYOUT_CONSTANTS.SCREEN_HEADER.DEFAULT_MARGIN_BOTTOM,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: LAYOUT_CONSTANTS.SCREEN_HEADER.WIDTH_PERCENTAGE,
    alignSelf: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.XX_LARGE,
    fontWeight: 'bold',
    marginBottom: LAYOUT_CONSTANTS.SPACING.XS,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.MEDIUM,
    fontStyle: 'italic',
  },
});

export default ScreenHeader;