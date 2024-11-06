const Usuario = require('./usuario');
const Profissao = require('./profissao');
const Contato = require('./contato');
const Endereco = require('./endereco');
const EstadoCivil = require('./estadoCivil');
const Avaliacao = require('./avaliacao');
const TipoVeiculo = require('./tipoVeiculo');
const Modelo = require('./modelo');
const Marca = require('./marca');
const Cor = require('./cor');
const Combustivel = require('./combustivel');
const Veiculo = require('./veiculo');

// Associações do Usuário
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

// Associações do Veículo
Veiculo.belongsTo(Marca, {
  foreignKey: 'id_marca',
  as: 'Marca',
});

Veiculo.belongsTo(Cor, {
  foreignKey: 'id_cor',
  as: 'Cor',
});

Veiculo.belongsTo(Combustivel, {
  foreignKey: 'id_combustivel',
  as: 'Combustivel',
});

Veiculo.belongsTo(TipoVeiculo, {
  foreignKey: 'id_tipo_veiculo',
  as: 'TipoVeiculo',
});

Veiculo.belongsTo(Modelo, {
  foreignKey: 'id_modelo',
  as: 'Modelo',
});

// Reverse associations
Marca.hasMany(Veiculo, { foreignKey: 'id_marca', as: 'Veiculos' });
Cor.hasMany(Veiculo, { foreignKey: 'id_cor', as: 'Veiculos' });
Combustivel.hasMany(Veiculo, { foreignKey: 'id_combustivel', as: 'Veiculos' });
TipoVeiculo.hasMany(Veiculo, { foreignKey: 'id_tipo_veiculo', as: 'Veiculos' });
Modelo.hasMany(Veiculo, { foreignKey: 'id_modelo', as: 'Veiculos' });

// Exportando os modelos
module.exports = {
  Usuario,
  Profissao,
  Contato,
  Endereco,
  EstadoCivil,
  Avaliacao,
  TipoVeiculo,
  Modelo,
  Marca,
  Cor,
  Combustivel,
  Veiculo,
};