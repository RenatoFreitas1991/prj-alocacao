const Usuario = require('./usuario');
const Profissao = require('./profissao');
const Contato = require('./contato');
const Endereco = require('./endereco');
const EstadoCivil = require('./estadoCivil');
const Avaliacao = require('./avaliacao');

// Associações
Usuario.belongsTo(Profissao, {
  foreignKey: 'id_profissao',
  as: 'profissao'
});

Usuario.belongsTo(Contato, {
  foreignKey: 'id_contato',
  as: 'contato'
});

Usuario.belongsTo(Endereco, {
  foreignKey: 'id_endereco',
  as: 'endereco'
});

Usuario.belongsTo(EstadoCivil, {
  foreignKey: 'id_estado_civil',
  as: 'estadoCivil'
});

Usuario.belongsTo(Avaliacao, {
  foreignKey: 'id_avaliacao',
  as: 'avaliacao'
});

// Exportando os modelos
module.exports = {
  Usuario,
  Profissao,
  Contato,
  Endereco,
  EstadoCivil,
  Avaliacao
};
