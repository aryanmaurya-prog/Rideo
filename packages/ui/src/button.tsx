import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'rounded-xl bg-[#FF6B00] px-5 py-3 font-semibold text-white transition hover:bg-[#E55A00] disabled:cursor-not-allowed disabled:opacity-50'
      : 'rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50';

  return <button className={[styles, className].filter(Boolean).join(' ')} {...props} />;
}
