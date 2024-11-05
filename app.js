// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./src/config/database');
const routes = require('./src/routes/backend');
const models = require('./src/models');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/backend', routes);

const connectToDatabase = async (retries = 5) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
      break;
    } catch (error) {
      console.error('Falha ao conectar com o banco de dados:', error.message);
      retries -= 1;
      console.log(`Tentando reconectar... ${retries} tentativa(s) restante(s)`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

// Iniciar o servidor
const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

// Middleware de tratamento global de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

startServer();

module.exports = app;