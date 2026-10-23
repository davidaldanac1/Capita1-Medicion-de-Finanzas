import React from 'react';
import {
  PieChart,
  ArrowLeftRight,
  Tags,
  Target,
  FileText,
  CalendarDays,
  Percent,
  Calculator,
  ArrowLeft,
  Shield,
  Layers,
} from 'lucide-react';
import { BankCard } from '../accounts/BankCard';

export function AccountSidebar({
  currentAccount,
  accountType = 'DEBIT',
  activeTab = '',
  onSelectTab,
  onBackToAccounts,
  onToggleAccountType,
}) {
  const isDebit = accountType === 'DEBIT';

  // Sections defined in Section 4.B
  // DEBIT: Presupuesto, Transferencias, Categorías, Metas de Ahorro
  // CREDIT: Estado de Cuenta, Cortes y Pagos, Meses sin Intereses, Simulador
  const debitTabs = [
    { id: 'budget', label: 'Presupuesto', icon: PieChart, desc: 'Plan mensual vs gasto' },
    { id: 'transfers', label: 'Transferencias', icon: ArrowLeftRight, desc: 'Abonos y pagos de tarjeta' },
    { id: 'categories', label: 'Categorías', icon: Tags, desc: 'Fijos vs gastos hormiga' },
    { id: 'savings', label: 'Metas de Ahorro', icon: Target, desc: 'Objetivos y rendimientos' },
  ];

  const creditTabs = [
    { id: 'statement', label: 'Estado de Cuenta', icon: FileText, desc: 'Saldo al corte y movimientos' },
    { id: 'cuts', label: 'Cortes y Pagos', icon: CalendarDays, desc: 'Fechas límite y de corte' },
    { id: 'msi', label: 'Meses sin Intereses', icon: Percent, desc: 'Promociones activas a 0%' },
    { id: 'simulator', label: 'Simulador', icon: Calculator, desc: 'Pago mínimo vs para no generar int.' },
  ];

  const tabs = isDebit ? debitTabs : creditTabs;

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
      {/* Return button */}
      <button
        onClick={onBackToAccounts}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Volver a Cuentas y Tarjetas</span>
      </button>

      {/* Mini Active Card View */}
      {currentAccount && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400">
              Tarjeta Seleccionada
            </span>
            {currentAccount.dualSupport && (
              <button
                onClick={onToggleAccountType}
                className="text-[10px] font-bold uppercase text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                Cambiar a {isDebit ? 'Crédito' : 'Débito'}
              </button>
            )}
          </div>
          <div className="transform scale-95 origin-top-left -mb-4">
            <BankCard account={{ ...currentAccount, type: accountType }} selected />
          </div>
        </div>
      )}

      {/* Navigation Modules */}
      <div className="rounded-3xl bg-zinc-900/80 border border-white/10 p-4 space-y-2">
        <div className="px-3 py-1 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-400">
            {isDebit ? 'Módulos de Débito' : 'Módulos de Crédito'}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
            {isDebit ? 'Liquidez' : 'Financiamiento'}
          </span>
        </div>

        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab?.(tab.id)}
                className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30 font-bold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="truncate">
                  <div className="text-sm font-bold truncate leading-tight">
                    {tab.label}
                  </div>
                  <div
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-blue-100' : 'text-zinc-500'
                    }`}
                  >
                    {tab.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Security note */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 text-[11px] text-zinc-500 flex items-start gap-2.5">
        <Shield size={16} className="text-blue-500 mt-0.5 shrink-0" />
        <span>
          Cuentas aisladas con verificación estricta `user_id == current_user.id`.
        </span>
      </div>
    </aside>
  );
}

