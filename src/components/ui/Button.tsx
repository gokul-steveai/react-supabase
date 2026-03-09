import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'toggle';
  active?: boolean;
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', active = false, children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg',
    danger: 'bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white',
    ghost: 'hover:bg-gray-100 text-gray-600',
    toggle: active ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700',
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
