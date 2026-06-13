import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const systemInstruction = `Bạn tên là "Biện Chứng AI" — trợ lý triết học của nhóm 7 MLN111.
Bạn xưng hô là "Mình" và gọi người dùng là "Bạn".
Giọng điệu: học thuật nhưng thân thiện, rõ ràng, có chiều sâu.
Phạm vi kiến thức: Bạn là chuyên gia về "Chủ nghĩa duy vật biện chứng" trong triết học Mác-Lênin, bao gồm: vật chất và ý thức, phép biện chứng duy vật (hai nguyên lý, ba quy luật, sáu cặp phạm trù), lý luận nhận thức duy vật biện chứng và chân lý.

CƠ CHẾ TỪ CHỐI (RẤT QUAN TRỌNG): Nếu người dùng hỏi BẤT CỨ ĐIỀU GÌ nằm ngoài chủ đề "Chủ nghĩa duy vật biện chứng và triết học Mác-Lênin", bạn TUYỆT ĐỐI KHÔNG được trả lời nội dung đó. Bạn CHỈ ĐƯỢC PHÉP đáp lại bằng đúng câu này: "Xin lỗi bạn nha! Câu này nằm ngoài phạm trù của mình. Bạn có thể hỏi về chủ nghĩa duy vật biện chứng, vật chất, ý thức, hoặc các quy luật biện chứng không?"
Không được thêm bớt bất kỳ từ nào vào câu từ chối này.
`;

const INITIAL_MESSAGE = "Xin chào! Mình là Biện Chứng AI — trợ lý triết học của nhóm 7 MLN111. Mình sẵn sàng giải đáp mọi thắc mắc về chủ nghĩa duy vật biện chứng. Bạn có câu hỏi gì không? :)";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatSessionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (genAI && !chatSessionRef.current) {
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
        systemInstruction: systemInstruction,
      });
      chatSessionRef.current = model.startChat({
        history: [],
      });
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    if (!genAI || !apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: "Lỗi: Chưa cấu hình VITE_GEMINI_API_KEY trong file .env." }
      ]);
      setIsLoading(false);
      return;
    }

    try {
      if (!chatSessionRef.current) {
        throw new Error("Chat session not initialized");
      }

      const result = await chatSessionRef.current.sendMessage(userMessage);
      const responseText = result.response.text();

      setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: "Xin lỗi, đã xảy ra lỗi khi kết nối với hệ thống. Vui lòng thử lại sau nhé!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col border border-gray-200 mb-4"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="bg-red-800 text-parchment-light p-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#c9a84c] rounded-full animate-pulse"></div>
                <h3 className="font-playfair text-ink-old text-sm tracking-[0.1em] uppercase">Biện Chứng AI</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sepia/60 hover:text-sepia transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-parchment-old/80">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${msg.role === 'user'
                      ? 'bg-[#c9a84c]/20 border border-[#c9a84c]/30 text-sepia rounded-tr-none'
                      : 'bg-parchment-old border border-[rgba(201,168,76,0.15)] text-sepia rounded-tl-none'
                      }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="text-sm leading-relaxed whitespace-pre-wrap [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_strong]:font-bold [&_em]:italic">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-parchment-old border border-gold-classic/15 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#c9a84c]/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#c9a84c]/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[#c9a84c]/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 bg-parchment-old/80 border-t border-gold-classic/15">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Hỏi về triết học Mác–Lênin..."
                  className="flex-1 px-4 py-2 bg-parchment-old border border-[rgba(201,168,76,0.15)] text-sepia text-sm focus:outline-none focus:border-[#c9a84c]/40 transition-colors placeholder:text-sepia/40"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 border border-[rgba(201,168,76,0.3)] text-gold-classic disabled:opacity-30 hover:bg-[rgba(201,168,76,0.1)] transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-parchment-old border-2 border-[#c9a84c]/40 hover:border-[#c9a84c] text-gold-classic p-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};