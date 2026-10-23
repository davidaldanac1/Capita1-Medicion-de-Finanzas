import React from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import capita1Logo from '../../assets/capita1_logo.jpg';
import bbvaCardImg from '../../assets/cards/bbva_card.png';
import plataCardImg from '../../assets/cards/plata_card.png';
import nuCardImg from '../../assets/cards/nu_card.png';
import klarCardImg from '../../assets/cards/klar_card.png';

export const CARD_IMAGES = {
  bbva: bbvaCardImg,
  plata: plataCardImg,
  nu: nuCardImg,
  klar: klarCardImg,
};

export function AccountGrid({
  accounts = [],
  username = 'davidaldanac1',
  selectedAccountId,
  onSelectAccount,
  onAddBank,
  onBack,
  onMenuClick,
}) {
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

        {/* Flecha de retorno (inmediatamente a la derecha de la línea roja) */}
        <div className="flex-1 flex items-center pl-3 sm:pl-5">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 text-white hover:text-zinc-300 transition-colors cursor-pointer"
            title="Volver"
            aria-label="Volver"
          >
            <ArrowLeft size={28} />
          </button>
        </div>
      </div>

      {/* Contenido Central */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4 z-20">
        
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

        {/* Subtítulo en cursiva per Captura 1 */}
        <p className="text-white font-bold italic text-base sm:text-xl lg:text-2xl mt-4 sm:mt-6 mb-6 sm:mb-8 tracking-wide">
          Selecciona un(a) banco/cuenta
        </p>

        {/* Rejilla 2x2 con las Tarjetas Bancarias per Captura 1 */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg mb-8">
          {accounts.map((acc) => {
            const cardImg = acc.image || CARD_IMAGES[acc.bank?.toLowerCase()] || CARD_IMAGES.bbva;
            const isSelected = selectedAccountId === acc.id;

            return (
              <div
                key={acc.id}
                onClick={() => onSelectAccount?.(acc)}
                role="button"
                tabIndex={0}
                className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 aspect-[1.58/1] flex items-center justify-center bg-zinc-950 shadow-2xl group ${
                  isSelected
                    ? 'border-blue-500 ring-4 ring-blue-500/50 scale-102 shadow-blue-900/50'
                    : 'border-white/10 hover:border-white/60 hover:scale-102 hover:shadow-white/10'
                }`}
              >
                <img
                  src={cardImg}
                  alt={acc.name || acc.bank}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badge indicador de modalidad dual */}
                {acc.dualSupport && (
                  <span className="absolute top-2 right-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    Dual
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Botón Píldora: Azul con Borde Rojo AGREGAR BANCO per Design System */}
        <button
          type="button"
          onClick={onAddBank}
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-wider py-3.5 sm:py-4 px-10 sm:px-14 border-[3px] border-red-600 transition-all active:scale-95 cursor-pointer text-sm sm:text-base shadow-xl shadow-blue-950/50"
        >
          AGREGAR BANCO
        </button>
      </div>
    </div>
  );
}
