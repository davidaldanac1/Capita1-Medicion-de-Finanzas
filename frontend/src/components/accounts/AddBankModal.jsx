import React, { useState } from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import capita1Logo from '../../assets/capita1_logo.jpg';
import bbvaCardImg from '../../assets/cards/bbva_card.png';
import plataCardImg from '../../assets/cards/plata_card.png';
import nuCardImg from '../../assets/cards/nu_card.png';
import klarCardImg from '../../assets/cards/klar_card.png';

// Bank definitions matching the 2x2 grid in the design capture
const AVAILABLE_BANKS = [
  {
    id: 'bbva',
    name: 'BBVA',
    fullName: 'BBVA Bancomer',
    image: bbvaCardImg,
    last4: '4892',
    defaultCreditLimit: 45000,
    defaultBalance: 24500,
    dualSupport: false,
  },
  {
    id: 'plata',
    name: 'Plata',
    fullName: 'Plata Card',
    image: plataCardImg,
    last4: '1044',
    defaultCreditLimit: 35000,
    defaultBalance: 0,
    dualSupport: false,
  },
  {
    id: 'nu',
    name: 'Nu',
    fullName: 'Nu Bank',
    image: nuCardImg,
    last4: '9012',
    defaultCreditLimit: 50000,
    defaultBalance: 12800,
    dualSupport: true,
  },
  {
    id: 'klar',
    name: 'Klar',
    fullName: 'Klar',
    image: klarCardImg,
    last4: '6731',
    defaultCreditLimit: 30000,
    defaultBalance: 18500,
    dualSupport: true,
  },
];

export function AddBankModal({
  isOpen = true,
  onClose,
  onAddAccount,
  onMenuClick,
  user,
}) {
  const [accountType, setAccountType] = useState('CREDIT'); // 'CREDIT' | 'DEBIT'
  const [selectedBankId, setSelectedBankId] = useState('bbva');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const bankInfo = AVAILABLE_BANKS.find((b) => b.id === selectedBankId) || AVAILABLE_BANKS[0];

    const newAccount = {
      id: `acc_${bankInfo.id}_${Date.now()}`,
      bank: bankInfo.id,
      name: `Cuenta ${bankInfo.name}`,
      type: accountType,
      last4: bankInfo.last4,
      holderName: (user?.name || user?.username || 'DAVID ALDANA').toUpperCase(),
      balance: accountType === 'DEBIT' ? bankInfo.defaultBalance : 0,
      creditLimit: accountType === 'CREDIT' ? bankInfo.defaultCreditLimit : 0,
      dualSupport: bankInfo.dualSupport,
    };

    onAddAccount?.(newAccount);
    onClose?.();
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col justify-center items-center px-4 py-8 overflow-hidden select-none selection:bg-blue-600 selection:text-white">
      {/* Líneas de acento verticales: Roja izquierda y Azul derecha per rules.md */}
      <div
        className="absolute top-0 bottom-0 left-14 sm:left-24 md:left-28 border-r-2 border-dashed border-red-600 pointer-events-none z-10 opacity-90"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 bottom-0 right-14 sm:right-24 md:right-28 border-l-2 border-dashed border-blue-600 pointer-events-none z-10 opacity-90"
        aria-hidden="true"
      />

      {/* Barra superior de iconos (Menú y Flecha de retorno) */}
      <div className="absolute top-6 left-0 right-0 z-20 flex items-center justify-between pointer-events-auto">
        {/* Icono de menú hamburguesa (a la izquierda de la línea roja) */}
        <div className="w-14 sm:w-24 md:w-28 flex items-center justify-center">
          <button
            type="button"
            onClick={onMenuClick}
            className="p-1.5 text-white hover:text-zinc-300 transition-colors cursor-pointer"
            title="Menú"
            aria-label="Menú"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Flecha de retorno (a la derecha de la línea roja) */}
        <div className="flex-1 flex items-center pl-3 sm:pl-5">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white hover:text-zinc-300 transition-colors cursor-pointer"
            title="Volver"
            aria-label="Volver"
          >
            <ArrowLeft size={28} />
          </button>
        </div>
      </div>

      {/* Contenido Central: Logo + Tarjeta de Registro */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center z-20">
        
        {/* Logo Capita1 Centrado Superior */}
        <div className="mb-4 sm:mb-6">
          <img
            src={capita1Logo}
            alt="Capita1"
            className="h-14 sm:h-16 w-auto object-contain select-none rounded-md"
          />
        </div>

        {/* Tarjeta con Borde Blanco per Captura de Diseño */}
        <div className="w-full rounded-[36px] border-2 border-white bg-black p-6 sm:p-8 shadow-2xl">
          
          {/* Título de la tarjeta */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase text-center mb-6">
            AGREGAR BANCO
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Sección: Tipo de cuenta */}
            <div>
              <label className="text-sm font-bold text-white tracking-wide block mb-2 text-left">
                Tipo de cuenta
              </label>

              {/* Botones Píldora: Crédito y Débito */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType('CREDIT')}
                  className={`py-2 px-4 rounded-full font-bold text-sm transition-all border cursor-pointer ${
                    accountType === 'CREDIT'
                      ? 'bg-blue-600 border-white text-white shadow-lg ring-2 ring-white/30'
                      : 'bg-blue-900/60 border-white/60 text-zinc-200 hover:bg-blue-800'
                  }`}
                >
                  Crédito
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('DEBIT')}
                  className={`py-2 px-4 rounded-full font-bold text-sm transition-all border cursor-pointer ${
                    accountType === 'DEBIT'
                      ? 'bg-blue-600 border-white text-white shadow-lg ring-2 ring-white/30'
                      : 'bg-blue-900/60 border-white/60 text-zinc-200 hover:bg-blue-800'
                  }`}
                >
                  Débito
                </button>
              </div>
            </div>

            {/* Sección: Banco (Rejilla 2x2 con Plásticos BBVA, Plata, Nu y Klar) */}
            <div>
              <label className="text-sm font-bold text-white tracking-wide block mb-2 text-left">
                Banco
              </label>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {AVAILABLE_BANKS.map((b) => {
                  const isSelected = selectedBankId === b.id;

                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBankId(b.id)}
                      role="button"
                      tabIndex={0}
                      className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 aspect-[1.58/1] flex items-center justify-center bg-zinc-900 ${
                        isSelected
                          ? 'border-blue-500 ring-4 ring-blue-500/40 scale-102 shadow-xl shadow-blue-950/60'
                          : 'border-white/10 hover:border-white/40 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={b.image}
                        alt={b.fullName}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-blue-500 ring-2 ring-white" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botón Primario Píldora: Azul con Borde Rojo per Design System */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-wider py-3.5 px-10 sm:px-14 border-[3px] border-red-600 transition-all active:scale-95 cursor-pointer text-sm shadow-xl shadow-blue-950/50"
              >
                AGREGAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
