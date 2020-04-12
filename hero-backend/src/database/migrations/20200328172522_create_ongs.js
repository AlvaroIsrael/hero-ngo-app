exports.up = function(knex) {
  return knex.schema.createTable('ongs', (tabela) => {
    tabela.string('id').primary();
    tabela.string('name').notNullable();
    tabela.string('email').notNullable();
    tabela.string('whatsapp').notNullable();
    tabela.string('city').notNullable();
    tabela.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
