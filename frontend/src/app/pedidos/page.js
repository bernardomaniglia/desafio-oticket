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
  const [isLoading, setIsLoading] = useState(true);

  const isFormInvalid = selectedCliente === "" || selectedProdutos.size === 0;

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
    if (isFormInvalid) {
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
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Gerenciamento de Pedidos
      </h1>

      {/* Formulário de Novo Pedido com novo estilo de seleção */}
      <div className="mb-8 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Novo Pedido</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção de Cliente */}
          <div>
            <label
              htmlFor="cliente"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              1. Selecione o Cliente
            </label>
            <select
              id="cliente"
              value={selectedCliente}
              onChange={(e) => setSelectedCliente(e.target.value)}
              required
              className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Selecione um cliente...</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          {/* NOVA Seleção de Produtos com Cards */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              2. Escolha os Produtos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {produtos.map((p) => {
                const isSelected = selectedProdutos.has(p.id);
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => handleProdutoChange(p.id)}
                    className={`text-left p-4 rounded-lg shadow-md transition-all duration-200 
                      ${
                        isSelected
                          ? "bg-green-100 text-green-900 ring-2 ring-green-500"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                  >
                    <p className="font-bold truncate">{p.nome}</p>
                    <p className="text-sm">R$ {p.preco.toFixed(2)}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isFormInvalid}
            className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Criar Pedido
          </button>
        </form>
        {feedback && (
          <p
            className={`mt-4 text-sm ${
              feedback.includes("sucesso") ? "text-green-400" : "text-red-400"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>

      {/* Lista de Pedidos (continua igual, com o estilo de card que já fizemos) */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Pedidos Registrados
        </h2>
        {isLoading ? (
          <p className="text-center">Carregando pedidos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-gray-100 text-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Pedido #{pedido.id}</h3>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        pedido.status === "PAGO"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {pedido.status}
                    </span>
                  </div>
                  <p className="text-sm mb-1">
                    <strong>Cliente:</strong> {pedido.cliente?.nome || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Data:</strong>{" "}
                    {new Date(pedido.data).toLocaleDateString("pt-BR")}
                  </p>

                  <div className="border-t border-gray-300 pt-3">
                    <h4 className="font-semibold mb-2">Produtos:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {pedido.produtos.map((item) => (
                        <li key={item.produtoId}>
                          {item.produto?.nome || "N/A"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
