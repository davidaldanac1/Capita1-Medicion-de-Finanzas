import React from 'react';
import {
  Wallet,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  CheckCircle,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';
import { formatMoney, formatPercentage } from '../../lib/formatters';

export function KpiGroup({ accountType = 'DEBIT', data = {} }) {
  const isDebit = accountType === 'DEBIT';

  if (isDebit) {
    const {
      availableBalance = 0,
      fixedIncome = 0,
      variableIncome = 0,
      fixedExpenses = 0,
      antExpenses = 0,
    } = data;

    const totalIncome = Number(fixedIncome) + Number(variableIncome);
    const totalExpenses = Number(fixedExpenses) + Number(antExpenses);
    const antExpenseRatio = totalExpenses > 0 ? (antExpenses / totalExpenses) * 100 : 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KPI 1: Saldo Disponible Actual */}
        <div className="rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-white/10 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              1. Saldo Disponible Actual
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Wallet size={22} />
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
              {formatMoney(availableBalance)}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Liquidez inmediata disponible
            </div>
          </div>
        </div>

        {/* KPI 2: Ingresos del Mes (Fijos vs Variables) */}
        <div className="rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-white/10 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              2. Ingresos del Mes
            </span>
            <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400">
              <TrendingUp size={22} />
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
              {formatMoney(totalIncome)}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-xs">
              <div>
                <span className="text-zinc-500 block">Fijos (Nómina):</span>
                <span className="text-zinc-200 font-semibold font-mono">{formatMoney(fixedIncome)}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Variables:</span>
                <span className="text-zinc-200 font-semibold font-mono">{formatMoney(variableIncome)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 3: Gastos Totales (Fijos vs Hormiga) */}
        <div className="rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-white/10 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              3. Gastos Totales
            </span>
            <div className="p-2.5 rounded-2xl bg-red-500/20 text-red-400">
              <AlertTriangle size={22} />
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
              {formatMoney(totalExpenses)}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-xs">
              <div>
                <span className="text-zinc-500 block">Fijos indispensables:</span>
                <span className="text-zinc-200 font-semibold font-mono">{formatMoney(fixedExpenses)}</span>
              </div>
              <div>
                <span className="text-amber-400 block font-semibold flex items-center gap-1">
                  <Sparkles size={11} /> Gastos Hormiga:
                </span>
                <span className="text-amber-300 font-bold font-mono">
                  {formatMoney(antExpenses)} ({antExpenseRatio.toFixed(0)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CREDIT VIEW
  const {
    accumulatedDebt = 0,
    creditLimit = 0,
    daysUntilCut = 5,
    daysUntilPayment = 25,
  } = data;

  const remainingAvailable = Math.max(0, creditLimit - accumulatedDebt);
  const usagePercentage = creditLimit > 0 ? (accumulatedDebt / creditLimit) * 100 : 0;

  // Semáforo de riesgo: < 30% óptimo, 30-50% preventivo, > 50% crítico
  const isOptimal = usagePercentage < 30;
  const isModerate = usagePercentage >= 30 && usagePercentage <= 50;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* KPI 1: Deuda Acumulada al Periodo */}
      <div className="rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-white/10 p-6 flex flex-col justify-between shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            1. Deuda Acumulada
          </span>
          <div className="p-2.5 rounded-2xl bg-red-500/20 text-red-400">
            <CreditCard size={22} />
          </div>
        </div>
        <div>
          <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
            {formatMoney(accumulatedDebt)}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
            <span>Línea total autorizada:</span>
            <span className="font-mono text-zinc-200 font-semibold">{formatMoney(creditLimit)}</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Línea Disponible Restante */}
      <div className="rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-white/10 p-6 flex flex-col justify-between shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            2. Línea Disponible Restante
          </span>
          <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400">
            <Wallet size={22} />
          </div>
        </div>
        <div>
          <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
            {formatMoney(remainingAvailable)}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-blue-400 font-semibold">
            <CheckCircle size={14} />
            Disponible para compras y MSI
          </div>
        </div>
      </div>

      {/* KPI 3: Porcentaje de Uso y Semáforo + Días de Corte y Pago */}
      <div className="rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-white/10 p-6 flex flex-col justify-between shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            3. Semáforo de Uso & Fechas
          </span>
          <span
            className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              isOptimal
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : isModerate
                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                : 'bg-red-950 text-red-300 border border-red-500/40'
            }`}
          >
            {isOptimal ? 'Óptimo (<30%)' : isModerate ? 'Moderado' : 'Alto Riesgo'}
          </span>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl lg:text-4xl font-extrabold text-white font-mono">
              {formatPercentage(usagePercentage)}
            </span>
            <span className="text-xs text-zinc-400">Ratio de utilización</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden mb-4 border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOptimal ? 'bg-emerald-500' : isModerate ? 'bg-amber-500' : 'bg-red-600'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, usagePercentage))}%` }}
            />
          </div>

          {/* Días para corte y pago */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Calendar size={13} className="text-zinc-500" />
              <span>Corte: <strong>{daysUntilCut} días</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Clock size={13} className="text-zinc-500" />
              <span>Pago: <strong>{daysUntilPayment} días</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

