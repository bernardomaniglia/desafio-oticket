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
      setFeedback("Erro ao cadastrar produto.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Gerenciamento de Produtos
      </h1>

      {/* Formulário com tema escuro */}
      <div className="mb-8 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Novo Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-300"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="preco"
              className="block text-sm font-medium text-gray-300"
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
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={isFormInvalid}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Cadastrar
          </button>
        </form>
        {feedback && (
          <p
            className={`mt-4 text-sm ${
              feedback.includes("sucesso") ? "text-green-500" : "text-red-400"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>

      {/* Lista de Produtos com o novo estilo de Card Claro */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Produtos Cadastrados
        </h2>
        {isLoading ? (
          <p className="text-center">Carregando produtos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="bg-gray-100 text-gray-800 p-6 rounded-lg shadow-lg flex flex-col"
              >
                <h3 className="font-bold text-lg text-green-800 truncate mb-2 flex-grow">
                  {produto.nome}
                </h3>
                <div className="border-t border-gray-300 pt-3 mt-auto">
                  <p className="text-2xl font-semibold text-gray-900">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
