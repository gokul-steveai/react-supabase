import type { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export default function IconButton({ icon, className = '', ...props }: IconButtonProps) {
  return (
    <button
      className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}
