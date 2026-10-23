import React from 'react';
import { cn } from '../../lib/utils';

export function Input({
  label,
  error,
  icon: Icon,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label className="text-xs font-semibold tracking-wider text-zinc-300 uppercase pl-3">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-zinc-500 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'w-full rounded-full bg-white text-black font-semibold placeholder:text-zinc-400 placeholder:font-normal px-5 py-3 outline-none transition-all duration-200 border-2 border-transparent focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30',
            Icon && 'pl-11',
            error && 'border-red-600 focus:border-red-600 focus:ring-red-600/30',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-400 font-medium pl-3">{error}</span>
      )}
    </div>
  );
}

