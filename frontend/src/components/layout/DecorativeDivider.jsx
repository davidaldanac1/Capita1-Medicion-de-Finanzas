import React from 'react';
import { cn } from '../../lib/utils';

/**
 * DecorativeDivider - Líneas de acento verticales para pantallas internas
 * Según rules.md: Dos líneas verticales punteadas, roja a la izquierda y azul a la derecha.
 */
export function DecorativeDivider({ className = '' }) {
  return (
    <div className={cn("hidden lg:flex items-stretch gap-1.5 px-3 self-stretch select-none pointer-events-none", className)} aria-hidden="true">
      <div className="h-full border-r-2 border-dashed border-red-600 opacity-90" />
      <div className="h-full border-r-2 border-dashed border-blue-600 opacity-90" />
    </div>
  );
}

