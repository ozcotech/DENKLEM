This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# 🧮 DENKLEM – Mediation Fee Calculator App

**DENKLEM** (meaning "equation" in Turkish, from Latin "aequare" = "to equalize") is a comprehensive mobile application built with **React Native** that calculates mediation fees according to Turkish law. The app is based on the 2025 mediation fee tariff and currently supports calculations specifically for the year 2025, with future updates planned for 2026, 2027, and beyond.

The name "DENKLEM" derives from the concept of creating equality and balance between parties, which aligns perfectly with the mediation process - establishing equilibrium and fair resolution between disputing parties.

---

## 🚀 Key Features

### 💰 **Main Functionality - Fee Calculation**
- **2025 Official Tariff**: Based on current Turkish mediation fee regulations
- **Smart Calculation Engine**: Handles both monetary and non-monetary disputes
- **Dual Scenario Support**: Different calculations for agreement vs. non-agreement cases
- **Automatic Tax Calculations**: Includes withholding tax and freelance receipt calculations

### 📱 **User Experience**
- **Intuitive Step-by-Step Flow**: Guided process from start to finish
- **Gesture Navigation**: Swipe right from any screen edge to go back
- **Persistent Tab Bar**: Quick access to home, legislation, and about sections
- **Turkish Language Interface**: Fully localized for Turkish users
- **Clean Modern Design**: Professional and user-friendly interface

### 🧮 **Additional Calculators**
- **Time Calculation**: Calculate mediation process durations
- **Freelance Receipt Calculator (SMM)**: Generate receipt calculations with tax deductions
- **Comprehensive Results**: Detailed breakdowns with tax implications

### 🔧 **Technical Features**
- **iOS Platform**: Currently optimized for iOS (Android support planned)
- **Offline Capability**: No internet required for calculations
- **Real-time Updates**: Instant calculation results
- **Responsive Design**: Optimized for various screen sizes

---

## 📱 User Journey & Screens

### **1. StartScreen**
Welcome screen with main entry point to begin fee calculation

### **2. DisputeCategoryScreen** 
- **Primary Options**: Select dispute category (monetary disputes prominently featured)
- **Additional Calculations Section**: 
  - Time Calculation for mediation process duration
  - Freelance Receipt (SMM) Calculator

### **3. AgreementStatusScreen**
Choose whether parties reached an agreement during mediation:
- **Agreement**: Leads to different calculation method
- **No Agreement**: Alternative calculation approach

### **4. DisputeTypeScreen**
Select specific dispute type (labor, commercial, family, etc.) based on previous selections

### **5. InputScreen**
Enter required information:
- **For Agreements**: Agreement amount + number of parties
- **For Non-Agreements**: Only number of parties needed

### **6. ResultScreen**
Comprehensive results display:
- **Main Fee**: Calculated mediation fee
- **Tax Information**: Withholding tax calculations when applicable
- **Freelance Receipt Details**: Complete SMM breakdown for professional invoicing

### **7. Additional Screens**
- **TimeCalculationScreen**: Calculate mediation process durations
- **SmmCalculationScreen**: Detailed freelance receipt calculations
- **LegislationScreen**: Access current mediation regulations
- **AboutScreen**: App information and contact details

---

## 📸 Screenshots

<div align="center">

### Main Flow Screenshots

<table>
  <tr>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/ozcotech/DENKLEM-screenshots/master/ios/home-screen.png" width="200" alt="Home Screen">
      <br><strong>Home Screen</strong>
    </td>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/ozcotech/DENKLEM-screenshots/master/ios/dispute-category.png" width="200" alt="Dispute Category">
      <br><strong>Dispute Category</strong>
    </td>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/ozcotech/DENKLEM-screenshots/master/ios/agreement-status.png" width="200" alt="Agreement Status">
      <br><strong>Agreement Status</strong>
    </td>
    <td align="center" width="25%">
      <img src="https://raw.githubusercontent.com/ozcotech/DENKLEM-screenshots/master/ios/dispute-type.png" width="200" alt="Dispute Type">
      <br><strong>Dispute Type</strong>
    </td>
  </tr>
</table>

### Input & Results Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/ozcotech/DENKLEM-screenshots/master/ios/input-screen-2.png" width="200" alt="Input Screen">
      <br><strong>Input Screen</strong>
    </td>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/ozcotech/DENKLEM-screenshots/master/ios/result-screen-2.png" width="200" alt="Result Screen">
      <br><strong>Result Screen</strong>
    </td>
  </tr>
</table>

### Additional Calculators Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/ozcotech/DENKLEM-screenshots/master/ios/time-calculation.png" width="200" alt="Time Calculation">
      <br><strong>Time Calculation</strong>
    </td>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/ozcotech/DENKLEM-screenshots/master/ios/smm-calculation-2.png" width="200" alt="SMM Calculation">
      <br><strong>SMM Calculation</strong>
    </td>
  </tr>
</table>

</div>

> 📸 **More Screenshots**: View all screenshots and app flow in the [DENKLEM Screenshots Repository](https://github.com/ozcotech/DENKLEM-screenshots)

---

## 🎯 How It Works

### **Monetary Dispute with Agreement:**
1. Select "Monetary Disputes" → "Agreement" → Choose dispute type
2. Enter agreement amount and number of parties
3. Get calculated mediation fee + optional SMM receipt calculation

### **Non-Monetary or No Agreement:**
1. Select category → "No Agreement" 
2. Enter only number of parties
3. Receive fee calculation with automatic tax deductions

### **Additional Features:**
- **Tab Bar Navigation**: Always accessible home, legislation, and about sections
- **Gesture Controls**: Swipe right from screen edge to navigate back
- **Quick Access**: Direct links to time and SMM calculators

---

## 🛠️ Tech Stack

- **React Native** with TypeScript
- **React Navigation** for seamless screen transitions
- **Custom Theme System** for consistent UI
- **Gesture Handler** for intuitive navigation
- **Platform-specific Optimizations** for iOS

---

## 📅 Version Information

- **Current Version**: 2025.1.0
- **Supported Year**: 2025 mediation tariff
- **Platform**: iOS (Android coming soon)
- **Language**: Turkish
- **Last Updated**: Based on 2025 official mediation fee regulations

---

## 🛠️ Tech Stack

- React Native
- TypeScript
- React Navigation
- Metro Bundler
- ESLint + Prettier

---

## 🧪 Development Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/DENKLEM.git
cd DENKLEM

# Install dependencies
npm install

# iOS setup (macOS only)
cd ios
pod install
cd ..

# Start the app
npx react-native run-ios
# or
npx react-native run-android
```

---

## 👤 Author

Made by **ozcotech**  
Contact: info@ozco.studio  
https://ozco.studio

---

## 📄 License

This project is licensed under the MIT License.