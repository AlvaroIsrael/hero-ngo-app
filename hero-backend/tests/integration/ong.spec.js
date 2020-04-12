const request = require('supertest');
const connection = require('../../src/database/connection');
const app = require('../../src/app');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ong.', async function() {
    const response = await request(app)
      .post('/ongs')
      //.set('Authorization', '__id_valido_vem_aqui__')
      .send({
        name: 'MEGABOGA',
        email: 'contato@mega.com.br',
        whatsapp: '31997888888',
        city: 'Rio do Sul',
        uf: 'SC',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

    console.log('\nNova ONG:', response.body);
  });
});
