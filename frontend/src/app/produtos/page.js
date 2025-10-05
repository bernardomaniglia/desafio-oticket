// src/app/produtos/page.js
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 1. Lógica de validação: verifica se nome ou preço estão vazios
  const isFormInvalid = nome.trim() === "" || preco.trim() === "";

  const fetchProdutos = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setFeedback("Erro ao carregar produtos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;

    setFeedback("");

    try {
      await api.post("/produtos", { nome, preco: parseFloat(preco) });
      setFeedback("Produto cadastrado com sucesso!");
      setNome("");
      setPreco("");
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setFeedback("Erro ao cadastrar produto. Verifique os dados.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Produtos</h1>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Novo Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="preco"
              className="block text-sm font-medium text-gray-700"
            >
              Preço
            </label>
            <input
              type="number"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* 2. Botão modificado com a lógica de disabled */}
          <button
            type="submit"
            disabled={isFormInvalid}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Cadastrar
          </button>
        </form>
        {feedback && <p className="mt-4 text-sm text-green-600">{feedback}</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Produtos Cadastrados</h2>
        {isLoading ? (
          <p className="text-center">Carregando produtos...</p>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {produto.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {produto.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      R$ {produto.preco.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
