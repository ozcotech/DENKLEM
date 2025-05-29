import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import ScreenContainer from '../components/common/ScreenContainer';
import ScreenHeader from '../components/common/ScreenHeader';
import ScrollableToggleButton from '../components/common/ScrollableToggleButton';
import { LAYOUT_CONSTANTS } from '../constants/dimensions';

const AgreementStatusScreen = () => {
  // ✅ Turned into a NativeStackNavigationProp for AgreementStatusScreen
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const [selectedAgreement, setSelectedAgreement] = useState<boolean>(true);

  const handleSelectionChange = (isAgreement: boolean) => {
    setSelectedAgreement(isAgreement);
  };

  const handleSelectionComplete = (isAgreement: boolean) => {
    // Directly navigate when selection is complete
    navigation.navigate('DisputeType', { isAgreement: isAgreement });
  };

  return (
    <ThemedBackground>
      <ScreenHeader title="Anlaşma Durumu" />
      <ScreenContainer paddingTop={10} marginBottom={110} scrollable={false}>
        <View style={styles.centerContainer}>
          
          <ScrollableToggleButton
            onSelectionChange={handleSelectionChange}
            onSelectionComplete={handleSelectionComplete}
            initialSelection={true}
          />
          
        </View>
      </ScreenContainer>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center', // Ensures vertical centering
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: LAYOUT_CONSTANTS.AGREEMENT_STATUS_SCREEN.CONTAINER.PADDING_HORIZONTAL,
    paddingTop: LAYOUT_CONSTANTS.AGREEMENT_STATUS_SCREEN.CONTAINER.PADDING_TOP,
  },
});

export default AgreementStatusScreen;