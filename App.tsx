import React, { useState } from 'react';
import LinkButton from './components/LinkButton';
import { MenuIcon, InstagramIcon, LocationIcon, StarIcon, ExternalLinkIcon, CloseIcon, ContactIcon, DirectionsIcon } from './components/Icons';

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
        className="bg-yellow-50 rounded-2xl shadow-xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" 
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-black mb-4 text-center sm:text-left">{title}</h2>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-black/60 hover:text-black transition-colors"
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
  
  // Rating state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Contact state
  const [contactStep, setContactStep] = useState(1);
  const [contactName, setContactName] = useState('');
  const [contactReason, setContactReason] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactItems, setContactItems] = useState<Record<string, boolean>>({
      'Cerveja': false,
      'Refrigerante': false,
      'Salgadinhos': false,
      'Gelo': false,
  });
  const [contactOtherReason, setContactOtherReason] = useState('');

  const handleCloseModal = () => {
    setActiveModal(null);
    // Delay resets to allow for closing animation
    setTimeout(() => {
        setRating(0);
        setHoverRating(0);
        setFeedback('');
        setContactStep(1);
        setContactName('');
        setContactReason('');
        setContactAddress('');
        setContactItems({ Cerveja: false, Refrigerante: false, Salgadinhos: false, Gelo: false });
        setContactOtherReason('');
    }, 300);
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
    const phone = '5541988710303'; // Número de exemplo
    let message = '';

    if (contactReason === 'comprar') {
        const selectedItems = Object.keys(contactItems).filter(item => contactItems[item]).join(', ');
        message = `Olá, meu nome é ${contactName}. Gostaria de fazer um pedido.\n\nItens: ${selectedItems || 'Nenhum item selecionado'}\nEndereço de entrega: ${contactAddress}`;
    } else {
        message = `Olá, meu nome é ${contactName}.\n\nMotivo do contato: ${contactOtherReason}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    handleCloseModal();
  };

  const handleItemCheckboxChange = (item: string) => {
    setContactItems(prev => ({...prev, [item]: !prev[item]}));
  };

  const locationAddress = "Estádio do Maracanã, Rio de Janeiro, Brasil";

  return (
    <main className="min-h-screen animated-gradient flex items-center justify-center p-2 sm:p-4 font-sans">
      <div className="w-full max-w-md bg-yellow-300/80 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-8">
        <div className="flex flex-col items-center">
        
          <img 
            src="/img.png" 
            alt="Exemplão Conveniência e Distribuidora" 
            className="w-32 sm:w-48 h-auto mb-2 sm:mb-4" 
          />

          <h1 className="text-2xl sm:text-3xl font-bold text-black text-center tracking-tight">
            Exemplão Conveniência e Distribuidora
          </h1>

          <p className="text-sm sm:text-base text-black/80 text-center mt-1 mb-6">
            Sua Parada Estratégica para Bebidas e Conveniência
          </p>

          <div className="w-full flex flex-col space-y-3 sm:space-y-4">
            <LinkButton 
              onClick={() => setActiveModal('catalog')}
              icon={<MenuIcon />}
              text="Catálogo de Produtos"
            />
            <LinkButton 
              onClick={() => setActiveModal('instagram')}
              icon={<InstagramIcon />}
              text="Instagram"
            />
            <LinkButton 
              onClick={() => setActiveModal('location')}
              icon={<LocationIcon />}
              text="Localização"
            />
            <LinkButton 
              onClick={() => setActiveModal('rating')}
              icon={<StarIcon />}
              text="Avalie-nos"
            />
             <LinkButton 
              onClick={() => setActiveModal('contact')}
              icon={<ContactIcon />}
              text="Contato"
            />
          </div>
        </div>
      </div>
      
      {/* --- MODALS --- */}

      <Modal isOpen={activeModal === 'catalog'} onClose={handleCloseModal} title="Um Catálogo Digital para o seu Negócio">
        <p className="text-black/90 mb-4 text-center">
            Imagine seus produtos em um catálogo digital interativo e visualmente deslumbrante, como este site.
        </p>
        <div className="space-y-3 my-6 text-black/90">
            <p className="flex items-center"><span className="text-xl mr-3">✨</span> Design moderno e animado</p>
            <p className="flex items-center"><span className="text-xl mr-3">📸</span> Fotos e vídeos em alta qualidade</p>
            <p className="flex items-center"><span className="text-xl mr-3">🔄</span> Manutenção avulsa, semanal, ou individual</p>
            <p className="flex items-center"><span className="text-xl mr-3">🔗</span> Link direto para compra no WhatsApp</p>
        </div>
        <p className="text-black/90 mb-6 text-center">
            Podemos criar uma experiência única para seus clientes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleCloseModal} className="w-full bg-gray-300 text-black font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors">
              Fechar
            </button>
            <button onClick={() => setActiveModal('contact')} className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
              Quero um para mim!
            </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'location'} onClose={handleCloseModal} title="Nossa Localização">
        <p className="text-black/90 mb-4">
            Exemplão Conveniência e Distribuidora<br/>
            Rua Exemplo, 123 - Bairro Modelo<br/>
            Cidade Fictícia - UF, 00000-000
        </p>
        <div className="rounded-lg overflow-hidden border-2 border-yellow-300">
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.215585099517!2d-43.23235308556784!3d-22.90535564498344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997e59c3552a49%3A0x23b325fb82348b6!2sEst%C3%A1dio%20do%20Maracan%C3%A3!5e0!3m2!1spt-BR!2sbr!4v1655315801937!5m2!1spt-BR!2sbr" width="100%" height="350" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationAddress)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-4 flex items-center justify-center bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <DirectionsIcon />
          <span className="ml-2">Obter Rotas (Exemplo)</span>
        </a>
      </Modal>

      <Modal isOpen={activeModal === 'rating'} onClose={handleCloseModal} title="Sua opinião é importante!">
        <p className="text-center text-black/80 mb-4">Como você avalia nosso serviço?</p>
        <div className="flex justify-center items-center gap-2 my-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <button 
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform duration-200 hover:scale-125"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path 
                          className={`transition-colors ${(hoverRating || rating) >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
                        />
                    </svg>
                </button>
            ))}
        </div>
        <button 
            onClick={handleRatingSubmit}
            disabled={rating === 0}
            className="w-full mt-4 bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            Confirmar Avaliação
        </button>
      </Modal>

      <Modal isOpen={activeModal === 'feedback'} onClose={handleCloseModal} title="Deixe seu feedback">
        <p className="text-black/80 mb-4">Lamentamos que sua experiência não tenha sido a ideal. Por favor, conte-nos como podemos melhorar!</p>
        <form onSubmit={handleFeedbackSubmit}>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full h-32 p-3 border-2 border-yellow-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-black"
                placeholder="Seu feedback..."
                required
            />
            <button 
                type="submit"
                className="w-full mt-4 bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
            >
                Enviar Feedback
            </button>
        </form>
      </Modal>

       <Modal isOpen={activeModal === 'contact'} onClose={handleCloseModal} title="Entre em Contato">
        {contactStep === 1 ? (
          <div>
            <div className="mb-4">
              <label htmlFor="contactName" className="block text-black/80 font-semibold mb-2">Seu nome</label>
              <input type="text" id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full p-2 border-2 border-yellow-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-black" required/>
            </div>
            <div className="mb-6">
              <label className="block text-black/80 font-semibold mb-2">Motivo do contato</label>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center p-3 border-2 border-yellow-300 rounded-lg has-[:checked]:bg-yellow-200 has-[:checked]:border-yellow-500 transition cursor-pointer">
                  <input type="radio" name="contactReason" value="comprar" checked={contactReason === 'comprar'} onChange={(e) => setContactReason(e.target.value)} className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"/>
                  <span className="ml-3 text-black">Quero Comprar</span>
                </label>
                <label className="flex items-center p-3 border-2 border-yellow-300 rounded-lg has-[:checked]:bg-yellow-200 has-[:checked]:border-yellow-500 transition cursor-pointer">
                  <input type="radio" name="contactReason" value="outro" checked={contactReason === 'outro'} onChange={(e) => setContactReason(e.target.value)} className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"/>
                  <span className="ml-3 text-black">Outro</span>
                </label>
              </div>
            </div>
            <button onClick={() => setContactStep(2)} disabled={!contactName || !contactReason} className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              Próximo
            </button>
          </div>
        ) : contactReason === 'comprar' ? (
          <div>
            <div className="mb-4">
              <label htmlFor="contactAddress" className="block text-black/80 font-semibold mb-2">Endereço de entrega</label>
              <textarea id="contactAddress" value={contactAddress} onChange={(e) => setContactAddress(e.target.value)} className="w-full h-24 p-2 border-2 border-yellow-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-black" required/>
            </div>
             <div className="mb-6">
                <label className="block text-black/80 font-semibold mb-2">Itens (opcional)</label>
                <div className="grid grid-cols-2 gap-2">
                    {Object.keys(contactItems).map(item => (
                        <label key={item} className="flex items-center p-3 border-2 border-yellow-300 rounded-lg has-[:checked]:bg-yellow-200 has-[:checked]:border-yellow-500 transition cursor-pointer">
                            <input type="checkbox" checked={contactItems[item]} onChange={() => handleItemCheckboxChange(item)} className="h-4 w-4 text-yellow-600 rounded focus:ring-yellow-500"/>
                            <span className="ml-3 text-black">{item}</span>
                        </label>
                    ))}
                </div>
            </div>
            <button onClick={handleSendWhatsApp} disabled={!contactAddress} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              Enviar via WhatsApp
            </button>
          </div>
        ) : (
           <div>
            <div className="mb-4">
                <label htmlFor="contactOtherReason" className="block text-black/80 font-semibold mb-2">Descreva brevemente o motivo</label>
                <textarea id="contactOtherReason" value={contactOtherReason} onChange={(e) => setContactOtherReason(e.target.value)} className="w-full h-32 p-2 border-2 border-yellow-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-black" required/>
            </div>
            <button onClick={handleSendWhatsApp} disabled={!contactOtherReason} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              Enviar via WhatsApp
            </button>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'instagram'} onClose={handleCloseModal} title="Instagram do seu Negócio">
        <p className="text-center text-black/80">
          Ao clicar neste botão, seu cliente seria redirecionado diretamente para o perfil do seu negócio no Instagram.
        </p>
        <button onClick={handleCloseModal} className="w-full mt-4 bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
          Entendi
        </button>
      </Modal>

      <Modal isOpen={activeModal === 'ratingSuccess5'} onClose={handleCloseModal} title="Obrigado por nos avaliar!">
        <p className="text-center text-black/80">
          Em um site real, o cliente seria redirecionado para a página de avaliações do seu negócio no Google para deixar uma avaliação de 5 estrelas.
        </p>
        <button onClick={handleCloseModal} className="w-full mt-4 bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
          Entendi
        </button>
      </Modal>

      <Modal isOpen={activeModal === 'feedbackSuccess'} onClose={handleCloseModal} title="Feedback Recebido!">
        <p className="text-center text-black/80">
          Obrigado pelo seu feedback. Em uma aplicação real, esta mensagem seria enviada diretamente para o email do proprietário.
        </p>
        <button onClick={handleCloseModal} className="w-full mt-4 bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
          Entendi
        </button>
      </Modal>
      
      <style>{`
        .animated-gradient {
            background: linear-gradient(-45deg, #FFC300, #FFD60A, #F9B208, #F9A602);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
      `}</style>
    </main>
  );
};

export default App;