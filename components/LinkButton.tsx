import React from 'react';

interface LinkButtonProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  text: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, onClick, icon, text, secondaryIcon }) => {
  // Estilo Glassmorphism Ultra Premium - Mais limpo e elegante
  const commonClasses = "relative overflow-hidden flex items-center w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:border-white/25 hover:-translate-y-1 transition-all duration-500 group cursor-pointer";

  const content = (
    <>
      {/* Efeito de brilho sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

      {/* Ícone */}
      <div className="relative z-10 flex-shrink-0 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>

      {/* Texto */}
      <span className="relative z-10 flex-grow text-center font-sans text-sm sm:text-base font-medium text-white/90 group-hover:text-white tracking-widest uppercase transition-colors">
        {text}
      </span>
      
      {/* Indicador visual discreto */}
      <div className="relative z-10 flex-shrink-0 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white/50">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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