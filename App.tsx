
import React, { useState } from 'react';
import LinkButton from './components/LinkButton';
import { ServicesIcon, InstagramIcon, LocationIcon, StarIcon, CloseIcon, WhatsAppIcon, ExternalLinkIcon } from './components/Icons';

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
      {/* Backdrop com blur pesado e escurecimento */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div 
        className="bg-[#0f0f0f] sm:rounded-2xl rounded-t-2xl border border-white/10 shadow-2xl w-full sm:w-full max-w-lg p-6 relative transform transition-all duration-500 translate-y-0 animate-slide-up sm:animate-fade-in-scale max-h-[90vh] overflow-y-auto text-white" 
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6 sm:hidden" /> {/* Puxador Mobile */}
        
        <h2 className="font-serif text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-6 text-center uppercase tracking-wider">{title}</h2>
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors hidden sm:block"
          aria-label="Fechar"
        >
          <CloseIcon />
        </button>
        
        <div className="space-y-6 font-light leading-relaxed text-gray-300">
            {children}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-fade-in-scale { 
          animation: fade-in-scale 0.3s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const [contactStep, setContactStep] = useState(1);
  const [contactName, setContactName] = useState('');
  const [contactReason, setContactReason] = useState('');
  const [contactDateTime, setContactDateTime] = useState('');
  // Serviços genéricos
  const [contactServices, setContactServices] = useState<Record<string, boolean>>({
      'Consultoria Premium': false,
      'Atendimento Personalizado': false,
      'Projetos Exclusivos': false,
      'Mentoria & Suporte': false,
  });
  const [contactOtherReason, setContactOtherReason] = useState('');

  const [developerModalStep, setDeveloperModalStep] = useState(1);
  const [developerContactName, setDeveloperContactName] = useState('');
  const [isLogoSpinning, setLogoSpinning] = useState(false);

  const handleCloseModal = () => {
    setActiveModal(null);
    setTimeout(() => {
        setRating(0);
        setHoverRating(0);
        setFeedback('');
        setContactStep(1);
        setContactName('');
        setContactReason('');
        setContactDateTime('');
        // Reset para padrão genérico
        setContactServices({ 'Consultoria Premium': false, 'Atendimento Personalizado': false, 'Projetos Exclusivos': false, 'Mentoria & Suporte': false });
        setContactOtherReason('');
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

  const handleRatingSubmit = () => {
    if (rating === 0) return;
    if (rating === 5) {
      setActiveModal('ratingSuccess5');
    } else {
      setActiveModal('feedback');
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() === '') return;
    setActiveModal('feedbackSuccess');
  };

  const handleSendWhatsApp = () => {
    setActiveModal('contactDemo');
  };

  const handleServiceCheckboxChange = (item: string) => {
    setContactServices(prev => ({...prev, [item]: !prev[item]}));
  };

  const handleScheduleService = (serviceName: string) => {
    setSelectedService(serviceName);
    setContactReason('agendar');
    setActiveModal('contact');
  };

  const handleDeveloperContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!developerContactName.trim()) return;
    
    const devPhoneNumber = "5541988710303";
    const clientName = "Link Bio Premium";
    const message = `Olá, vi o modelo ${clientName} e desejo elevar o nível do meu negócio! Meu nome é ${developerContactName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${devPhoneNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    handleCloseModal();
  };

  return (
    <main className="min-h-screen animated-gradient flex items-center justify-center p-4 font-sans text-white overflow-hidden relative">
      {/* Background Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="w-full max-w-md bg-black/20 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-6 sm:p-10 border border-white/10 relative z-10">
        <div className="flex flex-col items-center animate-fade-in opacity-0">
        
          <button 
            onClick={handleLogoClick} 
            className="mb-6 rounded-full focus:outline-none hover:scale-105 transition-transform duration-500 ring-2 ring-white/20 ring-offset-4 ring-offset-transparent" 
            style={{ perspective: '1000px' }}
            aria-label="Sobre"
          >
            <div className={`w-32 h-32 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.15)] ${isLogoSpinning ? 'animate-spin-whoosh' : ''}`}>
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover" 
                />
            </div>
          </button>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-center tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-sm">
            Seu Nome
          </h1>

          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-4"></div>

          <p className="text-sm sm:text-base font-light text-center mb-8 text-gray-300 tracking-wide">
            Especialista em transformar ideias em resultados. <br/> Soluções premium para clientes exigentes.
          </p>

          <div className="w-full flex flex-col space-y-4">
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '100ms'}}>
                <LinkButton onClick={() => setActiveModal('services')} icon={<ServicesIcon />} text="Soluções & Serviços" />
            </div>
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '200ms'}}>
                <LinkButton onClick={() => setActiveModal('portfolio')} icon={<InstagramIcon />} text="Galeria de Projetos" />
            </div>
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '300ms'}}>
                <LinkButton onClick={() => setActiveModal('location')} icon={<LocationIcon />} text="Onde Estamos" />
            </div>
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '400ms'}}>
                <LinkButton onClick={() => setActiveModal('rating')} icon={<StarIcon />} text="Avaliações" />
            </div>
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '500ms'}}>
                <LinkButton onClick={() => setActiveModal('contact')} icon={<WhatsAppIcon />} text="Contato Direto" />
            </div>
          </div>

          <footer className="text-center mt-10 animate-fade-in opacity-0" style={{animationDelay: '700ms'}}>
              <button onClick={() => setActiveModal('developer')} className="text-xs text-gray-500 hover:text-amber-400 transition-colors tracking-widest uppercase">
                Desenvolvido por <span className="font-bold">InteligenciArte.IA</span>
              </button>
            </footer>
        </div>
      </div>
      
      {/* --- MODALS --- */}
      <Modal isOpen={activeModal === 'about'} onClose={handleCloseModal} title="Quem Sou Eu">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full border-2 border-amber-400/50 p-1">
            <img src="/logo.png" alt="Perfil" className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Sua Marca Pessoal</h3>
            <p className="text-sm text-gray-400 italic">"Excelência não é um ato, mas um hábito."</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left">
             <p className="text-sm mb-3">Utilize este espaço para transmitir autoridade. Conte brevemente sua trajetória, certificações e o que motiva seu trabalho diário.</p>
             <p className="text-sm opacity-70 border-l-2 border-amber-500 pl-3">
                <strong>Objetivo:</strong> Conectar-se com o visitante através de valores compartilhados e profissionalismo.
             </p>
          </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all">Fechar</button>
      </Modal>

      <Modal isOpen={activeModal === 'services'} onClose={handleCloseModal} title="O Que Oferecemos">
        <div className="space-y-4">
          <p className="text-center text-sm text-gray-400 mb-4">Soluções desenhadas para superar expectativas.</p>
          
          {['Consultoria Especializada', 'Serviço Premium', 'Plano Mensal Exclusive'].map((item, idx) => (
             <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                <div>
                    <h5 className="font-serif text-lg text-amber-400">{item}</h5>
                    <p className="text-xs text-gray-400">Breve descrição do valor entregue.</p>
                </div>
                <button 
                    onClick={() => handleScheduleService(item)}
                    className="bg-white text-black text-xs font-bold py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Consultar
                </button>
             </div>
          ))}
          
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500">Clique em "Consultar" para iniciar uma conversa via WhatsApp sobre este serviço específico.</p>
          </div>
        </div>
      </Modal>
      
      <Modal isOpen={activeModal === 'portfolio'} onClose={handleCloseModal} title="Galeria">
        <div className="space-y-6 text-center">
          <p className="text-sm">A melhor forma de vender é mostrar resultados. Este botão direciona para seu portfólio visual.</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-xs text-gray-500">Projeto 1</div>
            <div className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-xs text-gray-500">Projeto 2</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white text-sm mb-1">Integração Social</h4>
            <p className="text-xs text-gray-300">Direcione para Instagram, Behance, LinkedIn ou seu site oficial.</p>
          </div>
        </div>
         <button onClick={handleCloseModal} className="w-full mt-6 bg-white/10 border border-white/20 text-white font-bold py-3 px-4 rounded-xl hover:bg-white/20 transition-colors">Voltar</button>
      </Modal>

      <Modal isOpen={activeModal === 'location'} onClose={handleCloseModal} title="Localização">
         <div className="space-y-6 text-center">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
             <LocationIcon />
             <p className="mt-4 font-serif text-xl">Seu Endereço Premium</p>
             <p className="text-sm text-gray-400 mt-2">Av. Business, 1000 - Torre A</p>
             <p className="text-sm text-gray-400">São Paulo - SP</p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl">
            <p className="text-sm text-green-400 font-medium">Facilidade para seu cliente</p>
            <p className="text-xs text-gray-400 mt-1">Ao clicar, o Waze ou Google Maps abre automaticamente com a rota traçada.</p>
          </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-6 bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">Traçar Rota</button>
      </Modal>

      <Modal isOpen={activeModal === 'rating'} onClose={handleCloseModal} title="Avalie-nos">
        <p className="text-center text-gray-300 mb-6 text-sm">Sua experiência define nosso padrão de qualidade.</p>
        <div className="flex justify-center items-center gap-3 my-6">
            {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="transition-transform duration-200 hover:scale-110 focus:outline-none" aria-label={`${star} estrelas`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path className={`transition-colors duration-300 ${(hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-700'}`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            ))}
        </div>
        <button onClick={handleRatingSubmit} disabled={rating === 0} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">Enviar Avaliação</button>
      </Modal>

      <Modal isOpen={activeModal === 'feedback'} onClose={handleCloseModal} title="Feedback">
        <p className="text-gray-300 mb-4 text-sm">Como podemos evoluir para melhor atendê-lo?</p>
        <form onSubmit={handleFeedbackSubmit}>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full h-32 p-4 border border-white/20 rounded-xl bg-white/5 focus:outline-none focus:ring-1 focus:ring-amber-400 transition text-white placeholder-gray-600 text-sm" placeholder="Digite sua mensagem..." required />
            <button type="submit" className="w-full mt-4 bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">Enviar</button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'contact'} onClose={handleCloseModal} title="Iniciar Conversa">
        {contactStep === 1 ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Seu Nome</label>
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full p-3 border border-white/20 rounded-xl bg-white/5 focus:outline-none focus:border-amber-400 transition text-white" placeholder="Como gosta de ser chamado?" required/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Assunto</label>
              <div className="grid grid-cols-1 gap-3">
                <button 
                    onClick={() => setContactReason('agendar')}
                    className={`p-3 rounded-xl border text-left transition-all ${contactReason === 'agendar' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                >
                    Agendamento / Orçamento
                </button>
                <button 
                    onClick={() => setContactReason('outro')}
                    className={`p-3 rounded-xl border text-left transition-all ${contactReason === 'outro' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                >
                    Dúvidas Gerais
                </button>
              </div>
            </div>
            <button onClick={() => setContactStep(2)} disabled={!contactName || !contactReason} className="w-full mt-4 bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Continuar</button>
          </div>
        ) : contactReason === 'agendar' ? (
          <div className="space-y-4">
            {selectedService && (
              <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/30 flex justify-between items-center">
                <span className="text-sm text-amber-400">{selectedService}</span>
                <button onClick={() => setSelectedService(null)} className="text-xs text-gray-500 hover:text-white">Alterar</button>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Preferência de Horário</label>
              <input type="text" value={contactDateTime} onChange={(e) => setContactDateTime(e.target.value)} className="w-full p-3 border border-white/20 rounded-xl bg-white/5 focus:outline-none focus:border-amber-400 transition text-white" placeholder="Ex: Manhã, Tarde ou Data Específica" required/>
            </div>
            {!selectedService && (
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Interesses (Múltipla escolha)</label>
                <div className="grid grid-cols-1 gap-2">
                    {Object.keys(contactServices).map(item => (
                        <label key={item} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${contactServices[item] ? 'bg-white/10 border-amber-400/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                            <input type="checkbox" checked={contactServices[item]} onChange={() => handleServiceCheckboxChange(item)} className="accent-amber-500 h-4 w-4"/>
                            <span className="ml-3 text-sm text-gray-200">{item}</span>
                        </label>
                    ))}
                </div>
              </div>
            )}
            <button onClick={handleSendWhatsApp} disabled={!contactDateTime} className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                <WhatsAppIcon /> Chamar no WhatsApp
            </button>
          </div>
        ) : (
           <div className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sua Mensagem</label>
                <textarea value={contactOtherReason} onChange={(e) => setContactOtherReason(e.target.value)} className="w-full h-32 p-3 border border-white/20 rounded-xl bg-white/5 focus:outline-none focus:border-amber-400 transition text-white" required/>
            </div>
            <button onClick={handleSendWhatsApp} disabled={!contactOtherReason} className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                <WhatsAppIcon /> Chamar no WhatsApp
            </button>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'contactDemo'} onClose={handleCloseModal} title="Simulação de Envio">
        <div className="space-y-4">
            <p className="text-sm text-gray-300">Ao clicar no botão final, o cliente é redirecionado para o app do WhatsApp com a mensagem pronta:</p>
            <div className="bg-[#0b141a] p-4 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#25D366]"></div>
                <p className="text-xs text-gray-500 mb-2">Mensagem Automática:</p>
                <p className="text-sm text-white italic">"Olá! Me chamo <strong>{contactName || 'Visitante'}</strong>. {contactReason === 'agendar' ? `Gostaria de saber sobre disponibilidade para: ${contactDateTime}.` : `Gostaria de falar sobre: ${contactOtherReason.slice(0, 30)}...`}"</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                <h4 className="font-bold text-amber-400 text-sm">Profissionalismo</h4>
                <p className="mt-1 text-xs text-gray-400">Padronize o primeiro contato e aumente sua taxa de conversão facilitando a vida do cliente.</p>
            </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-4 bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">Entendido</button>
      </Modal>

      <Modal isOpen={activeModal === 'ratingSuccess5'} onClose={handleCloseModal} title="Agradecemos!">
        <div className="space-y-4 text-center">
            <div className="text-5xl mb-2">⭐</div>
            <p className="text-gray-300">Avaliações positivas impulsionam seu negócio no Google.</p>
             <div className="bg-white/5 border-l-2 border-amber-400 p-4 rounded-r-xl text-left italic">
                <p className="text-sm text-gray-400">"Incrível! O profissionalismo e a qualidade superaram minhas expectativas."</p>
            </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-6 bg-white/10 border border-white/20 text-white font-bold py-3 px-4 rounded-xl hover:bg-white/20 transition-colors">Fechar</button>
      </Modal>

      <Modal isOpen={activeModal === 'feedbackSuccess'} onClose={handleCloseModal} title="Recebido">
        <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-gray-300">Obrigado pela colaboração. Estamos sempre em busca da excelência.</p>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-6 bg-white/10 border border-white/20 text-white font-bold py-3 px-4 rounded-xl hover:bg-white/20 transition-colors">Fechar</button>
      </Modal>

      <Modal isOpen={activeModal === 'developer'} onClose={handleCloseModal} title="InteligenciArte.IA">
        {developerModalStep === 1 ? (
          <div className="text-center space-y-6">
            <p className="text-gray-300 font-light">Gostou deste modelo? Transforme a apresentação do seu negócio com um cartão digital de alta performance.</p>
            
            <div className="grid grid-cols-1 gap-3">
                 <a 
                  href="https://instagram.com/inteligenciarte.ia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  <InstagramIcon />
                  <span className="ml-2">Siga no Instagram</span>
                </a>
            </div>

            <p className="text-xs text-gray-500 uppercase tracking-widest pt-4">Solicite o seu agora</p>
            <button 
              onClick={() => setDeveloperModalStep(2)}
              className="w-full bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Quero um Site Igual a Esse 🚀
            </button>
          </div>
        ) : (
          <form onSubmit={handleDeveloperContactSubmit} className="space-y-4">
            <p className="text-gray-300 text-center text-sm">Vamos criar algo incrível juntos.</p>
            <div>
              <input 
                type="text" 
                value={developerContactName} 
                onChange={(e) => setDeveloperContactName(e.target.value)} 
                className="w-full p-3 border border-white/20 rounded-xl bg-white/5 focus:outline-none focus:border-amber-400 transition text-white text-center" 
                placeholder="Seu Nome"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={!developerContactName.trim()}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center disabled:opacity-50"
            >
              <WhatsAppIcon />
              <span className="ml-2">Enviar Solicitação</span>
            </button>
          </form>
        )}
      </Modal>
      
      <style>{`
        body { font-family: 'Outfit', sans-serif; background-color: #000; }
        .font-serif { font-family: 'Cinzel', serif; }
        
        /* Animated Deep Gradient Background - Luxury & Vibrant */
        .animated-gradient {
            background: linear-gradient(300deg, #000000, #1a0b2e, #111827, #2e1065, #000000);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-whoosh {
          0% { transform: rotateY(0deg) scale(1); opacity: 1; }
          50% { opacity: 0.5; }
          100% { transform: rotateY(360deg) scale(1.2); opacity: 1; }
        }
        .animate-spin-whoosh {
          animation: spin-whoosh 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards; }
        
        /* Custom Scrollbar for Modals */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1f2937; }
        ::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #6b7280; }
      `}</style>
    </main>
  );
};

export default App;
