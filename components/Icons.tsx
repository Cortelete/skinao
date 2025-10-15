import React from 'react';

export const LogoIcon: React.FC = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="black" stroke="#FFD60A" strokeWidth="4"/>
    <path d="M47 38H33C31.8954 38 31 38.8954 31 40V62C31 63.1046 31.8954 64 33 64H47C48.1046 64 49 63.1046 49 62V40C49 38.8954 48.1046 38 47 38Z" stroke="#FFD60A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M49 44H55C56.1046 44 57 44.8954 57 46V56C57 57.1046 56.1046 58 55 58H49" stroke="#FFD60A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 44V58" stroke="#FFD60A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M42 44V58" stroke="#FFD60A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 34C28.25 31.5 32.5 28 39 28C45.5 28 49.75 31.5 52 34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M60.1818 52.3333L67.0909 59.2424C68.0125 60.164 69.5303 60.164 70.4519 59.2424L72.1327 57.5616C73.0543 56.6399 73.0543 55.1222 72.1327 54.2006L65.2236 47.2915" fill="#FFD60A" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M62.6667 45.6667C65.3333 46.3333 67 48.3333 67 51" stroke="#FFD60A" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="38" stroke="#FFD60A" strokeWidth="3" />
  </svg>
);

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-6 h-6 text-black/80 group-hover:text-black transition-colors">
    {children}
  </div>
);

export const MenuIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </IconWrapper>
);

export const InstagramIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  </IconWrapper>
);

export const LocationIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  </IconWrapper>
);

export const StarIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </IconWrapper>
);

export const ContactIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    </IconWrapper>
);


export const ExternalLinkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const DirectionsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-6v6m0-6h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 010 1.414l-3.414 3.414a1 1 0 01-.707.293H9" />
    </svg>
);
