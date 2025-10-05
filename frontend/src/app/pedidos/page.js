// src/app/pedidos/page.js
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedProdutos, setSelectedProdutos] = useState(new Set());
  const [feedback, setFeedback] = useState("");

  // Adicionando o estado de loading
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [pedidosRes, clientesRes, produtosRes] = await Promise.all([
        api.get("/pedidos"),
        api.get("/clientes"),
        api.get("/produtos"),
      ]);
      setPedidos(pedidosRes.data);
      setClientes(clientesRes.data);
      setProdutos(produtosRes.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setFeedback("Erro ao carregar dados da página.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProdutoChange = (produtoId) => {
    const newSelectedProdutos = new Set(selectedProdutos);
    if (newSelectedProdutos.has(produtoId)) {
      newSelectedProdutos.delete(produtoId);
    } else {
      newSelectedProdutos.add(produtoId);
    }
    setSelectedProdutos(newSelectedProdutos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCliente || selectedProdutos.size === 0) {
      setFeedback("Por favor, selecione um cliente e ao menos um produto.");
      return;
    }
    setFeedback("");

    try {
      await api.post("/pedidos", {
        clienteId: parseInt(selectedCliente),
        produtoIds: Array.from(selectedProdutos),
      });
      setFeedback("Pedido cadastrado com sucesso!");
      setSelectedCliente("");
      setSelectedProdutos(new Set());
      fetchData();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      setFeedback("Erro ao criar pedido.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Pedidos</h1>

      {/* Formulário de Novo Pedido (continua o mesmo) */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Novo Pedido</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="cliente"
              className="block text-sm font-medium text-gray-700"
            >
              Cliente
            </label>
            <select
              id="cliente"
              value={selectedCliente}
              onChange={(e) => setSelectedCliente(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Produtos
            </label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {produtos.map((p) => (
                <div key={p.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`produto-${p.id}`}
                    checked={selectedProdutos.has(p.id)}
                    onChange={() => handleProdutoChange(p.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`produto-${p.id}`}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {p.nome}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Criar Pedido
          </button>
        </form>
        {feedback && <p className="mt-4 text-sm text-green-600">{feedback}</p>}
      </div>

      {/* Lista de Pedidos com Loading State */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Pedidos Registrados</h2>
        {isLoading ? (
          <p className="text-center">Carregando pedidos...</p>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="p-4 border rounded-lg">
                <p>
                  <strong>ID do Pedido:</strong> {pedido.id}
                </p>
                <p>
                  <strong>Cliente:</strong> {pedido.cliente?.nome || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {pedido.status}
                </p>
                <p>
                  <strong>Produtos:</strong>
                </p>
                <ul className="list-disc list-inside">
                  {pedido.produtos.map((item) => (
                    <li key={item.produtoId}>
                      {item.produto?.nome || "N/A"} - R${" "}
                      {item.produto?.preco.toFixed(2) || "0.00"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
