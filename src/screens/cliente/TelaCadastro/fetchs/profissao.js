import axios from 'axios';
import { API_URL } from '@env';

export const fetchProfissoes = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/backend/profissoes`);
    return response.data.map((profissao) => ({
      label: profissao.profissao,
      value: profissao.profissao,
    }));
  } catch (error) {
    console.error('Erro ao buscar profissões:', error);
    throw error;
  }
};
