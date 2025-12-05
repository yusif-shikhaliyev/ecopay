import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg";
  
  const variants = {
    primary: "bg-eco-500 hover:bg-eco-400 text-white shadow-eco-900/50 border-b-4 border-eco-700 active:border-b-0 active:translate-y-1",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white border-b-4 border-slate-900 active:border-b-0 active:translate-y-1",
    danger: "bg-red-500 hover:bg-red-400 text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-1",
    ghost: "bg-transparent hover:bg-white/10 text-white border-2 border-white/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl",
    xl: "px-12 py-6 text-2xl"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;