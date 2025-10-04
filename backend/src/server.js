// src/server.js

const express = require("express");
// 1. Importar as rotas de cliente que criamos
const clienteRoutes = require("./routes/cliente.routes");

const app = express();
app.use(express.json());

const PORT = 3333;

app.get("/", (req, res) => {
  res.json({ message: "API do Mini Sistema de Pedidos está funcionando!" });
});

// 2. Dizer ao app para usar o roteador de clientes
// Todas as rotas definidas em clienteRoutes começarão com /clientes
app.use("/clientes", clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
