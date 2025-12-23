
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Bonjour ! Je suis l'assistant EduLivre CM. Comment puis-je vous aider aujourd'hui ? Je peux vous conseiller sur les livres à choisir pour chaque niveau scolaire au Cameroun." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "Tu es un assistant expert en éducation au Cameroun pour la plateforme EduLivre CM. Aide les parents et élèves à trouver les bons manuels scolaires (Maternelle, Primaire, Secondaire, Université). Sois chaleureux, pro-actif et cite des exemples de matières comme les Mathématiques, le Français, ou les Sciences. Parle en FCFA quand tu mentionnes des prix (en restant général, ex: entre 3000 et 8000 FCFA). Encourage l'achat de livres d'occasion pour économiser.",
        },
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Désolé, je n'ai pas pu générer de réponse." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Oups ! Une erreur s'est produite lors de la connexion à mon cerveau artificiel. Veuillez réessayer." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[700px] border border-gray-100">
        <div className="bg-cameroonGreen p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-cameroonGold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-xl">Assistant Éducation</h2>
              <p className="text-green-100 text-xs flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                IA Alimentée par Gemini
              </p>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/50" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-cameroonGreen text-white rounded-tr-none' 
                : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-gray-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Posez votre question (ex: 'Quels livres pour la Terminale C ?')" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cameroonGreen transition"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-cameroonGreen text-white rounded-xl flex items-center justify-center hover:bg-opacity-90 transition disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
            EduLivre CM IA Assistant • Version 1.0 Beta
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
