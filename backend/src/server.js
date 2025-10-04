// src/server.js

// 1. Importar o Express
const express = require('express');

// 2. Criar a instância do Express
const app = express();

// Habilitar o uso de JSON no corpo das requisições
app.use(express.json());

// 3. Definir a porta da API
const PORT = 3333;

// 4. Criar uma rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Mini Sistema de Pedidos está funcionando!' });
});

// 5. Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});