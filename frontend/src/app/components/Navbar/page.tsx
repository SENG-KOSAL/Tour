'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
    
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.push('/');
  };

  const navLinks = [
    { label: 'Home', href: '/page/Home' },
    { label: 'Packages', href: '/page/Package' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];
  
  return (
    <nav className="bg-white shadow-md fixed w-full z-40 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 h-13 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-sky-600">TourGo</div>

          {/* Links */}
          <div className="hidden md:flex justify-center space-x-10 col-span-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 font-medium relative group transition"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-sky-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Login/Logout Button */}
          <div className="flex justify-end md:justify-end">
            
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hidden md:inline-block bg-red-500 text-white px-5 py-1.5 rounded-full font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <a
                href="/components/Login_register"
                className="hidden md:inline-block bg-sky-600 text-white px-5 py-1.5 rounded-full font-medium hover:bg-sky-700 transition"
              >
                Login
              </a>
            )}

            {/* Mobile menu icon */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-700 font-medium hover:text-sky-600 transition"
              >
                {link.label}
              </a>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block w-full bg-red-500 text-white text-center px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <a
                href="/components/Login_register"
                className="block bg-sky-600 text-white text-center px-4 py-2 rounded hover:bg-sky-700"
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
