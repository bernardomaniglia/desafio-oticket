// src/server.js

const express = require("express");
const clienteRoutes = require("./routes/cliente.routes");
// 1. Importe as rotas de produto
const produtoRoutes = require("./routes/produto.routes");

const app = express();
app.use(express.json());

const PORT = 3333;

app.get("/", (req, res) => {
  res.json({ message: "API do Mini Sistema de Pedidos está funcionando!" });
});

app.use("/clientes", clienteRoutes);
// 2. Use as rotas de produto no endereço /produtos
app.use("/produtos", produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
