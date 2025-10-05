// src/app/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/clientes");
  };

  return (
    // Fundo da página agora usa o mesmo cinza escuro global
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      {/* Card do formulário com tema escuro */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <div className="flex justify-center">
          <Image
            src="/logo-oticket.png"
            alt="Oticket Logo"
            width={150}
            height={50}
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-white">
          Acesse a Plataforma
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="********"
            />
          </div>

          <div>
            {/* Botão atualizado para a cor verde */}
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
