const { Sequelize } = require('sequelize');

// database, user, pass

const sequelize = new Sequelize('db_locacao_veiculos', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;
