import natural from 'natural';
import knowledge from '@/Data/trading-knowledge';

const { TfIdf, PorterStemmer, WordTokenizer } = natural;
const stemmer = PorterStemmer.stem;
const tokenizer = new WordTokenizer();

export async function POST(request) {
  const { message } = await request.json();

  // Initialize TF-IDF model
  const tfidf = new TfIdf();
  const documents = [];
  const answers = [];

  // Load knowledge base into TF-IDF model
  Object.values(knowledge).forEach(category => {
    category.forEach(item => {
      const docText = [
        ...item.keywords, 
        item.answer
      ].join(' ');

      documents.push(docText);
      answers.push(item.answer);  // Store answers separately
      tfidf.addDocument(docText);
    });
  });

  // Tokenize & stem the input message
  const tokens = tokenizer.tokenize(message);
  const stemmedQuery = tokens.map(stemmer).join(' ');

  // Find the best match using TF-IDF
  let bestMatch = { score: 0, answer: null };

  tfidf.tfidfs(stemmedQuery, (docIndex, score) => {
    if (score > bestMatch.score) {
      bestMatch = {
        score,
        answer: answers[docIndex]  // Only return the answer, not the full document
      };
    }
  });

  return Response.json({
    response: bestMatch.answer || "I need more training on this topic. Please ask another trading-related question. Try asking: - Trading pattern - Stop-loss and take-profit - types of market - trading psychology - Risk-reward ratio"
  });
}
