import React from 'react';
import { Menu, ArrowLeft, CreditCard, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';
import capita1Logo from '../../assets/capita1_logo.jpg';
import { CARD_IMAGES } from './AccountGrid';
import { Modal } from '../ui/Modal';

export function AccountTypeModal({
  isOpen = true,
  onClose,
  account,
  username = 'davidaldanac1',
  onSelectType,
  onMenuClick,
  isModal = false,
}) {
  if (!account || !isOpen) return null;

  const cardImg = account.image || CARD_IMAGES[account.bank?.toLowerCase()] || CARD_IMAGES.nu;

  // Si se invoca explícitamente en modo popup/modal
  if (isModal) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Selecciona la Modalidad de Cuenta">
        <div className="space-y-5">
          {/* Imagen de la tarjeta bancaria */}
          <div className="w-full max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl aspect-[1.58/1]">
            <img src={cardImg} alt={account.name} className="w-full h-full object-cover" />
          </div>

          <p className="text-sm text-zinc-400 text-center">
            La entidad <span className="text-white font-bold">{account.name}</span> dispone de modalidad dual. Selecciona el panel a gestionar:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onSelectType('CREDIT')}
              className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 border-2 border-white text-white font-bold text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shadow-lg"
            >
              <CreditCard size={22} />
              <span className="text-base font-extrabold uppercase">Crédito</span>
              <span className="text-xs text-blue-100 font-normal">Línea revolvente y deudas</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectType('DEBIT')}
              className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 border-2 border-white text-white font-bold text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shadow-lg"
            >
              <Wallet size={22} />
              <span className="text-base font-extrabold uppercase">Débito</span>
              <span className="text-xs text-blue-100 font-normal">Saldos propios y liquidez</span>
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // Vista a pantalla completa per Captura 2
  return (
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col justify-center items-center px-4 py-8 overflow-hidden select-none selection:bg-blue-600 selection:text-white">
      {/* Líneas de acento verticales: Roja izquierda y Azul derecha per captura y rules.md */}
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

      {/* Contenido Central */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 z-20">
        
        {/* Título: Bienvenido a */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2 sm:mb-4">
          Bienvenido a
        </h1>

        {/* Fila: Logo Capita1 + Dos puntos + Nombre de usuario */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          <img
            src={capita1Logo}
            alt="Capita1"
            className="h-12 sm:h-16 lg:h-20 w-auto object-contain select-none"
          />
          <span className="text-white font-black leading-none">: {username}</span>
        </div>

        {/* Subtítulo en cursiva per Captura 2 */}
        <p className="text-white font-bold italic text-base sm:text-xl lg:text-2xl mt-4 sm:mt-6 mb-8 sm:mb-10 tracking-wide">
          Selecciona el tipo de cuenta
        </p>

        {/* Fila Principal: Imagen de la Tarjeta (Izquierda) + Botones de Selección (Derecha) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-2xl">
          
          {/* Lado Izquierdo: Imagen de la tarjeta bancaria */}
          <div className="w-full max-w-sm rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl aspect-[1.58/1] bg-zinc-950 flex items-center justify-center">
            <img
              src={cardImg}
              alt={account.name}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>

          {/* Lado Derecho: Botones Píldora Crédito y Débito per Captura 2 */}
          <div className="flex flex-col gap-5 w-full max-w-xs">
            {/* Botón Crédito */}
            <button
              type="button"
              onClick={() => onSelectType('CREDIT')}
              className="group w-full py-3.5 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-wider text-base border-2 border-white shadow-xl shadow-blue-950/60 transition-all hover:scale-102 active:scale-95 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>Crédito</span>
              <span className="text-[11px] font-normal lowercase tracking-normal text-blue-200 mt-0.5">
                pasivo &bull; línea revolvente
              </span>
            </button>

            {/* Botón Débito */}
            <button
              type="button"
              onClick={() => onSelectType('DEBIT')}
              className="group w-full py-3.5 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-wider text-base border-2 border-white shadow-xl shadow-blue-950/60 transition-all hover:scale-102 active:scale-95 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>Débito</span>
              <span className="text-[11px] font-normal lowercase tracking-normal text-blue-200 mt-0.5">
                activo &bull; liquidez inmediata
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
