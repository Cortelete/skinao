import React from 'react';

interface LinkButtonProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  text: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, onClick, icon, text, secondaryIcon }) => {
  const commonClasses = "flex items-center w-full bg-rose-50/70 rounded-2xl p-2 shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ease-in-out group";

  const content = (
    <>
      {/* Left Icon container: Fixed width for layout balancing */}
      <div className="flex-shrink-0 bg-rose-200/50 rounded-full p-2 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center transition-all">
        {icon}
      </div>

      {/* Text container: Grows to fill space, centers text */}
      <span className="flex-grow text-center text-base font-semibold px-1 sm:px-2 transition-all text-gradient-animated">
        {text}
      </span>
      
      {/* Right Icon/Placeholder container: Fixed width to match the left icon for perfect centering */}
      <div className="flex-shrink-0 w-9 sm:w-11 flex items-center justify-center transition-all">
        {secondaryIcon && (
          <div className="text-stone-500 group-hover:text-stone-700 transition-colors">
            {secondaryIcon}
          </div>
        )}
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