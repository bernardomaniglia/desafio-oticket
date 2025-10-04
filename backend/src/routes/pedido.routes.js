// src/routes/pedido.routes.js
const { Router } = require('express');
const pedidoController = require('../controllers/pedido.controller');

const router = Router();

router.get('/', pedidoController.findAll);
router.post('/', pedidoController.create);

module.exports = router;