// src/routes/cliente.routes.js
const { Router } = require('express');
const clienteController = require('../controllers/cliente.controller');

const router = Router();

router.get('/', clienteController.findAll);
router.post('/', clienteController.create);

module.exports = router;