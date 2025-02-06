'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const welcomeText =
      "Welcome to TradeVerse\n\nYour Trading Knowledge Hub\n\nTry asking:\n- Technical patterns\n- Stop-loss\n- trader mindset\n- moving average convergence divergence/MACD\n- patience in trading \n-rrr-risk reward ratio";
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= welcomeText.length) {
        setWelcomeMessage(welcomeText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    setMessages((prev) => [...prev, { text: inputText, isBot: false }]);
    setInputText('');
    setIsLoading(true);

    if (showWelcome) {
      setMessages((prev) => [{ text: welcomeMessage, isBot: true }, ...prev]);
      setShowWelcome(false);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText }),
      });

      const { response: botResponse } = await response.json();

      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: '⚠️ Error connecting to trading knowledge base', isBot: true },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <main className={`${inter.className} flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800`}>
      {/* Header */}
      <header className="p-2 bg-grey-800 flex items-center justify-center gap-3 border-b border-gray-700 h-16">
        <Image
          src="/tradeverse-logo.png"
          alt="Logo"
          width={70}
          height={70}
          className="h-32 w-auto invert"
        />
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto relative p-4">
        {showWelcome && (
          <div className="absolute inset-0 flex items-center justify-center text-center bg-gray-900/90">
            <div className="max-w-2xl text-gray-400 animate-fade-in">
              {welcomeMessage.split('\n').map((line, i) => (
                <p key={i} className="text-lg mb-3">{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="max-w-4xl mx-auto space-y-3">
  {messages.map((message, index) => (
    <div
      key={index}
      className={`p-3 rounded-lg  w-fit max-w-[85%] ${message.isBot ? 'bg-gray-700/60 text-gray-200 ml-auto' : 'bg-blue-600/90 text-white mr-auto'}`}
      style={{ whiteSpace: 'pre-line' }} // This ensures new lines are displayed correctly
    >
      {message.text}
    </div>
  ))}

          {isLoading && (
            <div className="p-3 rounded-lg bg-gray-700/60 text-gray-200 w-fit max-w-[85%] ml-auto">
              Analyzing...
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about trading strategies..."
            className="flex-1 p-3 rounded-xl bg-gray-700/50 text-gray-200 placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-purple-900 hover:bg-purple-700 text-white rounded-xl 
                      transition-all duration-200 active:scale-95"
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
}
