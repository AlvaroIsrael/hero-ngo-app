exports.up = function(knex) {
  return knex.schema.createTable('incidents', (tabela) => {
    tabela.increments();
    tabela.string('title').notNullable();
    tabela.string('description').notNullable();
    tabela.decimal('value').notNullable();
    tabela.string('ong_id').notNullable();

    tabela.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
