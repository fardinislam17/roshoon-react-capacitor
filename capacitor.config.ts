import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.roshoonreact.app',
  appName: 'roshoon-react',
  webDir: 'dist',
  // server: {
  //   // url: 'https://roshoon.com',
  //   // url: 'http://192.168.0.192:3333',
  //   cleartext: true,
  // },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId:
        '927800944445-3d3k7rp69k3sla1k704ncqlkenbnka6r.apps.googleusercontent.com',
      serverClientId:
        '927800944445-hhfb93qkn78qgurg65qj36tr5iugu24e.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
