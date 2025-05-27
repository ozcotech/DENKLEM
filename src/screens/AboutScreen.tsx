import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Share, Image } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import ThemedBackground from '../components/common/ThemedBackground';
import { ThemedCard } from '../components/common/ThemedCard';
import ThemedButton from '../components/common/ThemedButton';
import ScreenHeader from '../components/common/ScreenHeader';
import { aboutData } from '../constants/aboutData';
import ScreenContainer from '../components/common/ScreenContainer';

const AboutScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  const handleShare = async () => {
    try {
      const shareOptions = {
        message: `${aboutData.appInfo.title} - ${aboutData.appInfo.description}\n\nBize ulaşın: ${aboutData.contact.email}`,
        url: aboutData.contact.website,
        title: aboutData.appInfo.title
      };
      
      const result = await Share.share(shareOptions);
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type
          console.log(`Shared via: ${result.activityType}`);
        } else {
          // Shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert(`Hata`, `Paylaşım yapılamadı.`);
    }
  };

  return (
    <ThemedBackground>
      {/* Header with ScreenHeader component */}
      <ScreenHeader title="Hakkımızda" />
      
      <ScreenContainer paddingTop={10} marginBottom={110}>
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
          <View style={{ height: 100 }} />
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
    marginBottom: 25,
  },
  sectionCard: {
    width: '90%',
    padding: 20,
    marginBottom: 25,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'justify',
    paddingHorizontal: 5,
  },
  versionText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'right',
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  contactLabel: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  shareButton: {
    marginTop: 15,
    width: '100%',
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  appLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  copyrightText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  feedbackContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  feedbackButton: {
    width: '48%',
  }
});

export default AboutScreen;