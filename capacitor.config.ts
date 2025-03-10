import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.roshoonreact.app',
  appName: 'roshoon-react',
  webDir: 'dist',
  server: {
    // url: 'https://roshoon.com',
    url: 'http://192.168.0.192:3000',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId:
        '197474516781-qqmjomhai2tfq4k8menop27c6aqujkli.apps.googleusercontent.com',
      serverClientId:
        '927800944445-hhfb93qkn78qgurg65qj36tr5iugu24e.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
