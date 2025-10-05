// backend/src/tests/clientes.test.js

import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server";

describe("Rotas de Clientes", () => {
  // Teste que já tínhamos
  it("GET /clientes deve retornar status 200 e uma lista", async () => {
    const response = await request(app).get("/clientes");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Novo teste: Criação com sucesso
  it("POST /clientes deve criar um novo cliente e retornar status 201", async () => {
    const novoCliente = {
      nome: "Cliente de Teste",
      email: `teste-${Date.now()}@email.com`, // Email único para cada teste
    };

    const response = await request(app).post("/clientes").send(novoCliente); // Enviamos o corpo da requisição

    expect(response.status).toBe(201); // Esperamos o status "Created"
    expect(response.body).toHaveProperty("id"); // O cliente criado deve ter um ID
    expect(response.body.nome).toBe(novoCliente.nome);
  });

  // Novo teste: Tentativa de criação com falha
  it("POST /clientes com dados faltando deve retornar status 400", async () => {
    const clienteIncompleto = {
      nome: "Cliente Incompleto",
    }; // Sem o campo 'email'

    const response = await request(app)
      .post("/clientes")
      .send(clienteIncompleto);

    expect(response.status).toBe(400); // Esperamos o status "Bad Request"
  });
});
