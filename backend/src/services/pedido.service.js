// src/services/pedido.service.js
const prisma = require('../lib/prisma');

class PedidoService {
  // Função para criar um novo pedido
  async create(data) {
    const { clienteId, produtoIds } = data;

    // O Prisma Transaction garante que ambas as operações (criar o pedido
    // e associar os produtos) aconteçam com sucesso. Se uma falhar,
    // a outra é desfeita (rollback), mantendo a consistência do banco.
    const pedido = await prisma.$transaction(async (tx) => {
      const novoPedido = await tx.pedido.create({
        data: {
          clienteId: clienteId,
        },
      });

      // Prepara os dados para a tabela de associação ProdutosEmPedidos
      const produtosDoPedido = produtoIds.map((id) => {
        return {
          pedidoId: novoPedido.id,
          produtoId: id,
        };
      });

      // Cria as associações na tabela pivô
      await tx.produtosEmPedidos.createMany({
        data: produtosDoPedido,
      });

      return novoPedido;
    });

    return pedido;
  }

  // Função para listar todos os pedidos
  async findAll() {
    // O 'include' é a parte mais poderosa. Ele diz ao Prisma para trazer
    // os dados das tabelas relacionadas junto com cada pedido.
    const pedidos = await prisma.pedido.findMany({
      include: {
        // Inclui os dados do cliente relacionado a este pedido
        cliente: true,
        // Inclui as associações e, dentro delas, os dados de cada produto
        produtos: {
          include: {
            produto: true,
          },
        },
      },
    });
    return pedidos;
  }
}

module.exports = new PedidoService();