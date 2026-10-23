import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { formatMoney, formatDate } from '../../lib/formatters';
import { useDebounce } from '../../hooks/useDebounce';

export function TransactionsTable({ accountType = 'DEBIT', transactions = [] }) {
  const isDebit = accountType === 'DEBIT';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'ANT' | 'FIXED'

  const debouncedSearch = useDebounce(searchTerm, 250);

  // Default transactions if none provided
  const list = useMemo(() => {
    if (transactions && transactions.length > 0) return transactions;

    if (isDebit) {
      return [
        {
          id: '1',
          description: 'Depósito de Nómina Quincenal',
          category: 'Ingresos',
          amount: 22500,
          type: 'INCOME',
          is_fixed: true,
          is_ant_expense: false,
          date: '2026-10-15T09:00:00Z',
        },
        {
          id: '2',
          description: 'Pago Renta Departamento',
          category: 'Vivienda',
          amount: -9500,
          type: 'EXPENSE',
          is_fixed: true,
          is_ant_expense: false,
          date: '2026-10-16T12:30:00Z',
        },
        {
          id: '3',
          description: 'Starbucks Coffee Plaza Central',
          category: 'Entretenimiento',
          amount: -125,
          type: 'EXPENSE',
          is_fixed: false,
          is_ant_expense: true,
          date: '2026-10-17T16:15:00Z',
        },
        {
          id: '4',
          description: 'Supermercado City Market',
          category: 'Alimentación',
          amount: -2450,
          type: 'EXPENSE',
          is_fixed: true,
          is_ant_expense: false,
          date: '2026-10-18T18:00:00Z',
        },
        {
          id: '5',
          description: 'Oxxo Snacks y Refresco',
          category: 'Gastos Hormiga',
          amount: -85,
          type: 'EXPENSE',
          is_fixed: false,
          is_ant_expense: true,
          date: '2026-10-19T20:45:00Z',
        },
        {
          id: '6',
          description: 'Pago Tarjeta de Crédito Nu (Abono)',
          category: 'Transferencia Interna',
          amount: -5000,
          type: 'CREDIT_CARD_PAYMENT',
          is_fixed: false,
          is_ant_expense: false,
          date: '2026-10-20T11:00:00Z',
        },
      ];
    } else {
      return [
        {
          id: 'c1',
          description: 'Apple Store — MacBook Air M3 (MSI 1/12)',
          category: 'Tecnología',
          amount: 2199,
          type: 'MSI',
          is_fixed: true,
          is_ant_expense: false,
          date: '2026-10-10T14:30:00Z',
        },
        {
          id: 'c2',
          description: 'Restaurante Sonora Grill',
          category: 'Restaurantes',
          amount: 1850,
          type: 'REVOLVING',
          is_fixed: false,
          is_ant_expense: false,
          date: '2026-10-14T21:00:00Z',
        },
        {
          id: 'c3',
          description: 'Suscripción Uber Pass / Didi Food',
          category: 'Suscripciones',
          amount: 249,
          type: 'REVOLVING',
          is_fixed: false,
          is_ant_expense: true,
          date: '2026-10-16T08:00:00Z',
        },
        {
          id: 'c4',
          description: 'Abono Recibido desde Cuenta BBVA',
          category: 'Transferencia Interna',
          amount: -5000,
          type: 'CREDIT_CARD_PAYMENT',
          is_fixed: false,
          is_ant_expense: false,
          date: '2026-10-20T11:00:00Z',
        },
        {
          id: 'c5',
          description: 'Gasolinera Pemex Insurgentes',
          category: 'Transporte',
          amount: 950,
          type: 'REVOLVING',
          is_fixed: true,
          is_ant_expense: false,
          date: '2026-10-21T07:45:00Z',
        },
      ];
    }
  }, [transactions, isDebit]);

  const filtered = useMemo(() => {
    return list.filter((t) => {
      const matchSearch =
        t.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        t.category.toLowerCase().includes(debouncedSearch.toLowerCase());

      if (!matchSearch) return false;

      if (filterType === 'ANT') return t.is_ant_expense;
      if (filterType === 'FIXED') return t.is_fixed;
      return true;
    });
  }, [list, debouncedSearch, filterType]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-850 to-zinc-900 border border-white/10 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">
            Panel Panorámico 2 — Auditoría de Movimientos
          </span>
          <h3 className="text-xl font-extrabold text-white">
            {isDebit ? 'Historial de Movimientos y Pagos' : 'Cargos Revolventes, MSI y Abonos'}
          </h3>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar movimiento..."
              className="w-full rounded-full bg-zinc-800 text-white placeholder-zinc-500 text-xs pl-10 pr-4 py-2.5 border border-white/10 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-zinc-800 p-1 rounded-full border border-white/10">
            <button
              type="button"
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterType === 'ALL' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setFilterType('ANT')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filterType === 'ANT' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles size={11} /> Hormiga
            </button>
            <button
              type="button"
              onClick={() => setFilterType('FIXED')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterType === 'FIXED' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Fijos
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-extrabold uppercase tracking-wider text-zinc-400">
              <th className="py-3 px-4">Fecha</th>
              <th className="py-3 px-4">Concepto / Comercio</th>
              <th className="py-3 px-4">Categoría</th>
              <th className="py-3 px-4">Clasificación</th>
              <th className="py-3 px-4 text-right">Monto (MXN)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-zinc-500 text-sm">
                  No se encontraron movimientos coincidentes con el filtro.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isIncome = item.type === 'INCOME';
                const isPayment = item.type === 'CREDIT_CARD_PAYMENT';
                const isAnt = item.is_ant_expense;

                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Fecha */}
                    <td className="py-3.5 px-4 text-xs font-mono text-zinc-400 whitespace-nowrap">
                      {formatDate(item.date)}
                    </td>

                    {/* Concepto */}
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        {isIncome ? (
                          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                            <ArrowDownLeft size={14} />
                          </div>
                        ) : isPayment ? (
                          <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
                            <RefreshCw size={14} />
                          </div>
                        ) : (
                          <div className="p-1 rounded-full bg-zinc-800 text-zinc-400">
                            <ArrowUpRight size={14} />
                          </div>
                        )}
                        <span className="truncate max-w-[280px]">{item.description}</span>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="py-3.5 px-4 text-xs text-zinc-300">
                      <span className="flex items-center gap-1.5">
                        <Tag size={12} className="text-zinc-500" />
                        {item.category}
                      </span>
                    </td>

                    {/* Clasificación */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {isAnt && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-500/30 flex items-center gap-0.5">
                            <Sparkles size={9} /> Hormiga
                          </span>
                        )}
                        {item.is_fixed && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-white/10">
                            Fijo
                          </span>
                        )}
                        {isPayment && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30 flex items-center gap-0.5">
                            <ShieldCheck size={9} /> Transf. Interna
                          </span>
                        )}
                        {item.type === 'MSI' && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                            MSI 0%
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Monto */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold whitespace-nowrap">
                      <span
                        className={
                          isIncome
                            ? 'text-emerald-400'
                            : isPayment
                            ? 'text-blue-400'
                            : isAnt
                            ? 'text-amber-400'
                            : 'text-zinc-100'
                        }
                      >
                        {isIncome ? '+' : ''}
                        {formatMoney(item.amount)}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

