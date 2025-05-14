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

# 🧮 MEDPAY – Mediation Fee Calculator App

**MEDPAY** is a mobile application built with **React Native** to help users calculate mediation fees in accordance with Turkish law. It guides the user step-by-step through the mediation process, including:

- Dispute category selection
- Agreement status
- Dispute type
- Number of parties or dispute amount
- Automated fee calculation

---

## 🚀 Features

- Clean and modern UI
- Step-by-step user interaction flow
- Handles both monetary and non-monetary disputes
- Supports agreement and non-agreement scenarios
- Dynamic fee calculation based on official tariff
- Built-in navigation and gesture support
- Swipe gesture navigation enabled for backward screen transitions
- Turkish language UI
- Lightweight and mobile-friendly

---

## 📱 Screens Overview

1. **StartScreen**  
   Welcome message and entry point

2. **DisputeCategoryScreen**  
   Select whether the dispute is monetary or non-monetary

3. **AgreementStatusScreen**  
   Choose whether the parties reached an agreement

4. **DisputeTypeScreen**  
   Select the type of dispute (e.g., labor, commercial, family, etc.)

5. **InputScreen**  
   Enter the number of parties or agreement amount

6. **ResultScreen**  
   Displays the calculated mediation fee with the option to recalculate or return to home

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
git clone https://github.com/yourusername/medpay-app.git
cd medpay-app

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