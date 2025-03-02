import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.roshoonreact.app',
  appName: 'roshoon-react',
  webDir: 'dist',
  server: {
    // url: 'https://roshoon.com',
    url: 'http://192.168.20.161:3000',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
    },
  },
};

export default config;
