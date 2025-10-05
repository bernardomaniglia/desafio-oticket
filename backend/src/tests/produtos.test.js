// backend/src/tests/produtos.test.js

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server';

describe('Rotas de Produtos', () => {
  it('GET /produtos deve retornar status 200 e uma lista', async () => {
    const response = await request(app).get('/produtos');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('POST /produtos deve criar um novo produto e retornar status 201', async () => {
    const novoProduto = {
      nome: 'Produto de Teste',
      preco: 99.99,
    };

    const response = await request(app)
      .post('/produtos')
      .send(novoProduto);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(novoProduto.nome);
  });

  it('POST /produtos com dados faltando deve retornar status 400', async () => {
    const produtoIncompleto = {
      nome: 'Produto Incompleto',
    }; // Sem o campo 'preco'

    const response = await request(app)
      .post('/produtos')
      .send(produtoIncompleto);

    expect(response.status).toBe(400);
  });
});