// src/server.js

const express = require("express");
const clienteRoutes = require("./routes/cliente.routes");
const produtoRoutes = require("./routes/produto.routes");
// 1. Importe as rotas de pedido
const pedidoRoutes = require("./routes/pedido.routes");

const app = express();
app.use(express.json());

// Permitir CORS para o frontend (vamos precisar disso em breve)
const cors = require("cors");
app.use(cors());

const PORT = 3333;

app.get("/", (req, res) => {
  res.json({ message: "API do Mini Sistema de Pedidos está funcionando!" });
});

app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
// 2. Use as rotas de pedido no endereço /pedidos
app.use("/pedidos", pedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
