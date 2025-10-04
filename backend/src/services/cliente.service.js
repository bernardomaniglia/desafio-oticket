// src/services/cliente.service.js
const prisma = require('../lib/prisma');

class ClienteService {
  // Função para criar um novo cliente no banco de dados
  async create(data) {
    // Usamos o Prisma Client para executar a operação de criação
    const cliente = await prisma.cliente.create({
      data: {
        nome: data.nome,
        email: data.email,
      },
    });
    return cliente;
  }

  // Função para buscar todos os clientes no banco de dados
  async findAll() {
    // Usamos o Prisma Client para buscar todos os registros da tabela cliente
    const clientes = await prisma.cliente.findMany();
    return clientes;
  }
}

module.exports = new ClienteService();