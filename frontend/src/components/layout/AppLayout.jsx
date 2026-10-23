import React from 'react';
import { LogOut, User, DollarSign, Wallet } from 'lucide-react';
import { DecorativeDivider } from './DecorativeDivider';
import { formatMoney } from '../../lib/formatters';
import capita1Logo from '../../assets/capita1_logo.jpg';

export function AppLayout({
  children,
  user,
  netWorth = 145800,
  onLogout,
  showDivider = false,
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="w-full border-b border-white/10 bg-black/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img
              src={capita1Logo}
              alt="Capita1"
              className="h-15 sm:h-8 lg:h-12 w-auto object-contain inline-block select-none"
           />
          </div>

          {/* User info & Net worth quick indicator */}
          <div className="flex items-center gap-3 sm:gap-6">
            {user && (
              <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs">
                <span className="text-zinc-400">Patrimonio Neto:</span>
                <span className="font-mono font-extrabold text-emerald-400">
                  {formatMoney(netWorth)}
                </span>
              </div>
            )}

            {user && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 text-xs text-zinc-200">
                  <User size={14} className="text-blue-400" />
                  <span className="font-semibold truncate max-w-[120px]">{user.name || user.email}</span>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  title="Cerrar sesión"
                  className="p-2 rounded-full text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-4 text-center text-xs text-zinc-500">
        <p>Capita1 © 2026 — Arquitectura Financiera de Alto Desempeño</p>
      </footer>
    </div>
  );
}

