const express = require('express');
const router = express.Router();
const AuthUser = require('../../models/AuthUser');
const bcrypt = require('bcrypt');

const formatCpfForDb = (cpf) => {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};

router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    // Formata o CPF para o formato salvo no banco de dados
    const cpfFormatted = formatCpfForDb(cpf);

    const user = await AuthUser.findOne({ where: { cpf: cpfFormatted } });
    console.log("Resultado da busca pelo CPF:", user);

    if (!user) {
      console.log("Usuário não encontrado no banco de dados.");
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    console.log("Senha válida:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Senha incorreta.");
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Autenticação bem-sucedida' });
  } catch (error) {
    console.error('Erro ao autenticar o usuário:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});
module.exports = router;