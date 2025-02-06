export default function ChatInput({ 
    inputText, 
    setInputText, 
    isLoading, 
    handleSubmit 
  }) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex gap-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about trading strategies, patterns, or market analysis..."
            className="flex-1 p-4 rounded-xl bg-gray-700/50 text-gray-100 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
                      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Send'}
          </button>
        </div>
      </form>
    );
  }