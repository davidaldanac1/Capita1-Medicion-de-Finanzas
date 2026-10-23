import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AuthLines } from '../layout/AuthLines';
import capita1Logo from '../../assets/capita1_logo.jpg';

export function SigninForm({ onRegister, onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onRegister?.({
        email,
        username,
        password,
      });
    }, 350);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col justify-center items-center px-4 sm:px-8 py-16 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Líneas horizontales de acento per rules.md */}
      <AuthLines />

      {/* Contenedor Principal Split (Izquierda: Branding | Derecha: Formulario de Sign In) */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-20">
        
        {/* Columna Izquierda: Branding Capita1 & Slogan */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left select-none">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            El control total
          </h1>

          <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mt-1 sm:mt-2 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            <span>de tu</span>

            <img
              src={capita1Logo}
              alt="Capita1"
              className="h-15 sm:h-18 lg:h-22 w-auto object-contain inline-block select-none"
            />
          </div>

          <div className="w-10 sm:w-12 h-1 bg-red-600 rounded-full mt-4 mb-6" />

          {/* Enlace Github davidaldanac1 */}
          <a
            href="https://github.com/davidaldanac1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <div className="p-1 rounded-full border border-white/30 group-hover:border-white transition-colors">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <span className="font-bold text-sm sm:text-base tracking-wide">
              davidaldanac1
            </span>
          </a>
        </div>

        {/* Columna Derecha: Tarjeta Exclusiva de SING IN per Captura 2 */}
        <div className="w-full max-w-sm sm:max-w-md rounded-[36px] border-2 border-white bg-black p-8 sm:p-10 shadow-2xl relative">
          
          {/* Header con flecha de retorno y título SING IN */}
          <div className="relative flex items-center justify-center mb-6">
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="absolute left-0 p-1 text-white hover:text-zinc-300 transition-colors cursor-pointer"
              title="Volver a Login"
            >
              <ArrowLeft size={24} />
            </button>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wider uppercase text-center">
              SIGN IN
            </h2>
          </div>

          {/* Formulario de registro */}
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Campo Correo */}
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-white tracking-wide block">
                Correo
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-full bg-white text-black font-semibold px-5 py-3 outline-none border-2 border-transparent focus:border-blue-600 transition-all text-sm"
              />
            </div>

            {/* Campo Username */}
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-white tracking-wide block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-full bg-white text-black font-semibold px-5 py-3 outline-none border-2 border-transparent focus:border-blue-600 transition-all text-sm"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-white tracking-wide block">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-full bg-white text-black font-semibold px-5 py-3 outline-none border-2 border-transparent focus:border-blue-600 transition-all text-sm"
              />
            </div>

            {/* Botón Primario Píldora: Fondo Azul con Borde Rojo per Design System */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-wider py-3.5 px-8 border-[3px] border-red-600 transition-all active:scale-95 cursor-pointer text-sm shadow-lg shadow-blue-950/40"
              >
                {loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
              </button>
            </div>

            {/* Enlace inferior de navegación a Login */}
            <div className="pt-3 text-center">
              <span className="text-xs text-white">ya tienes cuenta? </span>
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-xs text-blue-500 font-bold hover:underline cursor-pointer"
              >
                ingresa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
