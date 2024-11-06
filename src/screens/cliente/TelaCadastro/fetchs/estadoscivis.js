import axios from 'axios';
import { API_URL } from '@env';

export const fetchEstadosCivis = async () => {
  try {
    console.log("chegou aqui");
    const response = await axios.get(`${API_URL}/api/backend/estadosCivis`);
    return response.data.map((estadoCivil) => ({
      label: estadoCivil.estado_civil,
      value: estadoCivil.estado_civil,
    }));
  } catch (error) {
    console.error('Erro ao buscar estados civis:', error);
    throw error;
  }
};
