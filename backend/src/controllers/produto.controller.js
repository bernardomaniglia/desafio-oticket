// src/controllers/produto.controller.js
const produtoService = require('../services/produto.service');

class ProdutoController {
  async create(req, res) {
    try {
      const { nome, preco } = req.body;
      const novoProduto = await produtoService.create({ nome, preco });
      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const produtos = await produtoService.findAll();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ProdutoController();