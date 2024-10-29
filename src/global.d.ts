import 'expo-constants';

declare module 'expo-constants' {
  export interface ManifestExtra {
    API_URL: string;
    PORT?: string;
    X_API_KEY?: string;
    LOGFLARE_SOURCE?: string;
  }

  export interface AppManifest {
    extra?: ManifestExtra;
  }

  export interface ExpoConfig {
    extra?: ManifestExtra;
  }

  export interface Constants {
    manifest?: AppManifest;
    expoConfig?: ExpoConfig;
  }
}
