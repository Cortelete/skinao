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
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-rose-50 rounded-2xl shadow-xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" 
        onClick={e => e.stopPropagation()}
      >
        <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4 text-center sm:text-left">{title}</h2>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); }
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
  const [contactServices, setContactServices] = useState<Record<string, boolean>>({
      'Corte & Estilo': false,
      'Coloração': false,
      'Tratamento Facial': false,
      'Manicure & Pedicure': false,
  });
  const [contactOtherReason, setContactOtherReason] = useState('');

  const [developerModalStep, setDeveloperModalStep] = useState(1);
  const [developerContactName, setDeveloperContactName] = useState('');
  const [isLogoSpinning, setLogoSpinning] = useState(false);

  const servicesData = [
    {
      name: 'Corte Moderno & Estilização',
      description: 'Análise de visagismo, corte personalizado, lavagem relaxante e finalização com os melhores produtos.',
      price: 'A partir de R$ 150'
    },
    {
      name: 'Coloração Premium & Mechas',
      description: 'Técnicas avançadas de coloração, mechas (luzes, ombré), correção de cor e tratamento pós-química.',
      price: 'A partir de R$ 350'
    },
    {
      name: 'Tratamento Capilar Profundo',
      description: 'Reconstrução, hidratação ou nutrição intensiva para devolver a saúde e o brilho aos seus fios.',
      price: 'A partir de R$ 200'
    }
  ];

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
        setContactServices({ 'Corte & Estilo': false, 'Coloração': false, 'Tratamento Facial': false, 'Manicure & Pedicure': false });
        setContactOtherReason('');
        setSelectedService(null);
        setDeveloperModalStep(1);
        setDeveloperContactName('');
    }, 300);
  };
  
  const handleLogoClick = () => {
    if (isLogoSpinning) return;
    setLogoSpinning(true);
    setTimeout(() => {
      setActiveModal('about');
      setLogoSpinning(false);
    }, 1000); // Animation duration
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
    const clientName = "Exemplo Link Bio";
    const message = `Olá, vi o link do ${clientName} e quero um site igual! Meu nome é ${developerContactName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${devPhoneNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    handleCloseModal();
  };

  return (
    <main className="min-h-screen animated-gradient flex items-center justify-center p-2 sm:p-4 font-sans">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-4 sm:p-8 border border-white/20">
        <div className="flex flex-col items-center animate-fade-in opacity-0">
        
          <button 
            onClick={handleLogoClick} 
            className="mb-4 rounded-full focus:outline-none focus:ring-4 focus:ring-pink-300/50 transition-shadow duration-300" 
            aria-label="Saiba mais sobre nós"
          >
            <img 
              src="/logo.png" 
              alt="Exemplo Link Bio Logo" 
              className={`w-32 sm:w-40 h-auto rounded-full shadow-lg transition-transform duration-1000 ${isLogoSpinning ? 'animate-spin-whoosh' : ''}`} 
            />
          </button>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-center tracking-tight text-gradient-animated">
            Exemplo Link Bio
          </h1>

          <p className="text-sm sm:text-base font-medium text-center mt-2 mb-8 text-gradient-animated">
            Seu slogan aqui em destaque para seu cliente
          </p>

          <div className="w-full flex flex-col space-y-3 sm:space-y-4">
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '100ms'}}><LinkButton onClick={() => setActiveModal('services')} icon={<ServicesIcon />} text="Nossos Serviços" /></div>
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '200ms'}}><LinkButton onClick={() => setActiveModal('portfolio')} icon={<InstagramIcon />} text="Nosso Portfólio" /></div>
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '300ms'}}><LinkButton onClick={() => setActiveModal('location')} icon={<LocationIcon />} text="Nossa Localização" /></div>
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '400ms'}}><LinkButton onClick={() => setActiveModal('rating')} icon={<StarIcon />} text="Sua Opinião" /></div>
            <div className="animate-fade-in-up opacity-0" style={{animationDelay: '500ms'}}><LinkButton onClick={() => setActiveModal('contact')} icon={<WhatsAppIcon />} text="Fale Conosco" /></div>
          </div>

          <footer className="text-center mt-8 animate-fade-in opacity-0" style={{animationDelay: '600ms'}}>
              <button onClick={() => setActiveModal('developer')} className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                Desenvolvido por <strong className="font-semibold text-gradient-animated">InteligenciArte.IA</strong> ✨
              </button>
            </footer>
        </div>
      </div>
      
      {/* --- MODALS --- */}
      <Modal isOpen={activeModal === 'about'} onClose={handleCloseModal} title="Conecte-se Com Seus Clientes">
        <div className="text-left text-stone-700 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border-2 border-pink-200 p-4 rounded-lg animate-fade-in opacity-0">
            <img src="/logo.png" alt="Foto do Proprietário" className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white" />
            <div>
              <h4 className="font-serif text-xl text-pink-500 font-bold">Seu Nome Aqui</h4>
              <p className="text-sm text-stone-600 mt-1 italic">"Sua paixão transformada em profissão. Uma frase que resume sua jornada."</p>
            </div>
          </div>
          
          <div className="text-stone-700 text-sm space-y-2 p-2 animate-fade-in opacity-0" style={{animationDelay: '100ms'}}>
             <p>Este é o espaço para contar sua história! Fale sobre sua paixão, sua experiência e o que torna seu trabalho único.</p>
             <p className="opacity-70"><strong>Exemplo:</strong> "Desde pequena, sou apaixonada por realçar a beleza natural. Após anos de estudo, fundei este espaço para criar um ambiente acolhedor onde cada cliente se sinta única..."</p>
          </div>

          <div className="bg-pink-100 border-l-4 border-pink-400 text-stone-800 p-4 rounded-r-lg mt-4 animate-fade-in opacity-0" style={{animationDelay: '200ms'}}>
            <h4 className="font-bold">Por que isso é um diferencial?</h4>
            <p className="mt-2 text-sm">
              Uma seção "Quem Sou Eu" humaniza sua marca e cria um laço de confiança. Clientes não compram apenas um serviço; eles se conectam com a sua história. Isso te diferencia da concorrência e gera lealdade.
            </p>
          </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-6 bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors">Entendi</button>
      </Modal>

      <Modal isOpen={activeModal === 'services'} onClose={handleCloseModal} title="Nossos Serviços">
        <div className="text-left text-stone-700 space-y-4">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white border-2 border-pink-200 p-4 rounded-lg transition-shadow hover:shadow-md">
              <h5 className="font-serif text-lg text-pink-500 font-bold">{service.name}</h5>
              <p className="text-sm text-stone-600 mt-1">{service.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm font-semibold text-stone-700">{service.price}</p>
                <button 
                  onClick={() => handleScheduleService(service.name)}
                  className="bg-pink-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-500 transition-colors text-sm"
                >
                  Agendar
                </button>
              </div>
            </div>
          ))}
          <div className="bg-pink-100 border-l-4 border-pink-400 text-stone-800 p-4 rounded-r-lg mt-4">
            <h4 className="font-bold">Da Vitrine ao WhatsApp</h4>
            <p className="mt-2 text-sm">Aqui, sua cliente confere seus serviços e, com um clique, envia uma solicitação de agendamento personalizada direto para o seu WhatsApp. Facilita para ela, organiza para você.</p>
          </div>
        </div>
      </Modal>
      
      <Modal isOpen={activeModal === 'portfolio'} onClose={handleCloseModal} title="Mostre Seu Talento (Portfólio)">
        <div className="text-left text-stone-700 space-y-4">
          <p>Este botão levaria suas clientes diretamente para o seu <strong>perfil do Instagram</strong> ou outra galeria de fotos.</p>
          <div className="bg-white border-2 border-pink-200 p-4 rounded-lg">
            <p className="font-bold text-stone-800">Exemplo Fictício:</p>
            <p className="text-sm text-stone-600 mt-2 italic">"Imagine que aqui sua cliente pode conferir um pouco do seu trabalho com um antes e depois, ou então direcionar para seu site oficial..."</p>
          </div>
          <div className="bg-pink-100 border-l-4 border-pink-400 text-stone-800 p-4 rounded-r-lg">
            <h4 className="font-bold">Por que isso é um diferencial?</h4>
            <p className="mt-2 text-sm">É a sua vitrine digital! Clientes podem ver a qualidade do seu trabalho, se inspirar e sentir mais confiança para agendar. Um portfólio forte é uma das melhores ferramentas para atrair e converter novas clientes.</p>
          </div>
        </div>
         <button onClick={handleCloseModal} className="w-full mt-6 bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors">Entendi</button>
      </Modal>

      <Modal isOpen={activeModal === 'location'} onClose={handleCloseModal} title="Facilite a Chegada (Localização)">
         <div className="text-left text-stone-700 space-y-4">
          <p>Aqui, apareceria um <strong>mapa interativo</strong> e um botão "Como Chegar" que abriria o Waze ou Google Maps no celular da cliente.</p>
          <div className="bg-white border-2 border-pink-200 p-4 rounded-lg text-center">
            <p className="font-bold text-stone-800">Exemplo Link Bio</p>
            <p className="text-sm text-stone-600 mt-1">Rua das Flores, 123 - Centro</p>
            <p className="mt-2 text-pink-500 font-semibold">[ Ver no mapa e traçar rota ]</p>
          </div>
          <div className="bg-pink-100 border-l-4 border-pink-400 text-stone-800 p-4 rounded-r-lg">
            <h4 className="font-bold">Por que isso é um diferencial?</h4>
            <p className="mt-2 text-sm">Você elimina qualquer dúvida sobre como encontrar seu espaço. Isso reduz atrasos e cancelamentos, melhorando a experiência da cliente antes mesmo dela chegar, transmitindo profissionalismo e cuidado.</p>
          </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-6 bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors">Entendi</button>
      </Modal>

      <Modal isOpen={activeModal === 'rating'} onClose={handleCloseModal} title="Sua opinião nos inspira!">
        <p className="text-center text-stone-700 mb-4">Como foi sua experiência conosco?</p>
        <div className="flex justify-center items-center gap-2 my-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="transition-transform duration-200 hover:scale-125" aria-label={`Avaliar ${star} estrela${star > 1 ? 's' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path className={`transition-colors ${(hoverRating || rating) >= star ? 'text-pink-400' : 'text-stone-300'}`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </button>
            ))}
        </div>
        <div className="bg-pink-100 border-l-4 border-pink-400 text-stone-800 p-4 rounded-r-lg mb-6">
          <h4 className="font-bold">Por que isso é um diferencial?</h4>
          <p className="mt-2 text-sm">
            Esta funcionalidade é uma via de mão dupla: avaliações 5 estrelas geram prova social e podem ser direcionadas para o Google. Feedbacks construtivos se tornam uma oportunidade valiosa para você melhorar, demonstrando um atendimento excepcional e fidelizando a cliente.
          </p>
        </div>
        <button onClick={handleRatingSubmit} disabled={rating === 0} className="w-full bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed">Confirmar Avaliação</button>
      </Modal>

      <Modal isOpen={activeModal === 'feedback'} onClose={handleCloseModal} title="Como podemos melhorar?">
        <p className="text-stone-700 mb-4">Sua opinião é muito valiosa. Por favor, conte-nos o que podemos fazer para tornar sua próxima visita perfeita.</p>
        <form onSubmit={handleFeedbackSubmit}>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full h-32 p-3 border-2 border-pink-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-stone-800" placeholder="Seu feedback..." required />
            <button type="submit" className="w-full mt-4 bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors">Enviar Feedback</button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'contact'} onClose={handleCloseModal} title="Fale Conosco">
        {contactStep === 1 ? (
          <div>
            <div className="mb-4">
              <label htmlFor="contactName" className="block text-stone-700 font-semibold mb-2">Seu nome</label>
              <input type="text" id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full p-2 border-2 border-pink-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-stone-800" required/>
            </div>
            <div className="mb-6">
              <label className="block text-stone-700 font-semibold mb-2">Qual o motivo do contato?</label>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center p-3 border-2 border-pink-200 rounded-lg has-[:checked]:bg-pink-100 has-[:checked]:border-pink-400 transition cursor-pointer">
                  <input type="radio" name="contactReason" value="agendar" checked={contactReason === 'agendar'} onChange={(e) => setContactReason(e.target.value)} className="h-4 w-4 text-pink-600 focus:ring-pink-500"/>
                  <span className="ml-3 text-stone-800">Agendar um Horário</span>
                </label>
                <label className="flex items-center p-3 border-2 border-pink-200 rounded-lg has-[:checked]:bg-pink-100 has-[:checked]:border-pink-400 transition cursor-pointer">
                  <input type="radio" name="contactReason" value="outro" checked={contactReason === 'outro'} onChange={(e) => setContactReason(e.target.value)} className="h-4 w-4 text-pink-600 focus:ring-pink-500"/>
                  <span className="ml-3 text-stone-800">Dúvidas e Outros</span>
                </label>
              </div>
            </div>
            <button onClick={() => setContactStep(2)} disabled={!contactName || !contactReason} className="w-full bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed">Próximo</button>
          </div>
        ) : contactReason === 'agendar' ? (
          <div>
            {selectedService && (
              <div className="mb-4 bg-pink-100 p-3 rounded-lg border border-pink-300">
                <p className="text-sm text-stone-700">Serviço selecionado:</p>
                <p className="font-bold text-pink-600">{selectedService}</p>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="contactDateTime" className="block text-stone-700 font-semibold mb-2">Qual a sua preferência de data e hora?</label>
              <textarea id="contactDateTime" value={contactDateTime} onChange={(e) => setContactDateTime(e.target.value)} className="w-full h-24 p-2 border-2 border-pink-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-stone-800" placeholder="Ex: Amanhã à tarde, ou 25/12 às 15h" required/>
            </div>
            {!selectedService && (
              <div className="mb-6">
                <label className="block text-stone-700 font-semibold mb-2">Serviços de interesse (opcional)</label>
                <div className="grid grid-cols-2 gap-2">
                    {Object.keys(contactServices).map(item => (
                        <label key={item} className="flex items-center p-3 border-2 border-pink-200 rounded-lg has-[:checked]:bg-pink-100 has-[:checked]:border-pink-400 transition cursor-pointer">
                            <input type="checkbox" checked={contactServices[item]} onChange={() => handleServiceCheckboxChange(item)} className="h-4 w-4 text-pink-600 rounded focus:ring-pink-500"/>
                            <span className="ml-3 text-sm text-stone-800">{item}</span>
                        </label>
                    ))}
                </div>
              </div>
            )}
            <button onClick={handleSendWhatsApp} disabled={!contactDateTime} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed">Enviar via WhatsApp</button>
          </div>
        ) : (
           <div>
            <div className="mb-4">
                <label htmlFor="contactOtherReason" className="block text-stone-700 font-semibold mb-2">Deixe sua mensagem</label>
                <textarea id="contactOtherReason" value={contactOtherReason} onChange={(e) => setContactOtherReason(e.target.value)} className="w-full h-32 p-2 border-2 border-pink-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-stone-800" required/>
            </div>
            <button onClick={handleSendWhatsApp} disabled={!contactOtherReason} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed">Enviar via WhatsApp</button>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'contactDemo'} onClose={handleCloseModal} title="Contato Direto e Profissional">
        <div className="text-left text-stone-700 space-y-4">
            <p>Em um site real, sua cliente seria direcionada para o <strong>WhatsApp com uma mensagem automática</strong>, já preenchida.</p>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <p className="font-bold text-stone-800">Exemplo da mensagem gerada:</p>
                <p className="text-sm text-stone-600 mt-2 bg-white p-3 rounded-md shadow-inner">"Olá! Meu nome é <strong>{contactName || 'Maria'}</strong> e gostaria de agendar um horário. Minha preferência é <strong>{contactDateTime || 'amanhã à tarde'}</strong>. Tenho interesse em <strong>{selectedService ? selectedService : Object.entries(contactServices).filter(([,v]) => v).map(([k])=>k).join(', ') || 'um de seus serviços'}</strong>. Obrigado(a)!"</p>
            </div>
            <div className="bg-green-100 border-l-4 border-green-500 text-stone-800 p-4 rounded-r-lg">
                <h4 className="font-bold">Por que isso é um diferencial?</h4>
                <p className="mt-2 text-sm">Você recebe as solicitações de forma clara e padronizada, economizando tempo. Para a cliente, é um processo rápido e fácil. Isso transmite uma imagem de organização e profissionalismo para o seu negócio.</p>
            </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-6 bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors">Entendi</button>
      </Modal>

      <Modal isOpen={activeModal === 'ratingSuccess5'} onClose={handleCloseModal} title="Agradecemos sua avaliação!">
        <div className="text-left text-stone-700 space-y-4">
            <p>Ficamos felizes com sua nota! Em um site real, você poderia convidar a cliente a deixar essa mesma avaliação na sua página do Google.</p>
             <blockquote className="bg-white border-l-4 border-yellow-400 p-4 rounded-r-lg italic">
                <p className="text-sm text-stone-600">"Atendimento impecável e o resultado ficou melhor do que eu imaginava! A profissional foi incrível. Com certeza voltarei!"</p>
                <cite className="block text-right font-semibold text-stone-700 mt-2 not-italic">- Exemplo de avaliação no Google</cite>
            </blockquote>
            <div className="bg-pink-100 border-l-4 border-pink-400 text-stone-800 p-4 rounded-r-lg">
                <h4 className="font-bold">Por que isso é um diferencial?</h4>
                <p className="mt-2 text-sm">Avaliações 5 estrelas no Google constroem sua reputação online, aumentam sua visibilidade nas buscas e atraem mais clientes que confiam na opinião de outras pessoas.</p>
            </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-6 bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors">Entendi</button>
      </Modal>

      <Modal isOpen={activeModal === 'feedbackSuccess'} onClose={handleCloseModal} title="Feedback Recebido!">
        <div className="text-left text-stone-700 space-y-4">
            <p>Obrigado por nos ajudar a melhorar! Sua mensagem foi recebida e será analisada com carinho.</p>
            <div className="bg-white border-2 border-pink-200 p-4 rounded-lg">
              <p className="font-bold text-stone-800">Exemplo de Ação:</p>
              <p className="text-sm text-stone-600 mt-2 italic">"Com base no seu feedback sobre a música ambiente, já atualizamos nossa playlist para incluir opções mais relaxantes. Agradecemos a sugestão!"</p>
            </div>
            <div className="bg-pink-100 border-l-4 border-pink-400 text-stone-800 p-4 rounded-r-lg">
                <h4 className="font-bold">Por que isso é um diferencial?</h4>
                <p className="mt-2 text-sm">Coletar feedbacks mostra que você se importa com a opinião da cliente, ajuda a identificar pontos de melhoria e aumenta a fidelização. Uma cliente que se sente ouvida tem mais chances de voltar.</p>
            </div>
        </div>
        <button onClick={handleCloseModal} className="w-full mt-6 bg-pink-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-500 transition-colors">Entendi</button>
      </Modal>

      <Modal isOpen={activeModal === 'developer'} onClose={handleCloseModal} title="Contato do Desenvolvedor">
        {developerModalStep === 1 ? (
          <div className="text-center text-stone-700 space-y-4">
            <p>Este site é um modelo desenvolvido por <strong>InteligenciArte.IA</strong> para demonstrar o potencial de um "link na bio" profissional.</p>
            <a 
              href="https://instagram.com/inteligenciarte.ia" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-full bg-white border-2 border-pink-300 text-stone-800 font-bold py-3 px-4 rounded-lg hover:bg-rose-100 transition-colors"
            >
              <InstagramIcon />
              <span className="ml-2">@inteligenciarte.ia</span>
              <ExternalLinkIcon className="ml-auto w-5 h-5" />
            </a>
            <p className="text-sm pt-2">Gostou e quer um para o seu negócio? Fale comigo!</p>
            <button 
              onClick={() => setDeveloperModalStep(2)}
              className="w-full animated-gradient text-white font-bold py-3 px-4 rounded-lg hover:scale-105 transition-transform shadow-lg"
            >
              Quero um site incrível como esse! 🚀
            </button>
          </div>
        ) : (
          <form onSubmit={handleDeveloperContactSubmit}>
            <p className="text-stone-700 mb-4 text-center">Que ótimo! Para personalizar seu contato, por favor, me diga seu nome.</p>
            <div className="mb-4">
              <label htmlFor="devContactName" className="sr-only">Seu nome</label>
              <input 
                type="text" 
                id="devContactName" 
                value={developerContactName} 
                onChange={(e) => setDeveloperContactName(e.target.value)} 
                className="w-full p-3 border-2 border-pink-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-stone-800" 
                placeholder="Seu nome"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={!developerContactName.trim()}
              className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <WhatsAppIcon />
              <span className="ml-2">Enviar para o WhatsApp</span>
            </button>
          </form>
        )}
      </Modal>
      
      <style>{`
        body { font-family: 'Montserrat', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .animated-gradient {
            background: linear-gradient(-45deg, #ffe5e9, #f4d3e3, #e8d5f0, #e1e0f2);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        .text-gradient-animated {
          background: linear-gradient(-60deg, #ec4899, #d946ef, #f87171, #fb923c, #ec4899);
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: text-gradient-flow 8s ease-in-out infinite;
        }
        @keyframes text-gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
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
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-whoosh {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(540deg) scale(1.1); }
            100% { transform: rotate(1080deg) scale(1); }
        }
        .animate-spin-whoosh {
            animation: spin-whoosh 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-fade-in { animation: fade-in 0.5s forwards cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-fade-in-up { animation: fade-in-up 0.6s forwards cubic-bezier(0.4, 0, 0.2, 1); }
        .opacity-0 { opacity: 0; }
      `}</style>
    </main>
  );
};

export default App;