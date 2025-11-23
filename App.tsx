import React, { useState } from 'react';
import LinkButton from './components/LinkButton';
import { ServicesIcon, InstagramIcon, LocationIcon, StarIcon, CloseIcon, WhatsAppIcon } from './components/Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop Escuro - Mais leve para mostrar o fundo animado */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* 
         MODAL GLASSMORPHISM (Igual ao Card Principal)
         Substituído 'animated-gradient' por estilo de vidro (glassmorphism)
         para manter a consistência visual e ver a animação de fundo.
      */}
      <div 
        className="w-full sm:w-full max-w-md sm:rounded-[2.5rem] rounded-t-[2.5rem] border border-white/10 bg-black/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 relative transform transition-all duration-500 translate-y-0 animate-slide-up text-white overflow-hidden max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
         {/* Shine superior igual ao card principal */}
         <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

         {/* Textura de ruído */}
         <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6 sm:hidden relative z-10" /> 
        
        <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest">{title}</h2>
                <button 
                onClick={onClose} 
                className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Fechar"
                >
                <CloseIcon />
                </button>
            </div>
            
            <div className="font-light leading-relaxed text-gray-200">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const [contactStep, setContactStep] = useState(1);
  const [contactName, setContactName] = useState('');
  const [contactReason, setContactReason] = useState('');
  
  // Serviços Genéricos para qualquer nicho
  const [contactServices, setContactServices] = useState<Record<string, boolean>>({
      'Orçamento': false,
      'Dúvidas': false,
      'Parceria': false,
      'Outros': false,
  });

  const [developerModalStep, setDeveloperModalStep] = useState(1);
  const [developerContactName, setDeveloperContactName] = useState('');
  const [isLogoSpinning, setLogoSpinning] = useState(false);

  const handleCloseModal = () => {
    setActiveModal(null);
    setTimeout(() => {
        setRating(0);
        setFeedback('');
        setContactStep(1);
        setContactName('');
        setContactReason('');
        setContactServices({ 'Orçamento': false, 'Dúvidas': false, 'Parceria': false, 'Outros': false });
        setSelectedService(null);
        setDeveloperModalStep(1);
        setDeveloperContactName('');
        setLogoSpinning(false);
    }, 300);
  };
  
  const handleLogoClick = () => {
    if (isLogoSpinning) return;
    setLogoSpinning(true);
    setTimeout(() => {
      setActiveModal('about');
    }, 150);
  };

  const handleSendWhatsApp = () => {
    setActiveModal('contactDemo');
  };

  const handleScheduleService = (serviceName: string) => {
    setSelectedService(serviceName);
    setContactReason('servico');
    setActiveModal('contact');
  };

  const handleDeveloperContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!developerContactName.trim()) return;
    window.open(`https://api.whatsapp.com/send?phone=5541988710303&text=${encodeURIComponent(`Olá, sou ${developerContactName} e quero um Link Bio Premium!`)}`, '_blank');
    handleCloseModal();
  };

  return (
    <main className="min-h-screen animated-gradient flex items-center justify-center p-4 font-sans text-white overflow-hidden relative">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Cinzel:wght@400;600&display=swap');

        /* Background Animado Vibrante - Usado no Main e nos Modais */
        .animated-gradient {
            background: linear-gradient(300deg, #0f0c29, #302b63, #24243e, #4c1d95, #000000);
            background-size: 300% 300%;
            animation: gradient 12s ease infinite;
        }

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        .animate-fade-in-up {
            opacity: 0;
            animation: slide-up 0.6s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }

        body { font-family: 'Outfit', sans-serif; background-color: #000; }
        .font-serif { font-family: 'Cinzel', serif; }
        
        /* Scrollbar minimalista */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>

      {/* Overlay de textura para toda a tela */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* CARD MARCADO: Container Glassmorphism Principal */}
        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] p-8 relative overflow-hidden">
            
            {/* Brilho superior sutil no card */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

            <div className="flex flex-col items-center relative z-10">
            
              <button 
                onClick={handleLogoClick} 
                className="mb-6 rounded-full hover:scale-105 transition-transform duration-500 ring-2 ring-white/10 ring-offset-4 ring-offset-transparent group" 
                aria-label="Sobre"
              >
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-shadow ${isLogoSpinning ? 'animate-spin' : ''}`}>
                    <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="w-full h-full object-cover" 
                    />
                </div>
              </button>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-center tracking-widest uppercase text-white drop-shadow-lg mb-2">
                Seu Nome
              </h1>
              <p className="text-xs sm:text-sm text-purple-200 tracking-[0.25em] uppercase mb-8 opacity-80 font-light">Profissional / Sua Área</p>

              <div className="w-full flex flex-col space-y-3">
                {/* Botões Universais e Objetivos */}
                <div className="animate-fade-in-up" style={{animationDelay: '100ms'}}>
                    <LinkButton onClick={() => setActiveModal('services')} icon={<ServicesIcon />} text="Meus Serviços" />
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <LinkButton onClick={() => setActiveModal('portfolio')} icon={<InstagramIcon />} text="Portfólio & Galeria" />
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '300ms'}}>
                    <LinkButton onClick={() => setActiveModal('location')} icon={<LocationIcon />} text="Localização" />
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '400ms'}}>
                    <LinkButton onClick={() => setActiveModal('rating')} icon={<StarIcon />} text="Avaliar Experiência" />
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '500ms'}}>
                    <LinkButton onClick={() => setActiveModal('contact')} icon={<WhatsAppIcon />} text="Fale Comigo" />
                </div>
              </div>

              <footer className="text-center mt-10 animate-fade-in-up" style={{animationDelay: '600ms'}}>
                  <button onClick={() => setActiveModal('developer')} className="text-[9px] sm:text-[10px] text-white/20 hover:text-purple-300 transition-colors tracking-widest uppercase">
                    Design por InteligenciArte.IA
                  </button>
              </footer>
            </div>
        </div>
      </div>
      
      {/* --- MODAIS OBJETIVOS E LUXUOSOS --- */}
      
      <Modal isOpen={activeModal === 'about'} onClose={handleCloseModal} title="Sobre">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-200 font-light leading-relaxed">
            "A dedicação aos detalhes é o que define a excelência."
          </p>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
             <p className="text-sm">
               Espaço para breve biografia. Seja você jardineiro, esteticista ou consultor, conte aqui sua missão e experiência.
             </p>
          </div>
          <button onClick={handleCloseModal} className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all">Voltar</button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'services'} onClose={handleCloseModal} title="Serviços">
        <div className="space-y-3">
          <p className="text-center text-xs text-white/50 uppercase tracking-widest mb-4">O que posso fazer por você</p>
          
          {['Serviço Principal', 'Atendimento Exclusivo', 'Consultoria Personalizada'].map((item, idx) => (
             <button 
                key={idx} 
                onClick={() => handleScheduleService(item)}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center hover:bg-white/10 hover:scale-[1.02] transition-all group"
             >
                <span className="font-medium text-white group-hover:text-purple-300 transition-colors">{item}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">Saber Mais</span>
             </button>
          ))}
          <p className="text-center text-xs text-white/40 mt-4">Toque para detalhes via WhatsApp.</p>
        </div>
      </Modal>
      
      <Modal isOpen={activeModal === 'portfolio'} onClose={handleCloseModal} title="Galeria">
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-300">Veja os resultados do meu trabalho.</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-white/10 rounded-xl border border-white/5 flex items-center justify-center text-xs text-white/30">Foto 1</div>
            <div className="aspect-square bg-white/10 rounded-xl border border-white/5 flex items-center justify-center text-xs text-white/30">Foto 2</div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-purple-500/30 transition-all">
            <InstagramIcon /> Ver Instagram
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'location'} onClose={handleCloseModal} title="Endereço">
         <div className="space-y-4 text-center">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
             <LocationIcon />
             <p className="mt-3 font-medium text-lg">Seu Endereço Aqui</p>
             <p className="text-sm text-white/60">Cidade - Estado</p>
          </div>
          <button onClick={handleCloseModal} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-lg">Abrir no Maps</button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'rating'} onClose={handleCloseModal} title="Avaliar">
        <div className="text-center">
            <p className="text-sm text-white/70 mb-4">Como foi sua experiência?</p>
            <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)} className="text-3xl focus:outline-none transition-transform hover:scale-125 text-white/20 hover:text-yellow-400">
                        <span className={rating >= star ? 'text-yellow-400' : ''}>★</span>
                    </button>
                ))}
            </div>
            {rating > 0 && (
                <textarea 
                    placeholder="Deixe um comentário (opcional)..." 
                    className="w-full bg-white/10 rounded-xl p-3 text-sm mb-4 focus:outline-none border border-white/10 focus:border-purple-400 transition-colors"
                    onChange={(e) => setFeedback(e.target.value)}
                />
            )}
            <button onClick={() => rating > 0 && setActiveModal('ratingSuccess5')} disabled={rating === 0} className="w-full bg-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/30 transition-all disabled:opacity-50">Enviar</button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'contact'} onClose={handleCloseModal} title="Contato">
        {contactStep === 1 ? (
          <div className="space-y-4">
            <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full p-4 border border-white/10 rounded-xl bg-white/5 focus:outline-none focus:bg-white/10 transition text-white placeholder-white/40 text-center" placeholder="Qual seu nome?" />
            
            <div className="grid grid-cols-1 gap-2">
                <button onClick={() => {setContactReason('Agendamento'); setContactStep(2)}} disabled={!contactName} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left transition-all disabled:opacity-50 flex justify-between">
                    <span>📅 Agendar Horário</span>
                    <span className="text-white/30">→</span>
                </button>
                <button onClick={() => {setContactReason('Orçamento'); setContactStep(2)}} disabled={!contactName} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left transition-all disabled:opacity-50 flex justify-between">
                    <span>💰 Pedir Orçamento</span>
                    <span className="text-white/30">→</span>
                </button>
                <button onClick={() => {setContactReason('Dúvida'); setContactStep(2)}} disabled={!contactName} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left transition-all disabled:opacity-50 flex justify-between">
                    <span>💬 Tirar Dúvidas</span>
                    <span className="text-white/30">→</span>
                </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-sm text-white/70">Olá <strong className="text-white">{contactName}</strong>, vamos finalizar no WhatsApp?</p>
            <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-xs text-white/50 uppercase mb-1">Assunto</p>
                <p className="font-medium text-lg">{contactReason} {selectedService ? `- ${selectedService}` : ''}</p>
            </div>
            <button onClick={handleSendWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2">
                <WhatsAppIcon /> Iniciar Conversa
            </button>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'contactDemo'} onClose={handleCloseModal} title="Redirecionando">
        <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <WhatsAppIcon />
            </div>
            <p className="text-sm text-gray-300">O WhatsApp abrirá com sua mensagem preenchida.</p>
            <button onClick={handleCloseModal} className="text-xs text-white/40 underline mt-4">Fechar simulação</button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'ratingSuccess5'} onClose={handleCloseModal} title="Obrigado!">
        <div className="text-center py-4">
            <div className="text-6xl mb-4 animate-bounce">✨</div>
            <p className="text-lg font-medium">Sua opinião é essencial!</p>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-2 bg-white/10 py-3 rounded-xl">Fechar</button>
      </Modal>

      <Modal isOpen={activeModal === 'developer'} onClose={handleCloseModal} title="Crie o Seu">
        {developerModalStep === 1 ? (
          <div className="text-center space-y-4">
            <p className="text-gray-200 text-sm">Gostou deste modelo? Tenha um cartão digital exclusivo para o seu negócio.</p>
            <a href="https://instagram.com/inteligenciarte.ia" target="_blank" className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg">
               Ver no Instagram
            </a>
            <button onClick={() => setDeveloperModalStep(2)} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
              Quero Um Site Assim 🚀
            </button>
          </div>
        ) : (
          <form onSubmit={handleDeveloperContactSubmit} className="space-y-4">
            <input type="text" value={developerContactName} onChange={(e) => setDeveloperContactName(e.target.value)} className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-center text-white focus:outline-none" placeholder="Seu Nome" required />
            <button type="submit" className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2">
              <WhatsAppIcon /> Solicitar Orçamento
            </button>
          </form>
        )}
      </Modal>
    </main>
  );
};

export default App;