import React from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatMoney } from '../../lib/formatters';
import bbvaCardImg from '../../assets/cards/bbva_card.png';
import plataCardImg from '../../assets/cards/plata_card.png';
import nuCardImg from '../../assets/cards/nu_card.png';
import klarCardImg from '../../assets/cards/klar_card.png';

const CARD_IMAGES = {
  bbva: bbvaCardImg,
  plata: plataCardImg,
  nu: nuCardImg,
  klar: klarCardImg,
};

export function BankCard({
  account,
  selected = false,
  onClick,
  className = '',
}) {
  if (!account) return null;

  const cardImg = account.image || CARD_IMAGES[account.bank?.toLowerCase()];

  if (cardImg) {
    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        className={cn(
          'relative group w-full max-w-sm rounded-2xl cursor-pointer select-none transition-all duration-300 shadow-2xl overflow-hidden border-2 border-white/20 aspect-[1.58/1] bg-zinc-950 flex items-center justify-center',
          selected ? 'ring-4 ring-blue-500 scale-102 shadow-blue-500/40 border-blue-400' : 'hover:-translate-y-1 hover:shadow-2xl hover:border-white/50',
          className
        )}
      >
        <img
          src={cardImg}
          alt={account.name || account.bank}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {account.dualSupport && (
          <span className="absolute top-2 right-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
            {account.type === 'CREDIT' ? 'Crédito' : account.type === 'DEBIT' ? 'Débito' : 'Dual'}
          </span>
        )}
      </div>
    );
  }

  // Fallback CSS card representation
  const {
    bank = 'bbva',
    name = 'Cuenta',
    type = 'DEBIT',
    last4 = '0000',
    holderName = 'USUARIO CAPITA1',
    balance = 0,
    creditLimit = 0,
    dualSupport = false,
  } = account;

  const bankStyles = {
    bbva: {
      bg: 'bg-gradient-to-br from-[#003B5C] via-[#004481] to-[#042C47]',
      border: 'border-[#1464A5]/40',
      text: 'text-white',
      accent: 'text-sky-300',
      chip: 'bg-amber-300/80',
      tag: 'BBVA',
    },
    nu: {
      bg: 'bg-gradient-to-br from-[#820AD1] via-[#5D0499] to-[#390060]',
      border: 'border-purple-400/40',
      text: 'text-white',
      accent: 'text-purple-200',
      chip: 'bg-amber-300/80',
      tag: 'Nu Bank',
    },
    plata: {
      bg: 'bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8]',
      border: 'border-orange-500/60 ring-1 ring-orange-500/40',
      text: 'text-zinc-900',
      accent: 'text-orange-600 font-bold',
      chip: 'bg-zinc-700/80',
      tag: 'Plata Card',
    },
    klar: {
      bg: 'bg-gradient-to-br from-[#10B981] via-[#059669] to-[#065F46]',
      border: 'border-emerald-300/40',
      text: 'text-white',
      accent: 'text-emerald-100',
      chip: 'bg-amber-300/80',
      tag: 'Klar',
    },
  };

  const style = bankStyles[bank.toLowerCase()] || bankStyles.bbva;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={cn(
        'relative group w-full max-w-sm h-52 rounded-2xl p-5 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 shadow-xl overflow-hidden border',
        style.bg,
        style.border,
        selected ? 'ring-4 ring-blue-500 scale-102 shadow-blue-500/20' : 'hover:-translate-y-1 hover:shadow-2xl hover:brightness-105',
        className
      )}
    >
      <div className="flex items-center justify-between z-10">
        <span className={cn('text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-md bg-black/25', style.accent)}>
          {style.tag}
        </span>
        <div className="flex items-center gap-1.5 opacity-90">
          <CreditCard size={20} className={style.text} />
          <span className={cn('text-[11px] font-bold tracking-wider uppercase', style.text)}>
            {type === 'CREDIT' ? 'Crédito' : 'Débito'}
          </span>
        </div>
      </div>

      <div className="z-10">
        <div className="flex items-center justify-between mb-2">
          <span className={cn('font-mono text-sm tracking-widest font-semibold', style.text)}>
            •••• •••• •••• {last4}
          </span>
          <div className="text-right">
            <span className={cn('text-xs font-bold font-mono', style.text)}>
              {type === 'CREDIT' ? formatMoney(creditLimit) : formatMoney(balance)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-black/10 pt-2">
          <span className={cn('text-[11px] font-extrabold uppercase tracking-wider truncate', style.text)}>
            {holderName}
          </span>
          <span className={cn('text-[10px] font-mono tracking-wider opacity-80 flex items-center gap-1', style.text)}>
            <ShieldCheck size={12} /> CAPITA1
          </span>
        </div>
      </div>
    </div>
  );
}
