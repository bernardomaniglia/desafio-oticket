// src/app/clientes/page.js
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api"; // Nosso cliente Axios configurado

export default function ClientesPage() {
  // Estado para armazenar a lista de clientes
  const [clientes, setClientes] = useState([]);

  // Estados para os campos do formulário de novo cliente
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // Estado para feedback ao usuário
  const [feedback, setFeedback] = useState("");

  // Função para buscar os clientes da API
  const fetchClientes = async () => {
    try {
      const response = await api.get("/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setFeedback("Erro ao carregar clientes.");
    }
  };

  // useEffect para buscar os clientes assim que a página carregar
  useEffect(() => {
    fetchClientes();
  }, []);

  // Função para lidar com o envio do formulário de novo cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    try {
      // Envia os dados para a API
      await api.post("/clientes", { nome, email });
      setFeedback("Cliente cadastrado com sucesso!");

      // Limpa os campos do formulário
      setNome("");
      setEmail("");

      // Atualiza a lista de clientes para mostrar o novo
      fetchClientes();
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      setFeedback("Erro ao cadastrar cliente. Verifique os dados.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Clientes</h1>

      {/* Formulário de Cadastro */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Novo Cliente</h2>
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </form>
        {feedback && <p className="mt-4 text-sm text-green-600">{feedback}</p>}
      </div>

      {/* Lista de Clientes */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Clientes Cadastrados</h2>
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
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}