// src/components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaUserFriends, FaBoxOpen, FaClipboardList } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/clientes", text: "Clientes", icon: <FaUserFriends size={20} /> },
    { href: "/produtos", text: "Produtos", icon: <FaBoxOpen size={20} /> },
    { href: "/pedidos", text: "Pedidos", icon: <FaClipboardList size={20} /> },
  ];

  return (
    <nav className="bg-green-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo-oticket.png"
            alt="Oticket Logo"
            width={120}
            height={60}
          />
        </Link>

        {/* Links de Navegação */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                  ${
                    isActive
                      ? "bg-white text-green-800 shadow-inner"
                      : "text-gray-300 hover:bg-green-700 hover:text-white"
                  }`}
              >
                {link.icon}
                <span className="ml-2 hidden md:block">{link.text}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
