// src/routes/cliente.routes.js
const { Router } = require('express');
const clienteController = require('../controllers/cliente.controller');

// Criamos uma instância do roteador do Express
const router = Router();

// Quando uma requisição GET chegar em '/', chama o método findAll do controller
router.get('/', clienteController.findAll);
// Quando uma requisição POST chegar em '/', chama o método create do controller
router.post('/', clienteController.create);

module.exports = router;