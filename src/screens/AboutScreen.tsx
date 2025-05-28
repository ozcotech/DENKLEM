import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Share, Image } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import { ThemedCard } from '../components/common/ThemedCard';
import ThemedButton from '../components/common/ThemedButton';
import ScreenHeader from '../components/common/ScreenHeader';
import { aboutData } from '../constants/aboutData';
import ScreenContainer from '../components/common/ScreenContainer';
import { LAYOUT_CONSTANTS } from '../constants/dimensions';

const AboutScreen = () => {
  const theme = useTheme();

  const handleEmailPress = async () => {
    try {
      await Clipboard.setString(aboutData.contact.email);
      Alert.alert(
        `Bilgi`, 
        `E-posta adresi panoya kopyalandı.`, 
        [{ text: `Tamam`, style: 'default' }]
      );
    } catch (error) {
      Alert.alert(`Hata`, `E-posta adresi kopyalanamadı.`);
    }
  };

  const handleWebsitePress = async () => {
    try {
      const canOpen = await Linking.canOpenURL(aboutData.contact.website);
      if (!canOpen) {
        Alert.alert(`Hata`, `Bu web sitesi açılamadı.`);
        return;
      }
      
      Alert.alert(
        `Bilgi`, 
        `Web sitesi tarayıcıda açılacak. Devam etmek istiyor musunuz?`,
        [
          { text: `İptal`, style: 'cancel' },
          { 
            text: `Aç`, 
            style: 'default', 
            onPress: () => Linking.openURL(aboutData.contact.website) 
          }
        ]
      );
    } catch (error) {
      Alert.alert(`Hata`, `Web sitesi açılamadı.`);
    }
  };

  const handleShare = () => {
    Alert.alert(
      `Bilgi`,
      `Uygulama henüz mağazada yayınlanmadı. Çok yakında paylaşabileceksiniz.`
    );
  };

  return (
    <ThemedBackground>
      {/* Header with ScreenHeader component */}
      <ScreenHeader title="Hakkımızda" />
      
      <ScreenContainer paddingTop={LAYOUT_CONSTANTS.SCREEN_CONTAINER.DEFAULT_PADDING_TOP} marginBottom={LAYOUT_CONSTANTS.SCREEN_CONTAINER.DEFAULT_MARGIN_BOTTOM}>
        <View style={styles.contentContainer}>
          {/* App Info Card */}
          <ThemedCard style={styles.sectionCard}>
            <View style={styles.appInfoHeader}>
              <Image 
                source={require('../../assets/images/first_screen_logo_transparent.png')}
                style={styles.appLogo}
                resizeMode="contain"
              />
              <Text style={[styles.cardTitle, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
                {aboutData.appInfo.title}
              </Text>
            </View>
            <Text style={[styles.cardText, { color: theme.colors.text.secondary }]}>
              {aboutData.appInfo.description}
            </Text>
            <Text style={[styles.versionText, { color: theme.colors.text.secondary }]}>
              {`Versiyon: ${aboutData.appInfo.version}`}
            </Text>
          </ThemedCard>
          
          {/* Content Sections */}
          {aboutData.sections.map((section, index) => (
            <ThemedCard key={index} style={styles.sectionCard}>
              <Text style={[styles.cardTitle, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
                {section.title}
              </Text>
              <Text style={[styles.cardText, { color: theme.colors.text.secondary }]}>
                {section.content}
              </Text>
            </ThemedCard>
          ))}
          
          {/* Contact Card */}
          <ThemedCard style={styles.sectionCard}>
            <Text style={[styles.cardTitle, { color: theme.colors.text.primary, ...theme.typography.h2 }]}>
              {`İletişim`}
            </Text>
            
            <TouchableOpacity onPress={handleEmailPress} style={styles.contactItem}>
              <Text style={[styles.contactLabel, { color: theme.colors.text.secondary }]}>{`E-posta:`}</Text>
              <Text style={[styles.contactValue, { color: theme.colors.text.primary }]}>
                {aboutData.contact.email}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleWebsitePress} style={styles.contactItem}>
              <Text style={[styles.contactLabel, { color: theme.colors.text.secondary }]}>{`Web Sitesi:`}</Text>
              <Text style={[styles.contactValue, { color: theme.colors.text.primary }]}>
                {aboutData.contact.website}
              </Text>
            </TouchableOpacity>
            
            <ThemedButton 
              title={`Uygulamayı Paylaş`} 
              onPress={handleShare} 
              style={styles.shareButton}
            />
          </ThemedCard>
          
          <Text style={[styles.copyrightText, { color: theme.colors.text.secondary }]}>
            {aboutData.contact.copyright}
          </Text>
          
          {/* Feedback Section */}
          <View style={styles.feedbackContainer}>
            <ThemedButton 
              title={`Uygulamayı Değerlendirin`}
              onPress={() => {
                Alert.alert(
                  `Bilgi`,
                  `Uygulama henüz mağazada yayınlanmadı. Çok yakında değerlendirme yapabileceksiniz.`
                );
              }}
              style={styles.feedbackButton}
            />
            
            <ThemedButton 
              title={`Geri Bildirim Gönderin`}
              onPress={() => Linking.openURL(`mailto:${aboutData.contact.email}?subject=Arabuluculuk Ücreti Hesaplama  Geri Bildirim`)}
              style={styles.feedbackButton}
            />
          </View>
          <View style={{ height: LAYOUT_CONSTANTS.ABOUT_SCREEN.SPACER_HEIGHT }} />
        </View>
      </ScreenContainer>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    textAlign: 'center',
    marginBottom: LAYOUT_CONSTANTS.ABOUT_SCREEN.TITLE_MARGIN_BOTTOM,
  },
  sectionCard: {
    width: LAYOUT_CONSTANTS.ABOUT_SCREEN.SECTION_CARD.WIDTH,
    padding: LAYOUT_CONSTANTS.ABOUT_SCREEN.SECTION_CARD.PADDING,
    marginBottom: LAYOUT_CONSTANTS.ABOUT_SCREEN.SECTION_CARD.MARGIN_BOTTOM,
    borderRadius: LAYOUT_CONSTANTS.ABOUT_SCREEN.SECTION_CARD.BORDER_RADIUS,
    elevation: LAYOUT_CONSTANTS.ABOUT_SCREEN.SECTION_CARD.ELEVATION,
  },
  cardTitle: {
    marginBottom: LAYOUT_CONSTANTS.SPACING.MD,
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.X_LARGE,
    fontWeight: '600',
  },
  cardText: {
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.LARGE,
    lineHeight: LAYOUT_CONSTANTS.ABOUT_SCREEN.LINE_HEIGHT,
    marginBottom: LAYOUT_CONSTANTS.SPACING.MD,
    textAlign: 'justify',
    paddingHorizontal: LAYOUT_CONSTANTS.ABOUT_SCREEN.TEXT_PADDING_HORIZONTAL,
  },
  versionText: {
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.MEDIUM,
    fontStyle: 'italic',
    marginTop: LAYOUT_CONSTANTS.ABOUT_SCREEN.VERSION_TEXT_MARGIN_TOP,
    textAlign: 'right',
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: LAYOUT_CONSTANTS.ABOUT_SCREEN.CONTACT_ITEM.MARGIN_BOTTOM,
    alignItems: 'center',
    paddingVertical: LAYOUT_CONSTANTS.ABOUT_SCREEN.CONTACT_ITEM.PADDING_VERTICAL,
    paddingHorizontal: LAYOUT_CONSTANTS.ABOUT_SCREEN.CONTACT_ITEM.PADDING_HORIZONTAL,
    borderRadius: LAYOUT_CONSTANTS.ABOUT_SCREEN.CONTACT_ITEM.BORDER_RADIUS,
    backgroundColor: `rgba(0, 0, 0, ${LAYOUT_CONSTANTS.ABOUT_SCREEN.CONTACT_ITEM.BACKGROUND_OPACITY})`,
  },
  contactLabel: {
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.LARGE,
    marginRight: LAYOUT_CONSTANTS.SPACING.MD,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.LARGE,
    textDecorationLine: 'underline',
  },
  shareButton: {
    marginTop: LAYOUT_CONSTANTS.ABOUT_SCREEN.SHARE_BUTTON_MARGIN_TOP,
    width: '100%',
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT_CONSTANTS.SPACING.MD,
  },
  appLogo: {
    width: LAYOUT_CONSTANTS.ABOUT_SCREEN.APP_LOGO.WIDTH,
    height: LAYOUT_CONSTANTS.ABOUT_SCREEN.APP_LOGO.HEIGHT,
    marginRight: LAYOUT_CONSTANTS.ABOUT_SCREEN.APP_LOGO.MARGIN_RIGHT,
  },
  copyrightText: {
    fontSize: LAYOUT_CONSTANTS.FONT_SIZES.MEDIUM,
    textAlign: 'center',
    marginTop: LAYOUT_CONSTANTS.ABOUT_SCREEN.COPYRIGHT_MARGIN_TOP,
    marginBottom: LAYOUT_CONSTANTS.ABOUT_SCREEN.COPYRIGHT_MARGIN_BOTTOM,
  },
  feedbackContainer: {
    width: LAYOUT_CONSTANTS.ABOUT_SCREEN.SECTION_CARD.WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: LAYOUT_CONSTANTS.SPACING.LG,
  },
  feedbackButton: {
    width: LAYOUT_CONSTANTS.ABOUT_SCREEN.FEEDBACK_BUTTON.WIDTH,
  }
});

export default AboutScreen;