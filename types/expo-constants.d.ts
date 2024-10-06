import 'expo-constants';

declare module 'expo-constants' {
  interface ManifestExtra {
    X_API_KEY?: string;
    LOGFLARE_SOURCE?: string;
  }

  interface Manifest {
    extra?: ManifestExtra;
  }

  export interface Constants {
    manifest?: Manifest;
    expoConfig?: Manifest; // Para versões mais recentes do Expo
  }
}