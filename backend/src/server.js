// backend/src/server.js

const express = require("express");
const cors = require("cors");
const clienteRoutes = require("./routes/cliente.routes");
const produtoRoutes = require("./routes/produto.routes");
const pedidoRoutes = require("./routes/pedido.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// --- O QUE FICOU IGUAL (INÍCIO) ---
// Toda a parte de configuração do Express, rotas e Swagger permanece a mesma.

const app = express();
app.use(express.json());
app.use(cors());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Mini Sistema de Pedidos API",
    version: "1.0.0",
    description: "Documentação da API do desafio técnico.",
  },
  paths: {
    "/clientes": {
      get: {
        summary: "Lista todos os clientes",
        description: "Retorna uma lista de todos os clientes cadastrados.",
        responses: {
          200: {
            description: "Lista de clientes retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Cliente" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Cadastra um novo cliente",
        description: "Cria um novo cliente com nome e email.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NovoCliente" },
            },
          },
        },
        responses: {
          201: { description: "Cliente criado com sucesso." },
          400: { description: "Erro na requisição (ex: email já existe)." },
        },
      },
    },
    "/produtos": {
      get: {
        summary: "Lista todos os produtos",
        description: "Retorna uma lista de todos os produtos cadastrados.",
        responses: {
          200: {
            description: "Lista de produtos retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Produto" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Cadastra um novo produto",
        description: "Cria um novo produto com nome e preço.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NovoProduto" },
            },
          },
        },
        responses: {
          201: { description: "Produto criado com sucesso." },
          400: { description: "Erro na requisição." },
        },
      },
    },
    "/pedidos": {
      get: {
        summary: "Lista todos os pedidos",
        description:
          "Retorna uma lista de pedidos, incluindo os dados do cliente e os produtos associados.",
        responses: {
          200: {
            description: "Lista de pedidos retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Pedido" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Cria um novo pedido",
        description:
          "Cria um novo pedido associando um cliente a uma lista de produtos.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NovoPedido" },
            },
          },
        },
        responses: {
          201: { description: "Pedido criado com sucesso." },
          400: {
            description:
              "Erro na requisição (ex: cliente ou produto não encontrado).",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Cliente: {
        type: "object",
        properties: {
          id: { type: "integer" },
          nome: { type: "string" },
          email: { type: "string" },
        },
      },
      NovoCliente: {
        type: "object",
        properties: {
          nome: { type: "string", example: "Maria da Silva" },
          email: { type: "string", example: "maria.silva@email.com" },
        },
      },
      Produto: {
        type: "object",
        properties: {
          id: { type: "integer" },
          nome: { type: "string" },
          preco: { type: "number", format: "float" },
        },
      },
      NovoProduto: {
        type: "object",
        properties: {
          nome: { type: "string", example: "Mouse Gamer" },
          preco: { type: "number", example: 150.75 },
        },
      },
      NovoPedido: {
        type: "object",
        properties: {
          clienteId: { type: "integer", example: 1 },
          produtoIds: {
            type: "array",
            items: { type: "integer" },
            example: [1, 3],
          },
        },
      },
      Pedido: {
        type: "object",
        properties: {
          id: { type: "integer" },
          data: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["PENDENTE", "PAGO"] },
          clienteId: { type: "integer" },
          cliente: { $ref: "#/components/schemas/Cliente" },
          produtos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                produto: { $ref: "#/components/schemas/Produto" },
              },
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [],
};

const specs = swaggerJsdoc(options);

app.get("/", (req, res) => {
  res.json({ message: "API do Mini Sistema de Pedidos está funcionando!" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/pedidos", pedidoRoutes);
// --- O QUE FICOU IGUAL (FIM) ---

// --- O QUE MUDOU ---
// A constante PORT e o bloco app.listen() foram REMOVIDOS deste arquivo.
// Em vez disso, exportamos a instância 'app' para que outros arquivos
// (como nosso novo index.js e nossos testes) possam usá-la.

module.exports = app;
