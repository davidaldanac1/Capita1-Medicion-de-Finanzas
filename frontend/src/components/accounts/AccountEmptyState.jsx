import React from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import capita1Logo from '../../assets/capita1_logo.jpg';

export function AccountEmptyState({
  username = 'davidaldanac1',
  onAddBank,
  onBack,
  onMenuClick,
}) {
  return (
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col justify-center items-center px-4 overflow-hidden select-none selection:bg-blue-600 selection:text-white">
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
            aria-label="Abrir menú"
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
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4 py-12 z-20">
        
        {/* Título: Bienvenido a */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2 sm:mb-4">
          Bienvenido a
        </h1>

        {/* Fila: Logo Capita1 + Dos puntos + Nombre de usuario */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          <img
            src={capita1Logo}
            alt="Capita1"
            className="h-12 sm:h-18 lg:h-22 w-auto object-contain select-none"
          />
          <span className="text-white font-black leading-none">: {username}</span>
        </div>

        {/* Subtítulo en cursiva */}
        <p className="text-white font-bold italic text-base sm:text-xl lg:text-2xl mt-6 sm:mt-8 mb-8 sm:mb-10 tracking-wide">
          No tienes ningun banco/cuenta agregad@
        </p>

        {/* Botón Primario Píldora: Azul con Borde Rojo per Design System */}
        <button
          type="button"
          onClick={onAddBank}
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-wider py-3.5 sm:py-4 px-8 sm:px-12 border-[3px] border-red-600 transition-all active:scale-95 cursor-pointer text-sm sm:text-base shadow-xl shadow-blue-950/50"
        >
          AGREGAR BANCO
        </button>
      </div>
    </div>
  );
}
