const express = require('express');
const sequelize = require('./src/config/database');
const profissoesRoutes = require('./src/routes/profissoes');
const app = express();

// using middleware
app.use('/api', profissoesRoutes);

const PORT = process.env.PORT || 3000;

// trying to connect with mariaDB
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // If the connection is successful, starts the server
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao conectar com o banco de dados:', error.message);
    console.error('Certifique-se de que o servidor do MariaDB está rodando em seu localhost.');

    // Stop the process with an error code if you were unable to connect to the database
    process.exit(1); // status 1 (error)
  }
};

startServer();