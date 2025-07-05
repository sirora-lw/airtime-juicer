import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.airtimescanner.app', // Your unique application ID
  appName: 'Airtime Scanner',
  webDir: 'www', // Changed from 'src' to 'www'
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Show splash screen for 3 seconds
      launchAutoHide: true, // Automatically hide after launchShowDuration
      backgroundColor: "#ffffff", // White background for the splash screen
      androidSplashResourceName: "splash", // Name of the splash screen drawable
      androidScaleType: "CENTER_CROP",
      showSpinner: false, // Do not show a spinner on the splash screen
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true, // Make the splash screen full screen
      splashImmersive: true, // Enable immersive mode for Android
      layoutName: "launch_screen",
    },
    Camera: {
      // No specific configuration needed here for basic usage
    },
  },
};

export default config;
