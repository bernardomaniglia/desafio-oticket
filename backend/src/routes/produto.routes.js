// src/routes/produto.routes.js
const { Router } = require('express');
const produtoController = require('../controllers/produto.controller');

const router = Router();

router.get('/', produtoController.findAll);
router.post('/', produtoController.create);

module.exports = router;