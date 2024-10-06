import { Platform } from 'react-native';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo'; // Para informações de rede

const getIpAddress = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Erro ao buscar o endereço IP:', error);
    return 'IP desconhecido';
  }
};

const logError = async (errorMessage: string, source: string, additionalInfo = {}) => {
    try {
        const apiKey = Constants.expoConfig?.extra?.X_API_KEY;
        const logflareSource = Constants.expoConfig?.extra?.LOGFLARE_SOURCE;

    if (!apiKey || ! logflareSource){
        throw new Error('As variáveis de ambiente X_API_KEY ou LOGFLARE_SOURCE não estão definidas.');
    }

    const ipAddress = await getIpAddress(); // Obtém o endereço IP
    const netInfo = await NetInfo.fetch(); // Informações de rede

    const logPayload = [
      {
        error: errorMessage,
        source: source,
        timestamp: new Date().toISOString(),
        additionalInfo, // Informações extras fornecidas
        deviceInfo: {
          platform: Platform.OS, // iOS, Android, etc.
          version: Platform.Version, // Versão do SO
          locale: Intl.DateTimeFormat().resolvedOptions().locale, // Localização do dispositivo
          ip: ipAddress, // Endereço IP
          networkType: netInfo.type, // Tipo de conexão: wifi, cellular, etc.
          isConnected: netInfo.isConnected, // Se está conectado à internet
          isInternetReachable: netInfo.isInternetReachable, // Se a internet está acessível
        },
      }
    ];

    const response = await fetch(
        `https://api.logflare.app/logs/json?source=${logflareSource}`,  // Usa Config para acessar o LOGFLARE_SOURCE
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-API-KEY': apiKey,  // Usa Config para acessar o X_API_KEY
          },
          body: JSON.stringify(logPayload),
        }
    );
  
      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Falha ao enviar log para o Logflare. Resposta: ${response.status} - ${responseBody}`);
      }
  
      console.log('Log enviado com sucesso para o Logflare');
    } catch (loggingError) {
      const loggingErrorMessage =
        loggingError instanceof Error
          ? loggingError.message
          : 'Erro desconhecido ao enviar log';
      console.error('Falha ao registrar log:', loggingErrorMessage);
    }
  };
  
  export default logError;