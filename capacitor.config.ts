import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.roshoonreact.app',
  appName: 'roshoon-react',
  webDir: 'dist',
  server: {
    url: 'https://roshoon.com',
    cleartext: true,
  },
};

export default config;
