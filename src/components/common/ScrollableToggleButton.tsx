import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Vibration, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { LAYOUT_CONSTANTS } from '../../constants/dimensions';

interface ScrollableToggleButtonProps {
  onSelectionChange: (isAgreement: boolean) => void;
  onSelectionComplete: (isAgreement: boolean) => void;
  initialSelection?: boolean; // true for "Anlaşma", false for "Anlaşmama"
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const BUTTON_WIDTH = screenWidth * 0.9; // 90% of screen width
const BUTTON_HEIGHT = 100; // Reduced height for single text view
const SWIPE_THRESHOLD = BUTTON_HEIGHT * 0.3; // 30% of button height to trigger change

const ScrollableToggleButton: React.FC<ScrollableToggleButtonProps> = ({
  onSelectionChange,
  onSelectionComplete,
  initialSelection = true,
}) => {
  const theme = useTheme();
  const translateY = useSharedValue(initialSelection ? 0 : -BUTTON_HEIGHT);
  const currentSelection = useRef(initialSelection);

  // Haptic feedback function - using native Vibration as fallback
  const triggerHaptic = () => {
    try {
      // Simple vibration for haptic feedback
      Vibration.vibrate(50); // 50ms vibration
    } catch (error) {
      // Silently ignore if vibration is not available
      console.log('Vibration not available');
    }
  };

  // Handle selection change
  const handleSelectionChange = (newSelection: boolean) => {
    if (currentSelection.current !== newSelection) {
      currentSelection.current = newSelection;
      onSelectionChange(newSelection);
      triggerHaptic();
    }
  };

  // Handle direct tap selection
  const handleDirectSelection = (isAgreement: boolean) => {
    // Update visual state
    translateY.value = withSpring(isAgreement ? 0 : -BUTTON_HEIGHT);
    // Update selection and trigger completion (no haptic feedback for direct tap)
    currentSelection.current = isAgreement;
    onSelectionChange(isAgreement);
    onSelectionComplete(isAgreement);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startY = translateY.value;
    },
    onActive: (event, context: any) => {
      const newTranslateY = context.startY + event.translationY;
      
      // Constrain the movement
      if (newTranslateY >= -BUTTON_HEIGHT && newTranslateY <= 0) {
        translateY.value = newTranslateY;
      }
    },
    onEnd: (event) => {
      const finalPosition = translateY.value + event.velocityY * 0.1;
      
      if (finalPosition > -SWIPE_THRESHOLD) {
        // Snap to "Anlaşma" (top, position 0)
        translateY.value = withSpring(0);
        runOnJS(handleSelectionChange)(true);
      } else {
        // Snap to "Anlaşmama" (bottom, position -BUTTON_HEIGHT)
        translateY.value = withSpring(-BUTTON_HEIGHT);
        runOnJS(handleSelectionChange)(false);
      }
    },
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const agreementOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [-BUTTON_HEIGHT, -BUTTON_HEIGHT / 2, 0],
        [0.3, 0.7, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const disagreementOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [-BUTTON_HEIGHT, -BUTTON_HEIGHT / 2, 0],
        [1, 0.7, 0.3],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              backgroundColor: 'transparent',
              borderColor: theme.colors.button.border,
              shadowColor: theme.colors.button.shadow,
            }
          ]}
        >
          <Animated.View style={[styles.slidingContainer, animatedContainerStyle]}>
            {/* Anlaşma Button - Top */}
            <TouchableOpacity 
              style={styles.option}
              onPress={() => handleDirectSelection(true)}
              activeOpacity={0.8}
            >
              <Animated.View style={agreementOpacity}>
                <Text style={[styles.optionText, { color: theme.colors.button.text }]}>
                  Anlaşma ✅
                </Text>
              </Animated.View>
            </TouchableOpacity>
            
            {/* Anlaşmama Button - Bottom */}
            <TouchableOpacity 
              style={styles.option}
              onPress={() => handleDirectSelection(false)}
              activeOpacity={0.8}
            >
              <Animated.View style={disagreementOpacity}>
                <Text style={[styles.optionText, { color: theme.colors.button.text }]}>
                  Anlaşmama ❌
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      
      {/* Instruction Text - Outside button */}
      <View style={styles.instructionContainer}>
        <Text style={[styles.instructionText, { color: theme.colors.text.secondary }]}>
          Kaydırın ve ↕️ Tıklayın
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: LAYOUT_CONSTANTS.BUTTON.BORDER_RADIUS,
    borderWidth: LAYOUT_CONSTANTS.BUTTON.BORDER_WIDTH,
    overflow: 'hidden',
    position: 'relative',
    shadowOffset: {
      width: LAYOUT_CONSTANTS.BUTTON.SHADOW_OFFSET.WIDTH,
      height: LAYOUT_CONSTANTS.BUTTON.SHADOW_OFFSET.HEIGHT,
    },
    shadowOpacity: LAYOUT_CONSTANTS.BUTTON.SHADOW_OPACITY,
    shadowRadius: LAYOUT_CONSTANTS.BUTTON.SHADOW_RADIUS,
    elevation: LAYOUT_CONSTANTS.BUTTON.ELEVATION,
  },
  slidingContainer: {
    flexDirection: 'column', // Changed from 'row' to 'column'
    width: '100%',
    height: BUTTON_HEIGHT * 2, // Double height for sliding effect
  },
  option: {
    width: '100%', // Full width instead of half width
    height: BUTTON_HEIGHT, // Full height for each option (was BUTTON_HEIGHT / 2)
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  instructionContainer: {
    marginTop: 12, // Space between button and text
    width: '100%',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 12,
    opacity: 0.6,
  },
});

export default ScrollableToggleButton;
