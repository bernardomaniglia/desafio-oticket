// src/controllers/cliente.controller.js
const clienteService = require('../services/cliente.service');

class ClienteController {
  async create(req, res) {
    try {
      // Pegamos o nome e o email do corpo (body) da requisição
      const { nome, email } = req.body;
      const novoCliente = await clienteService.create({ nome, email });
      // Retornamos o status 201 (Created) e o cliente recém-criado
      res.status(201).json(novoCliente);
    } catch (error) {
      // Em caso de erro, retornamos o status 400 (Bad Request)
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const clientes = await clienteService.findAll();
      // Retornamos o status 200 (OK) e a lista de clientes
      res.status(200).json(clientes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ClienteController();