const knex = require('knex');
const config = require('../../knexfile');
const eviroment = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connection = knex(eviroment);

module.exports = connection;
