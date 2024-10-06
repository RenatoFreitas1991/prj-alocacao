import { Alert } from 'react-native';
import logError from './logService';  // Importa o serviço de logging

const fetchAddress = async (cep: string, setCidade: Function, setRua: Function, setBairro: Function) => {
  let firstErrorMessage: string | null = null;
  let logRegistered = false;

  const logIfTimeout = setTimeout(() => {
    if (!logRegistered) {
      const timeoutMessage = `Tempo limite de 3 segundos excedido para encontrar o CEP: ${cep}`;
      logError(timeoutMessage, 'Timeout');
      logRegistered = true;
    }
  }, 3000); // Define o limite de 3 segundos

  try {
    // Primeira tentativa usando ViaCEP
    const response: Response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) throw new Error('CEP não encontrado no ViaCEP');
    setCidade(data.localidade);
    setRua(data.logradouro);
    setBairro(data.bairro);
    clearTimeout(logIfTimeout); // Se for bem-sucedido, cancela o timeout
  } catch (error: unknown) {
    firstErrorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.log('Erro na primeira tentativa, tentando segunda API...', firstErrorMessage);

    // Segunda tentativa usando BrasilAPI
    try {
      const secondResponse: Response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      const secondData = await secondResponse.json();
      if (secondData.erro) throw new Error('CEP não encontrado no BrasilAPI');
      setCidade(secondData.city);
      setRua(secondData.street);
      setBairro(secondData.neighborhood);
      clearTimeout(logIfTimeout); // Se for bem-sucedido, cancela o timeout
    } catch (secondError: unknown) {
      const secondErrorMessage = secondError instanceof Error ? secondError.message : 'Erro desconhecido';
      Alert.alert('Erro', 'CEP inválido ou não encontrado nas duas tentativas.');

      // Limpar campos no caso de erro
      setCidade('');
      setRua('');
      setBairro('');

      // Logando o erro somente após as duas tentativas falharem
      const combinedErrorMessage = `ViaCEP: ${firstErrorMessage || 'N/A'} | BrasilAPI: ${secondErrorMessage}`;
      if (!logRegistered) {
        await logError(combinedErrorMessage, 'Both APIs');
        logRegistered = true;
      }
    }
  }
};

export default fetchAddress;
