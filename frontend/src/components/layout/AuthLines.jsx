import React from 'react';

/**
 * AuthLines - Líneas de acento horizontales para autenticación (Login / Sign In)
 * Según rules.md y capturas de diseño:
 * Dos líneas horizontales punteadas que cruzan la pantalla de extremo a extremo:
 * - Roja arriba (border-red-600)
 * - Azul abajo (border-blue-600)
 */
export function AuthLines() {
  return (
    <>
      <div
        className="absolute top-10 sm:top-14 left-0 right-0 border-t-2 border-dashed border-red-600 opacity-90 pointer-events-none select-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 sm:bottom-14 left-0 right-0 border-t-2 border-dashed border-blue-600 opacity-90 pointer-events-none select-none z-10"
        aria-hidden="true"
      />
    </>
  );
}
