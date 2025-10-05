// backend/src/tests/pedidos.test.js

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../server";
import prisma from "../lib/prisma"; // Importamos o Prisma para manipular o banco

describe("Rotas de Pedidos", () => {
  // Variáveis para armazenar os IDs criados
  let cliente;
  let produto1;
  let produto2;

  // beforeAll: Roda UMA VEZ antes de todos os testes deste arquivo
  beforeAll(async () => {
    // Limpa o ambiente para garantir que não há dados de testes anteriores
    await prisma.produtosEmPedidos.deleteMany({});
    await prisma.pedido.deleteMany({});
    await prisma.produto.deleteMany({});
    await prisma.cliente.deleteMany({});

    // Cria os dados necessários para os testes
    cliente = await prisma.cliente.create({
      data: {
        nome: "Cliente Pedido Teste",
        email: `pedido-${Date.now()}@teste.com`,
      },
    });

    produto1 = await prisma.produto.create({
      data: { nome: "Produto Pedido Teste 1", preco: 10.0 },
    });

    produto2 = await prisma.produto.create({
      data: { nome: "Produto Pedido Teste 2", preco: 20.0 },
    });
  });

  // afterAll: Roda UMA VEZ depois que todos os testes deste arquivo terminarem
  afterAll(async () => {
    // Limpa os dados criados para não sujar o banco de dados
    await prisma.produtosEmPedidos.deleteMany({});
    await prisma.pedido.deleteMany({});
    await prisma.produto.deleteMany({});
    await prisma.cliente.deleteMany({});
    await prisma.$disconnect(); // Desconecta o Prisma
  });

  it("POST /pedidos deve criar um novo pedido com sucesso", async () => {
    const novoPedido = {
      clienteId: cliente.id,
      produtoIds: [produto1.id, produto2.id],
    };

    const response = await request(app).post("/pedidos").send(novoPedido);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.clienteId).toBe(cliente.id);
  });

  it("GET /pedidos deve retornar uma lista de pedidos", async () => {
    const response = await request(app).get("/pedidos");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Verifica se o pedido que acabamos de criar está na lista
    expect(response.body.some((p) => p.clienteId === cliente.id)).toBe(true);
  });

  it("POST /pedidos deve retornar erro 400 se o cliente não existir", async () => {
    const pedidoInvalido = {
      clienteId: 99999, // ID de cliente que não existe
      produtoIds: [produto1.id],
    };

    const response = await request(app).post("/pedidos").send(pedidoInvalido);

    expect(response.status).toBe(400);
  });
});
