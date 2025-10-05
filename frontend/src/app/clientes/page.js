// src/app/clientes/page.js
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isFormInvalid = nome.trim() === "" || email.trim() === "";

  const fetchClientes = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setFeedback("Erro ao carregar clientes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;
    setFeedback("");
    try {
      await api.post("/clientes", { nome, email });
      setFeedback("Cliente cadastrado com sucesso!");
      setNome("");
      setEmail("");
      fetchClientes();
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      setFeedback("Erro ao cadastrar cliente.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Gerenciamento de Clientes
      </h1>

      {/* Formulário com tema escuro */}
      <div className="mb-8 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Novo Cliente</h2>
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

      {/* Lista de Clientes com o novo estilo de Card Claro */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Clientes Cadastrados
        </h2>
        {isLoading ? (
          <p className="text-center">Carregando clientes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="bg-gray-100 text-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h3 className="font-bold text-lg text-green-800 truncate">
                  {cliente.nome}
                </h3>
                <p className="text-sm text-gray-600 mb-3">ID: {cliente.id}</p>
                <div className="border-t border-gray-300 pt-3">
                  <p className="text-sm truncate">{cliente.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
