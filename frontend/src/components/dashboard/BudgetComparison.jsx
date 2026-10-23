import React, { useState } from 'react';
import {
  PieChart,
  Layers,
  Sparkles,
  Calculator,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { formatMoney } from '../../lib/formatters';

export function BudgetComparison({ accountType = 'DEBIT', data = {} }) {
  const isDebit = accountType === 'DEBIT';

  // State for credit simulator
  const [simulatorMode, setSimulatorMode] = useState('full'); // 'full' or 'minimum'

  if (isDebit) {
    // Panel Panorámico 1: Presupuesto vs Real por Categorías
    const categories = data.categories || [
      { name: 'Vivienda y Servicios', budgeted: 12000, spent: 11500, color: 'bg-blue-500' },
      { name: 'Alimentación y Supermercado', budgeted: 8000, spent: 7420, color: 'bg-emerald-500' },
      { name: 'Transporte y Gasolina', budgeted: 4000, spent: 4850, color: 'bg-amber-500' },
      { name: 'Entretenimiento y Salidas', budgeted: 3500, spent: 3900, color: 'bg-purple-500' },
      { name: 'Gastos Hormiga (Cafés, Snacks)', budgeted: 1500, spent: 2200, color: 'bg-red-500', isAnt: true },
    ];

    const totalBudget = categories.reduce((acc, cat) => acc + cat.budgeted, 0);
    const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);

    return (
      <div className="rounded-3xl bg-gradient-to-br from-zinc-850 to-zinc-900 border border-white/10 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400">
              <PieChart size={24} />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">
                Panel Panorámico 1 — Presupuesto vs. Real
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Distribución y Desviación por Categorías
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-white/5">
              <span className="text-zinc-400 block">Total Asignado:</span>
              <span className="text-white font-bold">{formatMoney(totalBudget)}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-white/5">
              <span className="text-zinc-400 block">Total Ejercido:</span>
              <span className="text-white font-bold">{formatMoney(totalSpent)}</span>
            </div>
          </div>
        </div>

        {/* Categories Bar Breakdown */}
        <div className="space-y-4">
          {categories.map((cat, idx) => {
            const pct = cat.budgeted > 0 ? (cat.spent / cat.budgeted) * 100 : 0;
            const isOver = pct > 100;

            return (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-800/40 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                    <span className="font-bold text-sm text-white flex items-center gap-1.5">
                      {cat.name}
                      {cat.isAnt && (
                        <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/30 flex items-center gap-0.5">
                          <Sparkles size={10} /> Hormiga
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-mono text-zinc-300 font-bold">{formatMoney(cat.spent)}</span>
                    <span className="text-zinc-500 font-mono"> / {formatMoney(cat.budgeted)}</span>
                    <span className={`ml-2 font-mono font-bold ${isOver ? 'text-red-400' : 'text-emerald-400'}`}>
                      ({pct.toFixed(0)}%)
                    </span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOver ? 'bg-red-500' : cat.color
                    }`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // CREDIT: Panel Panorámico 1 — Compras Revolventes vs MSI + Simulador
  const revolving = data.revolvingDebt || 14250;
  const msi = data.msiDebt || 9800;
  const totalDebt = revolving + msi;
  const minPayment = (revolving * 0.05) + (msi * 0.2);
  const fullPayment = totalDebt;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-850 to-zinc-900 border border-white/10 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400">
            <Layers size={24} />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">
              Panel Panorámico 1 — Deuda Revolvente vs. MSI
            </span>
            <h3 className="text-xl font-extrabold text-white">
              Estructura de la Deuda y Simulador de Pago
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase bg-blue-950 text-blue-300 px-3 py-1 rounded-full border border-blue-800/40 font-bold">
            Corte Próximo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Desglose Revolvente vs MSI */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            Desglose de la Deuda
          </h4>

          {/* Tarjeta Revolvente */}
          <div className="p-5 rounded-2xl bg-zinc-800/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Compras Revolventes (Ordinarias)</span>
              <span className="text-base font-extrabold font-mono text-red-400">
                {formatMoney(revolving)}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Compras directas sujetas a tasa de interés ordinaria si no se liquidan antes de la fecha límite de pago.
            </p>
          </div>

          {/* Tarjeta MSI */}
          <div className="p-5 rounded-2xl bg-zinc-800/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Meses sin Intereses (MSI)</span>
              <span className="text-base font-extrabold font-mono text-amber-300">
                {formatMoney(msi)}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Cargos parciales mensuales congelados a tasa 0% anual. Mensualidades activas: 3 promociones.
            </p>
          </div>
        </div>

        {/* Simulador de Liquidación */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calculator size={18} className="text-blue-400" />
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
                Simulador de Liquidación Digitt
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-800/80 rounded-full mb-4">
              <button
                type="button"
                onClick={() => setSimulatorMode('full')}
                className={`py-1.5 text-xs font-extrabold rounded-full transition-all cursor-pointer ${
                  simulatorMode === 'full'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                No Generar Intereses
              </button>
              <button
                type="button"
                onClick={() => setSimulatorMode('minimum')}
                className={`py-1.5 text-xs font-extrabold rounded-full transition-all cursor-pointer ${
                  simulatorMode === 'minimum'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Pago Mínimo
              </button>
            </div>

            {simulatorMode === 'full' ? (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-zinc-400">Pago para no generar intereses:</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {formatMoney(fullPayment)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                  <span>
                    <strong>Recomendación óptima:</strong> Al liquidar este importe completo ahorras 100% de intereses financieros ordinarios e IVA.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-zinc-400">Pago mínimo sugerido:</span>
                  <span className="text-2xl font-black font-mono text-amber-400">
                    {formatMoney(minPayment)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/20 text-xs text-red-300 flex items-start gap-2">
                  <ArrowRight size={16} className="mt-0.5 shrink-0 text-red-400" />
                  <span>
                    <strong>Alerta de Costo:</strong> Pagar solo el mínimo activa intereses revolventes sobre el saldo insoluto (~65% CAT promedio).
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span>Fecha Límite: 28 de cada mes</span>
            <span className="font-semibold text-white">Recordatorio activado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

