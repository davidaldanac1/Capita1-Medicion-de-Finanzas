import React from 'react';
import { cn } from '../../lib/utils';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-extrabold tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    // Primary pill per Section 3: bg-blue-600, border-2 border-red-600, uppercase text-white
    primary: 'rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm uppercase border-2 border-red-600 shadow-lg shadow-blue-950/40 active:scale-95',
    secondary: 'rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm uppercase border border-white/20 active:scale-95',
    outline: 'rounded-full bg-transparent hover:bg-white/10 text-white text-sm uppercase border border-white/30',
    danger: 'rounded-full bg-red-600 hover:bg-red-700 text-white text-sm uppercase border border-red-500',
    ghost: 'rounded-full bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white text-sm',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className)}
      {...props}
    >
      {children}
    </button>
  );
}

