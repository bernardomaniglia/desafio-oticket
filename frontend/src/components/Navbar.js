// src/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/clientes" className="text-white text-lg font-bold">
          Mini Pedidos
        </Link>
        <div className="space-x-4">
          <Link href="/clientes" className="text-gray-300 hover:text-white">Clientes</Link>
          <Link href="/produtos" className="text-gray-300 hover:text-white">Produtos</Link>
          <Link href="/pedidos" className="text-gray-300 hover:text-white">Pedidos</Link>
        </div>
      </div>
    </nav>
  );
}