const { Sequelize } = require('sequelize');

// database, user, pass

const sequelize = new Sequelize('db_locacao_veiculos', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: console.log,
});

module.exports = sequelize;
