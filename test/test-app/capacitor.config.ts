import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.testapp',
  appName: 'test-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CameraPreview: {
      // Configuration for the camera preview plugin
    }
  }
};

export default config;
