
import React from 'react';

interface LinkButtonProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  text: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, onClick, icon, text, secondaryIcon }) => {
  // Estilo Glassmorphism Escuro/Moderno
  const commonClasses = "relative overflow-hidden flex items-center w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:border-white/30 hover:scale-[1.02] transition-all duration-300 ease-out group cursor-pointer";

  const content = (
    <>
      {/* Brilho de fundo animado ao passar o mouse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      {/* Ícone Esquerdo: Minimalista e sem fundo sólido pesado */}
      <div className="relative z-10 flex-shrink-0 text-white/80 group-hover:text-white transition-colors duration-300 p-1">
        {icon}
      </div>

      {/* Texto */}
      <span className="relative z-10 flex-grow text-center text-base tracking-wide font-medium text-white/90 group-hover:text-white transition-all uppercase text-sm sm:text-base font-sans">
        {text}
      </span>
      
      {/* Ícone Direito / Placeholder */}
      <div className="relative z-10 flex-shrink-0 w-8 flex items-center justify-center text-white/30 group-hover:text-white/80 transition-all">
        {secondaryIcon}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={commonClasses}
      type="button"
    >
      {content}
    </button>
  );
};

export default LinkButton;
