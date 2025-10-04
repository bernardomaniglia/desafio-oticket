// src/controllers/pedido.controller.js
const pedidoService = require('../services/pedido.service');

class PedidoController {
  async create(req, res) {
    try {
      // O corpo da requisição terá o ID do cliente e um array de IDs de produtos
      const { clienteId, produtoIds } = req.body;
      const novoPedido = await pedidoService.create({ clienteId, produtoIds });
      res.status(201).json(novoPedido);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const pedidos = await pedidoService.findAll();
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new PedidoController();