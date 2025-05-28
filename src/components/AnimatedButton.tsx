import React, { useRef, ReactNode } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  StyleProp,
  View,
} from 'react-native';
import { LAYOUT_CONSTANTS } from '../constants/dimensions';

interface AnimatedButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;     
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode; 
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ title, onPress, style, textStyle, icon }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: LAYOUT_CONSTANTS.BUTTON.SCALE_PRESSED,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: LAYOUT_CONSTANTS.BUTTON.SCALE_NORMAL,
      friction: LAYOUT_CONSTANTS.BUTTON.ANIMATION_FRICTION,
      tension: LAYOUT_CONSTANTS.BUTTON.ANIMATION_TENSION,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.button, style, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.buttonContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: LAYOUT_CONSTANTS.BUTTON.BORDER_WIDTH,
    borderRadius: LAYOUT_CONSTANTS.BUTTON.BORDER_RADIUS,
    paddingVertical: LAYOUT_CONSTANTS.BUTTON.PADDING_VERTICAL,
    paddingHorizontal: LAYOUT_CONSTANTS.BUTTON.PADDING_HORIZONTAL_WITH_ICON,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: LAYOUT_CONSTANTS.BUTTON.SHADOW_OFFSET.WIDTH,
      height: LAYOUT_CONSTANTS.BUTTON.SHADOW_OFFSET.HEIGHT,
    },
    shadowOpacity: LAYOUT_CONSTANTS.BUTTON.SHADOW_OPACITY,
    shadowRadius: LAYOUT_CONSTANTS.BUTTON.SHADOW_RADIUS,
    elevation: LAYOUT_CONSTANTS.BUTTON.ELEVATION,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: LAYOUT_CONSTANTS.BUTTON.ICON_MARGIN_RIGHT,
  },
  text: {
    color: '#fff',
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.X_LARGE,
    fontWeight: 'bold',
  },
});

export default AnimatedButton;