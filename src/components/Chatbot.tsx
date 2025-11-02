// Chatbot component - AI assistant to guide visitors
// Provides information about rooms, experiences, and booking process

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Hotel, MapPin, Calendar, Sparkles, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
}

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLang = (localStorage.getItem('i18nextLng') || i18n.language || 'fr') as 'fr' | 'en' | 'ar';

  const greetings = {
    fr: [
      "Bonjour ! Je suis Zahra, votre assistante virtuelle de Dar Dhiafa Paul Klee. Comment puis-je vous aider aujourd'hui ?",
      "Bonjour ! Je suis là pour répondre à vos questions sur notre maison d'hôtes à Kairouan. Que souhaitez-vous savoir ?",
      "Salut ! Je suis Zahra et je serai ravie de vous renseigner sur Dar Dhiafa Paul Klee. Comment puis-je vous aider ?"
    ],
    en: [
      "Hello! I'm Zahra, your virtual assistant from Dar Dhiafa Paul Klee. How can I help you today?",
      "Hello! I'm here to answer your questions about our guesthouse in Kairouan. What would you like to know?",
      "Hi! I'm Zahra and I'd be happy to help you with information about Dar Dhiafa Paul Klee. How can I assist you?"
    ],
    ar: [
      "مرحبا! أنا زهرة، مساعدتك الافتراضية من دار ضيافة بول كلي. كيف يمكنني مساعدتك اليوم؟",
      "مرحبا! أنا هنا للإجابة على أسئلتك حول بيت ضيافتنا في القيروان. ماذا تريدين أن تعرفي؟",
      "أهلا! أنا زهرة وسأكون سعيدة لمساعدتك بمعلومات حول دار ضيافة بول كلي. كيف يمكنني مساعدتك؟"
    ]
  };

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = greetings[currentLang][Math.floor(Math.random() * greetings[currentLang].length)];
      setMessages([{
        id: "1",
        text: greeting,
        sender: "bot",
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getInitialSuggestions = (): string[] => {
    const suggestions = {
      fr: [
        "🏛️ Présente-moi la maison",
        "🍽️ Parle-moi des repas",
        "✨ Découvrir les activités",
        "🛏️ Les chambres disponibles"
      ],
      en: [
        "🏛️ Tell me about the house",
        "🍽️ Tell me about meals",
        "✨ Discover activities",
        "🛏️ Available rooms"
      ],
      ar: [
        "🏛️ أخبريني عن المنزل",
        "🍽️ أخبريني عن الوجبات",
        "✨ اكتشف الأنشطة",
        "🛏️ الغرف المتاحة"
      ]
    };
    return suggestions[currentLang];
  };

  const getBotResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();

    // Booking questions
    if (lowerMessage.includes("réserver") || lowerMessage.includes("book") || lowerMessage.includes("حجز") || 
        lowerMessage.includes("réservation") || lowerMessage.includes("booking") || lowerMessage.includes("comment réserver") ||
        lowerMessage.includes("reserver") || lowerMessage.includes("comment reserver") || lowerMessage.includes("faire une réservation") ||
        lowerMessage.includes("faire une reservation") || lowerMessage.includes("comment faire") || lowerMessage.includes("procédure")) {
      const responses = {
        fr: `Oui, vous pouvez réserver directement sur notre site web. Une fois votre demande envoyée, vous recevrez une confirmation par message.

Si vous préférez, vous pouvez aussi nous écrire sur WhatsApp au +216 98306481 ou via Messenger : m.me/dardhiafapaulklee

Y a-t-il autre chose qui vous intéresse ?`,
        en: `Yes, you can book directly on our website. Once your request is sent, you will receive a confirmation message.

If you prefer, you can also write to us on WhatsApp at +216 98306481 or via Messenger: m.me/dardhiafapaulklee

Is there anything else that interests you?`,
        ar: `نعم، يمكنك الحجز مباشرة على موقعنا الإلكتروني. بمجرد إرسال طلبك، ستصلك رسالة تأكيد.

إذا كنت تفضلين، يمكنك أيضاً الكتابة إلينا على واتساب على +216 98306481 أو عبر Messenger: m.me/dardhiafapaulklee

هل هناك شيء آخر يهمك؟`
      };
      return { 
        text: responses[currentLang]
      };
    }

    // Rooms questions - redirect to booking or contact
    if (lowerMessage.includes("chambre") || lowerMessage.includes("room") || lowerMessage.includes("غرفة") ||
        lowerMessage.includes("suite") || lowerMessage.includes("lit") || lowerMessage.includes("logement") || 
        lowerMessage.includes("accommodation") || lowerMessage.includes("إقامة") ||
        lowerMessage.includes("chambres") || lowerMessage.includes("rooms") || lowerMessage.includes("disponible") ||
        lowerMessage.includes("available") || lowerMessage.includes("hébergement") || lowerMessage.includes("héberger") ||
        lowerMessage.includes("prix") || lowerMessage.includes("price") || lowerMessage.includes("سعر") ||
        lowerMessage.includes("tarif") || lowerMessage.includes("cost") || lowerMessage.includes("coût") ||
        lowerMessage.includes("cout") || lowerMessage.includes("combien") || lowerMessage.includes("how much") ||
        lowerMessage.includes("payer") || lowerMessage.includes("pay") || lowerMessage.includes("tnd") || lowerMessage.includes("dinars")) {
      const responses = {
        fr: `Pour connaître nos chambres et tarifs, je vous invite à consulter notre site web ou à nous contacter directement sur WhatsApp au +216 98306481 pour des informations détaillées.

Avez-vous d'autres questions sur les réservations ou les repas ?`,
        en: `To find out about our rooms and rates, I invite you to check our website or contact us directly on WhatsApp at +216 98306481 for detailed information.

Do you have any other questions about bookings or meals?`,
        ar: `لمعرفة غرفنا وأسعارنا، أدعوك لزيارة موقعنا الإلكتروني أو الاتصال بنا مباشرة على واتساب على +216 98306481 للحصول على معلومات مفصلة.

هل لديك أسئلة أخرى حول الحجوزات أو الوجبات؟`
      };
      return { 
        text: responses[currentLang]
      };
    }

    // Meals/Food questions
    if (lowerMessage.includes("repas") || lowerMessage.includes("meal") || lowerMessage.includes("وجبة") ||
        lowerMessage.includes("manger") || lowerMessage.includes("eat") || lowerMessage.includes("أكل") ||
        lowerMessage.includes("petit-déjeuner") || lowerMessage.includes("petit dejeuner") || lowerMessage.includes("breakfast") || lowerMessage.includes("إفطار") ||
        lowerMessage.includes("déjeuner") || lowerMessage.includes("dejeuner") || lowerMessage.includes("lunch") || lowerMessage.includes("غداء") ||
        lowerMessage.includes("dîner") || lowerMessage.includes("diner") || lowerMessage.includes("dinner") || lowerMessage.includes("عشاء") ||
        lowerMessage.includes("cuisine") || lowerMessage.includes("food") || lowerMessage.includes("طعام") ||
        lowerMessage.includes("restaurant") || lowerMessage.includes("مطعم") || lowerMessage.includes("plat") ||
        lowerMessage.includes("dish") || lowerMessage.includes("menu") || lowerMessage.includes("gastronomie")) {
      const responses = {
        fr: `Oui, nous servons des repas sur place pour nos hôtes. Nous proposons une cuisine tunisienne traditionnelle préparée sur demande. Il est préférable de prévenir à l'avance pour organiser le menu.

Avez-vous d'autres questions ?`,
        en: `Yes, we serve meals on site for our guests. We offer traditional Tunisian cuisine prepared on request. It's best to let us know in advance to organize the menu.

Do you have any other questions?`,
        ar: `نعم، نقدم وجبات في الموقع لضيوفنا. نقدم مطبخاً تونسياً تقليدياً محضراً عند الطلب. من الأفضل إخبارنا مسبقاً لتنظيم القائمة.

هل لديك أسئلة أخرى؟`
      };
      return { 
        text: responses[currentLang]
      };
    }

    // Activities/Experiences questions
    if (lowerMessage.includes("activité") || lowerMessage.includes("activite") || lowerMessage.includes("activity") || lowerMessage.includes("activités") || lowerMessage.includes("نشاط") ||
        lowerMessage.includes("expérience") || lowerMessage.includes("experience") || lowerMessage.includes("expériences") || lowerMessage.includes("تجربة") ||
        lowerMessage.includes("visite") || lowerMessage.includes("visit") || lowerMessage.includes("visites") || lowerMessage.includes("زيارة") ||
        lowerMessage.includes("découvrir") || lowerMessage.includes("decouvrir") || lowerMessage.includes("discover") || lowerMessage.includes("اكتشاف") ||
        lowerMessage.includes("excursion") || lowerMessage.includes("tour") || lowerMessage.includes("excursion") || lowerMessage.includes("artisanat") ||
        lowerMessage.includes("craft") || lowerMessage.includes("mosquée") || lowerMessage.includes("mosquee") || lowerMessage.includes("mosque")) {
      const responses = {
        fr: `Nous n'organisons pas directement de visites, mais nous pouvons vous aider à trouver un bon guide ou un organisateur local selon vos envies (médina, mosquées, musées, etc.).

Pour plus de détails, n'hésitez pas à nous contacter sur WhatsApp au +216 98306481 ou via Messenger : m.me/dardhiafapaulklee

Avez-vous d'autres questions ?`,
        en: `We don't organize visits directly, but we can help you find a good guide or local organizer according to your interests (medina, mosques, museums, etc.).

For more details, feel free to contact us on WhatsApp at +216 98306481 or via Messenger: m.me/dardhiafapaulklee

Do you have any other questions?`,
        ar: `لا ننظم الزيارات مباشرة، ولكن يمكننا مساعدتك في العثور على مرشد جيد أو منظم محلي حسب رغباتك (المدينة، المساجد، المتاحف، إلخ).

لمزيد من التفاصيل، لا تترددي في الاتصال بنا على واتساب على +216 98306481 أو عبر Messenger: m.me/dardhiafapaulklee

هل لديك أسئلة أخرى؟`
      };
      return { 
        text: responses[currentLang]
      };
    }



    // Contact questions
    if (lowerMessage.includes("contact") || lowerMessage.includes("téléphone") || lowerMessage.includes("telephone") ||
        lowerMessage.includes("phone") || lowerMessage.includes("email") || lowerMessage.includes("contacter") ||
        lowerMessage.includes("اتصل") || lowerMessage.includes("adresse") || lowerMessage.includes("address") ||
        lowerMessage.includes("joindre") || lowerMessage.includes("reach") || lowerMessage.includes("appeler") ||
        lowerMessage.includes("call") || lowerMessage.includes("whatsapp") || lowerMessage.includes("واتساب")) {
      const responses = {
        fr: `Vous pouvez nous contacter sur WhatsApp au +216 98306481 ou via Messenger : m.me/dardhiafapaulklee

Nous serons ravis de répondre à toutes vos questions !`,
        en: `You can contact us on WhatsApp at +216 98306481 or via Messenger: m.me/dardhiafapaulklee

We'll be happy to answer all your questions!`,
        ar: `يمكنك الاتصال بنا على واتساب على +216 98306481 أو عبر Messenger: m.me/dardhiafapaulklee

سنكون سعداء للإجابة على جميع أسئلتك!`
      };
      return { 
        text: responses[currentLang]
      };
    }

    // Default response - fallback for questions outside the 4 main themes
    const defaultResponses = {
      fr: `Je n'ai pas encore la réponse à cette question, mais vous pouvez nous contacter directement sur WhatsApp au +216 98306481 ou via Messenger : m.me/dardhiafapaulklee pour obtenir de l'aide immédiate.

N'hésitez pas si vous avez d'autres questions sur les réservations, les repas ou les visites !`,
      en: `I don't have the answer to this question yet, but you can contact us directly on WhatsApp at +216 98306481 or via Messenger: m.me/dardhiafapaulklee for immediate assistance.

Feel free to ask if you have other questions about bookings, meals or visits!`,
      ar: `ليس لدي إجابة على هذا السؤال بعد، ولكن يمكنك الاتصال بنا مباشرة على واتساب على +216 98306481 أو عبر Messenger: m.me/dardhiafapaulklee للحصول على مساعدة فورية.

لا تترددي إذا كان لديك أسئلة أخرى حول الحجوزات أو الوجبات أو الزيارات!`
    };
    return { 
      text: defaultResponses[currentLang]
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes("réserver") || suggestion.includes("book") || suggestion.includes("حجز")) {
      navigate('/booking');
      return;
    }
    if (suggestion.includes("chambres") || suggestion.includes("rooms") || suggestion.includes("غرف")) {
      navigate('/rooms');
      return;
    }
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    if (action === "book") {
      message = currentLang === 'fr' ? "Comment réserver ?" : currentLang === 'en' ? "How to book?" : "كيف أحجز؟";
      navigate('/booking');
    } else if (action === "rooms") {
      message = currentLang === 'fr' ? "Parler des chambres" : currentLang === 'en' ? "Tell me about rooms" : "أخبرني عن الغرف";
      navigate('/rooms');
    } else if (action === "experiences") {
      message = currentLang === 'fr' ? "Découvrir les activités" : currentLang === 'en' ? "Discover activities" : "اكتشف الأنشطة";
      navigate('/experiences');
    }
    if (message) {
      handleSuggestionClick(message);
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          y: [0, -8, 0]
        }}
        transition={{ 
          scale: { duration: 0.3 },
          y: { 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.15, y: -10 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Ouvrir Zahra"
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-medina/20 to-terre-cuite/20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg z-10">
          <motion.img 
            src="/zahra.jpg" 
            alt="Zahra" 
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 25%' }}
            animate={{ 
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-[#25D366] rounded-full border-2 border-white z-10"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50, rotateY: 15 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4
        }}
        className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-medina to-terre-cuite text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-white/30 flex-shrink-0"
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src="/zahra.jpg" 
                alt="Zahra" 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 25%' }}
              />
              <motion.div 
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#25D366] rounded-full border-2 border-white flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Circle className="w-2 h-2 fill-white text-white" />
              </motion.div>
            </motion.div>
            <div>
              <h3 className="font-bold font-semibold">Zahra</h3>
              <p className="text-xs text-white/80">Votre assistante virtuelle</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-sable/30 to-white">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, x: message.sender === "user" ? 20 : -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                {message.sender === "user" ? (
                  <div className="w-8 h-8 rounded-full bg-terre-cuite flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow-md ring-2 ring-white">
                    <img 
                      src="/zahra.jpg" 
                      alt="Zahra" 
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 25%' }}
                    />
                  </div>
                )}
                <motion.div 
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-terre-cuite text-white"
                      : "bg-white text-gray-800 shadow-md border border-gray-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-8 h-8 rounded-full overflow-hidden shadow-md ring-2 ring-white"
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img 
                    src="/zahra.jpg" 
                    alt="Zahra" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 25%' }}
                  />
                </motion.div>
                <motion.div 
                  className="bg-white rounded-2xl px-4 py-2 shadow-md"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-indigo-medina rounded-full"
                      animate={{ 
                        y: [0, -8, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0
                      }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-indigo-medina rounded-full"
                      animate={{ 
                        y: [0, -8, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                      }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-indigo-medina rounded-full"
                      animate={{ 
                        y: [0, -8, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuickAction("book")}
                className="text-xs h-8 w-full"
              >
                <Calendar className="w-3 h-3 mr-1" />
                {currentLang === 'fr' ? 'Réserver' : currentLang === 'en' ? 'Book' : 'احجز'}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuickAction("rooms")}
                className="text-xs h-8 w-full"
              >
                <Hotel className="w-3 h-3 mr-1" />
                {currentLang === 'fr' ? 'Chambres' : currentLang === 'en' ? 'Rooms' : 'الغرف'}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuickAction("experiences")}
                className="text-xs h-8 w-full"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {currentLang === 'fr' ? 'Activités' : currentLang === 'en' ? 'Activities' : 'الأنشطة'}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Input */}
        <motion.div 
          className="p-4 bg-white border-t border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex space-x-2">
            <motion.input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={currentLang === 'fr' ? "Tapez votre message..." : currentLang === 'en' ? "Type your message..." : "اكتب رسالتك..."}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-medina focus:border-transparent text-sm"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-indigo-medina hover:bg-indigo-medina/90 text-white px-4"
              >
                <motion.div
                  animate={inputValue.trim() ? { 
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ 
                    duration: 0.5,
                    repeat: inputValue.trim() ? Infinity : 0,
                    repeatDelay: 2
                  }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Chatbot;

