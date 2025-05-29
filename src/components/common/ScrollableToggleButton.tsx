import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
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

const { width: screenWidth } = Dimensions.get('window');
const BUTTON_WIDTH = screenWidth * 0.9; // 90% of screen width
const BUTTON_HEIGHT = LAYOUT_CONSTANTS.AGREEMENT_STATUS_SCREEN.TOGGLE_BUTTON.HEIGHT; // Use standard height from constants
const SWIPE_THRESHOLD = BUTTON_HEIGHT * 0.3; // 30% of button height to trigger change

const ScrollableToggleButton: React.FC<ScrollableToggleButtonProps> = ({
  onSelectionChange,
  onSelectionComplete,
  initialSelection = true,
}) => {
  const theme = useTheme();
  const translateY = useSharedValue(initialSelection ? 0 : -BUTTON_HEIGHT);
  const currentSelection = useRef(initialSelection);

  // Scale animations using Reanimated
  const scaleAgreement = useSharedValue(1);
  const scaleDisagreement = useSharedValue(1);
  const mainButtonScale = useSharedValue(1);

  const handlePressIn = (isAgreement: boolean) => {
    const scaleValue = isAgreement ? scaleAgreement : scaleDisagreement;
    mainButtonScale.value = withSpring(LAYOUT_CONSTANTS.BUTTON.SCALE_PRESSED, {
      damping: 15,
      stiffness: 150,
    });
    scaleValue.value = withSpring(LAYOUT_CONSTANTS.BUTTON.SCALE_PRESSED, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = (isAgreement: boolean) => {
    const scaleValue = isAgreement ? scaleAgreement : scaleDisagreement;
    mainButtonScale.value = withSpring(LAYOUT_CONSTANTS.BUTTON.SCALE_NORMAL, {
      damping: 15,
      stiffness: 150,
    });
    scaleValue.value = withSpring(LAYOUT_CONSTANTS.BUTTON.SCALE_NORMAL, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handleSelectionChange = (newSelection: boolean) => {
    if (currentSelection.current !== newSelection) {
      currentSelection.current = newSelection;
      onSelectionChange(newSelection);
    }
  };

  const handleDirectSelection = (isAgreement: boolean) => {
    translateY.value = withSpring(isAgreement ? 0 : -BUTTON_HEIGHT);
    currentSelection.current = isAgreement; // Ensure this is set
    onSelectionChange(isAgreement); // Ensure this is called
    onSelectionComplete(isAgreement);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startY = translateY.value;
    },
    onActive: (event, context: any) => {
      const newTranslateY = context.startY + event.translationY;
      if (newTranslateY >= -BUTTON_HEIGHT && newTranslateY <= 0) {
        translateY.value = newTranslateY;
      }
    },
    onEnd: (event) => {
      const finalPosition = translateY.value + event.velocityY * 0.1;
      if (finalPosition > -SWIPE_THRESHOLD) {
        translateY.value = withSpring(0);
        runOnJS(handleSelectionChange)(true);
      } else {
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

  const mainButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: mainButtonScale.value }],
    };
  });

  const agreementAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [-BUTTON_HEIGHT, -BUTTON_HEIGHT / 2, 0],
        [0.3, 0.7, 1],
        Extrapolate.CLAMP
      ),
      transform: [{ scale: scaleAgreement.value }],
    };
  });

  const disagreementAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [-BUTTON_HEIGHT, -BUTTON_HEIGHT / 2, 0],
        [1, 0.7, 0.3],
        Extrapolate.CLAMP
      ),
      transform: [{ scale: scaleDisagreement.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View // This is reanimated's Animated.View for the main button container
          style={[
            styles.buttonContainer,
            {
              backgroundColor: 'transparent', // Or theme.colors.button.background if needed
              borderColor: theme.colors.button.border,
              shadowColor: theme.colors.button.shadow,
            },
            mainButtonAnimatedStyle, // Add main button scale animation
          ]}
        >
          <Animated.View style={[styles.slidingContainer, animatedContainerStyle]}>
            {/* Anlaşma Button - Top */}
            <TouchableWithoutFeedback
              onPress={() => handleDirectSelection(true)}
              onPressIn={() => handlePressIn(true)}
              onPressOut={() => handlePressOut(true)}
            >
              <Animated.View
                style={[
                  styles.option,
                  agreementAnimatedStyle, // Combined opacity and scale from reanimated
                ]}
              >
                <Text style={[styles.optionText, { color: theme.colors.button.text }]}>
                  Anlaşma ✅
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>

            {/* Anlaşmama Button - Bottom */}
            <TouchableWithoutFeedback
              onPress={() => handleDirectSelection(false)}
              onPressIn={() => handlePressIn(false)}
              onPressOut={() => handlePressOut(false)}
            >
              <Animated.View
                style={[
                  styles.option,
                  disagreementAnimatedStyle, // Combined opacity and scale from reanimated
                ]}
              >
                <Text style={[styles.optionText, { color: theme.colors.button.text }]}>
                  Anlaşmama ❌
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      {/* Instruction Text - Outside button */}
      <View style={styles.instructionContainer}>
        <Text style={[styles.instructionText, { color: theme.colors.text.secondary }]}>
          ↕️{'\n'} Yukarı Kaydırın{'\n'}Tıklayın
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
    flexDirection: 'column',
    width: '100%',
    height: BUTTON_HEIGHT * 2,
  },
  option: {
    width: '100%',
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 30, 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  instructionContainer: {
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
});

export default ScrollableToggleButton;
