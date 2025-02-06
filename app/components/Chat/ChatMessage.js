export default function ChatMessage({ message }) {
  return (
    <div className={`p-4 rounded-lg my-2 max-w-[80%] ${
      message.isBot 
        ? 'bg-gray-700/60 text-gray-100 ml-auto'
        : 'bg-purple-600/90 text-white mr-auto'
    }`}>
      <div className="text-sm space-y-2" style={{ whiteSpace: 'pre-line' }}>
        {message.text} 
        {message.source && (
          <div className="mt-2 text-xs text-red-400">
            Source: {message.source === 'system' 
              ? 'TradeVerse Bot' 
              : 'Verified Trading Knowledge'}
          </div>
        )}
      </div>
    </div>
  );
}
