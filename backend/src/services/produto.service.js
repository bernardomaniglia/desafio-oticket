// src/services/produto.service.js
const prisma = require('../lib/prisma');

class ProdutoService {
  async create(data) {
    const produto = await prisma.produto.create({
      data: {
        nome: data.nome,
        // Convertemos o preço para um número, caso ele venha como string
        preco: parseFloat(data.preco), 
      },
    });
    return produto;
  }

  async findAll() {
    const produtos = await prisma.produto.findMany();
    return produtos;
  }
}

module.exports = new ProdutoService();