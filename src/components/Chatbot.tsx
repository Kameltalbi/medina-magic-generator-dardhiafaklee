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
      "Bonjour ! Je suis Zahra, votre assistante virtuelle. Permettez-moi de vous présenter Dar Dhiafa Paul Klee : une maison d'hôtes au cœur de la médina historique de Kairouan. Avez-vous déjà visité Kairouan, ou souhaitez-vous d'abord en savoir plus sur notre maison ?",
      "Bonjour ! Bienvenue ! Je suis Zahra et je serai votre guide. Dar Dhiafa Paul Klee est une maison d'hôtes unique inspirée par l'art de Paul Klee. Que souhaitez-vous découvrir en premier : la maison, les chambres, les repas ou les activités à Kairouan ?",
      "Salut ! Je suis Zahra. Dar Dhiafa Paul Klee vous accueille dans la médina de Kairouan avec chambres, repas authentiques et expériences culturelles. Quelle est la durée de séjour que vous envisagez ?"
    ],
    en: [
      "Hello! I'm Zahra, your virtual assistant. Let me introduce you to Dar Dhiafa Paul Klee: a guesthouse in the heart of Kairouan's historic medina. Have you visited Kairouan before, or would you like to learn more about our house first?",
      "Hello! Welcome! I'm Zahra and I'll be your guide. Dar Dhiafa Paul Klee is a unique guesthouse inspired by Paul Klee's art. What would you like to discover first: the house, rooms, meals, or activities in Kairouan?",
      "Hi! I'm Zahra. Dar Dhiafa Paul Klee welcomes you in Kairouan's medina with rooms, authentic meals and cultural experiences. What length of stay are you planning?"
    ],
    ar: [
      "مرحبا! أنا زهرة، مساعدتك الافتراضية. دعني أقدم لك دار ضيافة بول كلي: بيت ضيافة في قلب المدينة التاريخية بالقيروان. هل زرتي القيروان من قبل، أم تريدين أولاً معرفة المزيد عن بيتنا؟",
      "مرحبا! أهلا بك! أنا زهرة وسأكون مرشدتك. دار ضيافة بول كلي هو بيت ضيافة فريد مستوحى من فن بول كلي. ماذا تريدين اكتشافه أولاً: البيت، الغرف، الوجبات أو الأنشطة في القيروان؟",
      "أهلا! أنا زهرة. دار ضيافة بول كلي يرحب بك في مدينة القيروان مع غرف ووجبات أصيلة وتجارب ثقافية. ما هي مدة الإقامة التي تخططين لها؟"
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
        fr: `📋 **Comment réserver chez Dar Dhiafa Paul Klee**

Le processus est simple :

1️⃣ **Choisissez vos dates** : Sélectionnez votre date d'arrivée et de départ sur notre page de réservation
2️⃣ **Sélectionnez une chambre** : Découvrez nos 4 catégories (Suite Royale, Twin, Double, Triple/Familiale)
3️⃣ **Remplissez vos informations** : Nom, email, téléphone
4️⃣ **Envoi de la demande** : Soumettez votre demande de réservation

⚠️ **IMPORTANT** : Après votre demande, vous recevrez un message par email ou WhatsApp pour confirmer ou non la disponibilité. Dar Dhiafa est une maison très demandée, c'est pourquoi nous vérifions la disponibilité en temps réel avant de confirmer votre réservation.

Si la chambre choisie n'est pas disponible, nous vous proposerons des alternatives adaptées à vos dates.

Avez-vous déjà des dates en tête pour votre séjour ? Et combien de personnes serez-vous ?`,
        en: `📋 **How to book at Dar Dhiafa Paul Klee**

The process is simple:

1️⃣ **Choose your dates**: Select your check-in and check-out dates on our booking page
2️⃣ **Select a room**: Discover our 4 categories (Royal Suite, Twin, Double, Triple/Family)
3️⃣ **Fill in your information**: Name, email, phone
4️⃣ **Submit request**: Submit your booking request

⚠️ **IMPORTANT**: After your request, you'll receive a message by email or WhatsApp to confirm or not the availability. Dar Dhiafa is a highly sought-after house, which is why we check availability in real-time before confirming your booking.

If the chosen room is not available, we'll suggest alternatives that suit your dates.

Do you already have dates in mind for your stay? And how many people will you be?`,
        ar: `📋 **كيفية الحجز في دار ضيافة بول كلي**

العملية بسيطة:

1️⃣ **اختر تواريخك**: اختر تاريخ الوصول والمغادرة على صفحة الحجز لدينا
2️⃣ **اختر غرفة**: اكتشف فئاتنا الأربع (جناح ملكي، توأم، مزدوج، ثلاثي/عائلي)
3️⃣ **املأ معلوماتك**: الاسم، البريد الإلكتروني، الهاتف
4️⃣ **إرسال الطلب**: قدم طلب الحجز الخاص بك

⚠️ **مهم**: بعد طلبك، ستصلك رسالة عبر البريد الإلكتروني أو واتساب لتأكيد أو عدم تأكيد التوفر. دار ضيافة هو منزل مطلوب بشدة، ولهذا نتحقق من التوفر في الوقت الفعلي قبل تأكيد حجزك.

إذا لم تكن الغرفة المختارة متاحة، سنقترح عليك بدائل تناسب تواريخك.

هل لديكم تواريخ محددة لإقامتكم؟ وكم عدد الأشخاص؟`
      };
      return { 
        text: responses[currentLang]
      };
    }

    // Rooms questions
    if (lowerMessage.includes("chambre") || lowerMessage.includes("room") || lowerMessage.includes("غرفة") ||
        lowerMessage.includes("suite") || lowerMessage.includes("lit") || lowerMessage.includes("logement") || 
        lowerMessage.includes("accommodation") || lowerMessage.includes("إقامة") ||
        lowerMessage.includes("chambres") || lowerMessage.includes("rooms") || lowerMessage.includes("disponible") ||
        lowerMessage.includes("available") || lowerMessage.includes("hébergement") || lowerMessage.includes("héberger")) {
      const responses = {
        fr: `🛏️ **Nos Chambres et Suites**

Dar Dhiafa Paul Klee dispose de 13 chambres réparties en 4 catégories :

🏰 **Suite Royale** : Notre suite la plus luxueuse avec salon privé, décoration raffinée et espace généreux
🛏️ **Chambres Twin** : Parfaites pour les voyages d'affaires ou entre amis, avec 2 lits simples séparés
👫 **Chambres Double** : Idéales pour les couples, avec lit double et vue sur la médina
👨‍👩‍👧 **Triple/Familiale** : Spacieuses pour les familles, pouvant accueillir jusqu'à 4 personnes

**Caractéristiques communes** :
✅ Wi-Fi gratuit
✅ Climatisation
✅ Salle de bain privée
✅ Décoration inspirée de l'art de Paul Klee
✅ Vue sur la médina historique de Kairouan
✅ Confort moderne allié au charme traditionnel tunisien

Chaque chambre est unique et raconte une histoire à travers sa décoration inspirée des aquarelles de Paul Klee réalisées à Kairouan.

Quelle catégorie de chambre vous intéresse le plus ? Et pour combien de personnes ?`,
        en: `🛏️ **Our Rooms and Suites**

Dar Dhiafa Paul Klee has 13 rooms divided into 4 categories:

🏰 **Royal Suite**: Our most luxurious suite with private lounge, refined decoration and generous space
🛏️ **Twin Rooms**: Perfect for business trips or friends, with 2 separate single beds
👫 **Double Rooms**: Ideal for couples, with double bed and medina view
👨‍👩‍👧 **Triple/Family**: Spacious for families, can accommodate up to 4 people

**Common features**:
✅ Free Wi-Fi
✅ Air conditioning
✅ Private bathroom
✅ Decoration inspired by Paul Klee's art
✅ View of Kairouan's historic medina
✅ Modern comfort combined with traditional Tunisian charm

Each room is unique and tells a story through its decoration inspired by Paul Klee's watercolors made in Kairouan.

Which room category interests you most? And for how many people?`,
        ar: `🛏️ **غرفنا وأجنحتنا**

دار ضيافة بول كلي لديه 13 غرفة موزعة على 4 فئات:

🏰 **جناح ملكي**: جناحنا الأكثر فخامة مع صالة خاصة وديكور راقي ومساحة واسعة
🛏️ **غرف توأم**: مثالية للرحلات التجارية أو بين الأصدقاء، مع سريرين منفصلين
👫 **غرف مزدوجة**: مثالية للأزواج، مع سرير مزدوج وإطلالة على المدينة
👨‍👩‍👧 **ثلاثي/عائلي**: واسعة للعائلات، يمكن أن تستوعب حتى 4 أشخاص

**الميزات المشتركة**:
✅ واي فاي مجاني
✅ تكييف هواء
✅ حمام خاص
✅ ديكور مستوحى من فن بول كلي
✅ إطلالة على المدينة التاريخية بالقيروان
✅ راحة عصرية مع السحر التقليدي التونسي

كل غرفة فريدة وتحكي قصة من خلال ديكورها المستوحى من ألوان بول كلي المائية المصنوعة في القيروان.

أي فئة غرفة تهمك أكثر؟ وكم عدد الأشخاص؟`
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
        fr: `🍽️ **Nos Repas et Services Culinaires**

Dar Dhiafa Paul Klee propose une expérience culinaire authentique servie sur demande :

☕ **Petit-déjeuner** : Servi sur demande avec produits locaux, pain traditionnel, confitures artisanales, œufs, fromages, fruits frais et café/thé à la menthe

🍽️ **Déjeuner** : Repas du midi servi sur demande avec spécialités tunisiennes authentiques, salades fraîches, plats traditionnels et fruits de saison

🌙 **Dîner** : Soirées gastronomiques servies sur demande avec menu varié, cuisine tunisienne traditionnelle revisitée, et ambiance chaleureuse

**Caractéristiques** :
✅ Tous les repas sont servis sur demande (petit-déjeuner, déjeuner, dîner)
✅ Cuisine maison préparée avec des produits frais et locaux
✅ Spécialités tunisiennes authentiques
✅ Adaptations possibles selon vos préférences alimentaires
✅ Ambiance conviviale autour de repas partagés

Nos repas sont un véritable voyage culinaire qui complète votre expérience à Dar Dhiafa ! N'hésitez pas à nous demander lors de votre réservation ou pendant votre séjour.

Quels types de plats vous intéressent le plus ? Avez-vous des allergies ou préférences particulières ?`,
        en: `🍽️ **Our Meals and Culinary Services**

Dar Dhiafa Paul Klee offers an authentic culinary experience served on request:

☕ **Breakfast**: Served on request with local products, traditional bread, artisanal jams, eggs, cheeses, fresh fruits and coffee/mint tea

🍽️ **Lunch**: Midday meal served on request with authentic Tunisian specialties, fresh salads, traditional dishes and seasonal fruits

🌙 **Dinner**: Gastronomic evenings served on request with varied menu, traditional Tunisian cuisine revisited, and warm atmosphere

**Features**:
✅ All meals are served on request (breakfast, lunch, dinner)
✅ Homemade cuisine prepared with fresh local products
✅ Authentic Tunisian specialties
✅ Possible adaptations according to your dietary preferences
✅ Friendly atmosphere around shared meals

Our meals are a true culinary journey that completes your experience at Dar Dhiafa! Feel free to request them when booking or during your stay.

What types of dishes interest you most? Do you have any allergies or particular preferences?`,
        ar: `🍽️ **وجباتنا وخدماتنا الغذائية**

دار ضيافة بول كلي يقدم تجربة غذائية أصيلة تقدم عند الطلب:

☕ **الإفطار**: يقدم عند الطلب مع منتجات محلية وخبز تقليدي ومربى حرفي وبيض وجبن وفواكه طازجة وقهوة/شاي بالنعناع

🍽️ **الغداء**: وجبة منتصف النهار تقدم عند الطلب مع أطباق تونسية أصيلة وسلطات طازجة وأطباق تقليدية وفواكه موسمية

🌙 **العشاء**: أمسيات فاخرة تقدم عند الطلب مع قائمة متنوعة ومطبخ تونسي تقليدي معاد صياغته وجو دافئ

**الميزات**:
✅ جميع الوجبات تقدم عند الطلب (الإفطار والغداء والعشاء)
✅ مطبخ منزلي محضر بمنتجات محلية طازجة
✅ أطباق تونسية أصيلة
✅ إمكانية التكيف حسب تفضيلاتك الغذائية
✅ أجواء ودية حول وجبات مشتركة

وجباتنا هي رحلة غذائية حقيقية تكمل تجربتك في دار ضيافة! لا تترددي في طلبها عند الحجز أو أثناء إقامتك.

هل لديك حساسيات أو تفضيلات خاصة؟`
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
        fr: `✨ **Expériences Authentiques à Kairouan**

Dar Dhiafa vous propose de découvrir les meilleures expériences culturelles et authentiques de Kairouan :

🏛️ **Visites culturelles et historiques** :
• Grande Mosquée de Kairouan (Okba Ibn Nafi) - Une des plus anciennes mosquées du monde musulman
• Mausolée Sidi Sahab - Le "Barber's Mosque" avec architecture andalouse
• Médina historique - Classée UNESCO, labyrinthe de ruelles et souks traditionnels
• Bassins des Aghlabides - Monuments historiques uniques

🎨 **Découvertes artisanales** :
• Visite d'ateliers d'artisans locaux (tapis, poterie, cuir)
• Rencontre avec les maîtres artisans de Kairouan
• Découverte des techniques traditionnelles

🍽️ **Gastronomie locale** :
• Découverte des saveurs authentiques tunisiennes
• Spécialités régionales de Kairouan
• Expériences culinaires avec les locaux

🏛️ **Excursions à proximité** :
• El Jem - L'un des plus grands amphithéâtres romains (UNESCO)
• Sbeitla - Cité antique avec temples romains et byzantins
• Visites guidées avec guides historiens certifiés

🛁 **Bien-être traditionnel** :
• Hammam traditionnel à Kairouan
• Rituels de purification ancestraux

💡 Nous pouvons vous fournir toutes les informations et vous aider à trouver des guides locaux expérimentés pour organiser ces expériences selon vos intérêts et la durée de votre séjour.

Quelle expérience vous intéresse le plus ? Et préférez-vous des visites culturelles, de l'artisanat ou de la gastronomie ?`,
        en: `✨ **Authentic Experiences in Kairouan**

Dar Dhiafa offers you the best cultural and authentic experiences in Kairouan:

🏛️ **Cultural and historical visits**:
• Great Mosque of Kairouan (Okba Ibn Nafi) - One of the oldest mosques in the Muslim world
• Sidi Sahab Mausoleum - The "Barber's Mosque" with Andalusian architecture
• Historic Medina - UNESCO listed, maze of alleys and traditional souks
• Aghlabid Basins - Unique historical monuments

🎨 **Artisan discoveries**:
• Visit to local artisan workshops (carpets, pottery, leather)
• Meeting with Kairouan master craftsmen
• Discovery of traditional techniques

🍽️ **Local gastronomy**:
• Discovery of authentic Tunisian flavors
• Regional specialties of Kairouan
• Culinary experiences with locals

🏛️ **Nearby excursions**:
• El Jem - One of the largest Roman amphitheaters (UNESCO)
• Sbeitla - Ancient city with Roman and Byzantine temples
• Guided tours with certified historian guides

🛁 **Traditional wellness**:
• Traditional hammam in Kairouan
• Ancestral purification rituals

💡 We can provide you with all the information and help you find experienced local guides to organize these experiences according to your interests and the duration of your stay.

Which experience interests you most? And do you prefer cultural visits, crafts, or gastronomy?`,
        ar: `✨ **تجارب أصيلة في القيروان**

دار ضيافة يقدم لك أفضل التجارب الثقافية والأصيلة في القيروان:

🏛️ **زيارات ثقافية وتاريخية**:
• الجامع الكبير بالقيروان (عقبة بن نافع) - أحد أقدم المساجد في العالم الإسلامي
• ضريح سيدي الصحاب - "مسجد الحلاق" مع عمارة أندلسية
• المدينة التاريخية - مصنفة اليونسكو، متاهة من الأزقة والأسواق التقليدية
• أحواض الأغالبة - نصب تاريخية فريدة

🎨 **اكتشافات حرفية**:
• زيارة ورشات الحرفيين المحليين (سجاد، فخار، جلد)
• لقاء مع حرفيي القيروان
• اكتشاف التقنيات التقليدية

🍽️ **المأكولات المحلية**:
• اكتشاف النكهات التونسية الأصيلة
• أطباق إقليمية من القيروان
• تجارب غذائية مع السكان المحليين

🏛️ **رحلات قريبة**:
• الجم - أحد أكبر المدرجات الرومانية (اليونسكو)
• سبيطلة - مدينة قديمة مع معابد رومانية وبيزنطية
• جولات إرشادية مع مرشدين مؤرخين معتمدين

🛁 **العافية التقليدية**:
• حمام تقليدي في القيروان
• طقوس التطهير القديمة

💡 يمكننا تزويدك بجميع المعلومات ومساعدتك في العثور على مرشدين محليين ذوي خبرة لتنظيم هذه التجارب حسب اهتماماتك ومدة إقامتك.

أي تجربة تهمك أكثر؟ وهل تفضلين الزيارات الثقافية أم الحرف أم المأكولات؟`
      };
      return { 
        text: responses[currentLang]
      };
    }

    // About the house
    if (lowerMessage.includes("maison") || lowerMessage.includes("house") || lowerMessage.includes("منزل") ||
        lowerMessage.includes("hôtel") || lowerMessage.includes("hotel") || lowerMessage.includes("فندق") ||
        lowerMessage.includes("dar dhiafa") || lowerMessage.includes("dar") || lowerMessage.includes("dhiafa") ||
        lowerMessage.includes("présente") || lowerMessage.includes("presente") || lowerMessage.includes("present") ||
        lowerMessage.includes("pré") || lowerMessage.includes("pre") || lowerMessage.includes("introduce") || lowerMessage.includes("عرض") ||
        lowerMessage.includes("paul klee") || lowerMessage.includes("kairouan") || lowerMessage.includes("القيروان") ||
        lowerMessage.includes("c'est quoi") || lowerMessage.includes("qu'est ce") || lowerMessage.includes("qu'est-ce") ||
        lowerMessage.includes("parle moi") || lowerMessage.includes("parle-moi") || lowerMessage.includes("parle moi de") ||
        lowerMessage.includes("raconte") || lowerMessage.includes("explique") || lowerMessage.includes("explain")) {
      const responses = {
        fr: `🏛️ **Dar Dhiafa Paul Klee - Votre Maison d'Hôtes**

Bienvenue dans notre maison d'hôtes exceptionnelle au cœur de la médina historique de Kairouan, classée au patrimoine mondial de l'UNESCO !

**📍 Situation** : 
Située dans le cœur historique de Kairouan, Dar Dhiafa vous plonge dans l'authenticité tunisienne, à quelques pas de la Grande Mosquée et des souks traditionnels.

**🎨 Inspiration Artistique** : 
Notre maison est inspirée par l'artiste Paul Klee qui a créé ses plus belles aquarelles à Kairouan en 1914. Chaque espace est décoré dans cet esprit, créant une atmosphère unique où l'art rencontre l'hospitalité tunisienne.

**🏺 Architecture** : 
Maison traditionnelle tunisienne restaurée avec élégance, alliant architecture ancestrale et confort moderne. Patios intérieurs, voûtes en pierre, et détails artisanaux authentiques.

**🛏️ Capacité** : 
13 chambres réparties en 4 catégories (Suite Royale, Twin, Double, Triple/Familiale), toutes uniques et décorées avec soin.

**🍽️ Restauration** : 
Tous les repas sont servis sur demande : petit-déjeuner, déjeuner et dîner avec cuisine tunisienne authentique préparée maison.

**✨ Expériences** : 
Nous vous guidons vers les meilleures expériences authentiques de Kairouan : visites culturelles, artisanat, gastronomie, et excursions.

Notre maison est une véritable immersion dans la culture tunisienne, où chaque moment est une découverte.

Que souhaitez-vous savoir ensuite ?`,
        en: `🏛️ **Dar Dhiafa Paul Klee - Your Guesthouse**

Welcome to our exceptional guesthouse in the heart of Kairouan's historic medina, listed as a UNESCO World Heritage Site!

**📍 Location**: 
Located in the historic heart of Kairouan, Dar Dhiafa immerses you in Tunisian authenticity, just steps from the Great Mosque and traditional souks.

**🎨 Artistic Inspiration**: 
Our house is inspired by artist Paul Klee who created his most beautiful watercolors in Kairouan in 1914. Each space is decorated in this spirit, creating a unique atmosphere where art meets Tunisian hospitality.

**🏺 Architecture**: 
Traditional Tunisian house restored with elegance, combining ancestral architecture and modern comfort. Interior patios, stone vaults, and authentic artisan details.

**🛏️ Capacity**: 
13 rooms divided into 4 categories (Royal Suite, Twin, Double, Triple/Family), all unique and carefully decorated.

**🍽️ Dining**: 
All meals are served on request: breakfast, lunch and dinner with authentic Tunisian cuisine prepared at home.

**✨ Experiences**: 
We guide you to the best authentic experiences in Kairouan: cultural visits, crafts, gastronomy, and excursions.

Our house is a true immersion in Tunisian culture, where every moment is a discovery.

What would you like to know next?`,
        ar: `🏛️ **دار ضيافة بول كلي - بيت ضيافتك**

مرحباً بكم في بيت ضيافتنا الاستثنائي في قلب المدينة التاريخية بالقيروان، المصنفة كموقع تراث عالمي لليونسكو!

**📍 الموقع**: 
تقع في القلب التاريخي للقيروان، دار ضيافة ينغمسك في الأصالة التونسية، على بعد خطوات من الجامع الكبير والأسواق التقليدية.

**🎨 الإلهام الفني**: 
بيتنا مستوحى من الفنان بول كلي الذي أنشأ أجمل ألوانه المائية في القيروان عام 1914. كل مساحة مزينة بهذه الروح، مما يخلق أجواء فريدة حيث يلتقي الفن بالضيافة التونسية.

**🏺 العمارة**: 
منزل تونسي تقليدي تم ترميمه بأناقة، يجمع بين العمارة القديمة والراحة العصرية. باحات داخلية وأقبية حجرية وتفاصيل حرفية أصيلة.

**🛏️ السعة**: 
13 غرفة موزعة على 4 فئات (جناح ملكي، توأم، مزدوج، ثلاثي/عائلي)، كلها فريدة ومزينة بعناية.

**🍽️ المطعم**: 
جميع الوجبات تقدم عند الطلب: الإفطار والغداء والعشاء مع مطبخ تونسي أصيل محضر في المنزل.

**✨ التجارب**: 
نرشدك إلى أفضل التجارب الأصيلة في القيروان: زيارات ثقافية وحرف ومأكولات ورحلات.

بيتنا هو غمر حقيقي في الثقافة التونسية، حيث كل لحظة هي اكتشاف.

ماذا يهمك أكثر: الوجبات، الأنشطة أو الغرف؟`
      };
      return { 
        text: responses[currentLang]
      };
    }

    // Price questions
    if (lowerMessage.includes("prix") || lowerMessage.includes("price") || lowerMessage.includes("سعر") ||
        lowerMessage.includes("tarif") || lowerMessage.includes("cost") || lowerMessage.includes("coût") ||
        lowerMessage.includes("cout") || lowerMessage.includes("combien") || lowerMessage.includes("how much") ||
        lowerMessage.includes("payer") || lowerMessage.includes("pay") || lowerMessage.includes("tnd") || lowerMessage.includes("dinars")) {
      const responses = {
        fr: `💰 **Tarifs**

Nos tarifs varient selon la catégorie de chambre et la saison :

• Suite Royale : Tarifs sur demande
• Chambres Twin/Double : À partir de 200 TND/nuit
• Triple/Familiale : À partir de 300 TND/nuit

💡 Pour connaître les tarifs exacts et disponibilités, je vous invite à :
1. Visiter notre page de réservation
2. Sélectionner vos dates
3. Voir les chambres disponibles avec leurs tarifs

Avez-vous des dates spécifiques en tête ? Je peux vous guider vers la page de réservation pour voir les tarifs exacts.`,
        en: `💰 **Rates**

Our rates vary according to room category and season:

• Royal Suite: Rates on request
• Twin/Double Rooms: From 200 TND/night
• Triple/Family: From 300 TND/night

💡 To find out exact rates and availability, I invite you to:
1. Visit our booking page
2. Select your dates
3. See available rooms with their rates

Do you have specific dates in mind? I can guide you to the booking page to see exact rates.`,
        ar: `💰 **الأسعار**

تختلف أسعارنا حسب فئة الغرفة والموسم:

• جناح ملكي: أسعار عند الطلب
• غرف توأم/مزدوجة: من 200 د.ت/ليلة
• ثلاثي/عائلي: من 300 د.ت/ليلة

💡 لمعرفة الأسعار والتوفر الدقيق، أدعوك إلى:
1. زيارة صفحة الحجز لدينا
2. اختيار تواريخك
3. رؤية الغرف المتاحة مع أسعارها

هل لديكم تواريخ محددة؟ يمكنني توجيهك إلى صفحة الحجز لرؤية الأسعار الدقيقة.`
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
        fr: `📞 **Nous Contacter**

Vous pouvez nous joindre de plusieurs façons :

📱 **WhatsApp** : Cliquez sur le bouton vert en bas à droite
📧 **Email** : info@dardhiafaklee.tn
📞 **Téléphone** : +216 77 123 456
📍 **Adresse** : Médina de Kairouan, Tunisie

Quelle est votre question ? Je peux vous aider ou vous guider vers notre page contact.`,
        en: `📞 **Contact Us**

You can reach us in several ways:

📱 **WhatsApp**: Click the green button at the bottom right
📧 **Email**: info@dardhiafaklee.tn
📞 **Phone**: +216 77 123 456
📍 **Address**: Medina of Kairouan, Tunisia

What's your question? I can help or guide you to our contact page.`,
        ar: `📞 **اتصل بنا**

يمكنك التواصل معنا بعدة طرق:

📱 **واتساب**: انقر على الزر الأخضر في الأسفل يمين
📧 **البريد الإلكتروني**: info@dardhiafaklee.tn
📞 **الهاتف**: +216 77 123 456
📍 **العنوان**: مدينة القيروان، تونس

ما هو سؤالك؟ يمكنني المساعدة أو توجيهك إلى صفحة الاتصال.`
      };
      return { 
        text: responses[currentLang]
      };
    }

    // Default response - try to give helpful context
    const defaultResponses = {
      fr: `Je vous comprends ! Je peux vous aider avec de nombreuses questions sur Dar Dhiafa Paul Klee.

Voici ce que je peux vous expliquer :
📋 **Comment réserver** - Le processus de réservation étape par étape
🛏️ **Nos chambres** - Les 4 catégories de chambres disponibles
🍽️ **Les repas** - Petit-déjeuner, déjeuner, dîner servis sur demande
✨ **Les activités** - Visites culturelles, artisanat, gastronomie à Kairouan
📍 **La maison** - Présentation complète de Dar Dhiafa
💰 **Les tarifs** - Prix selon les catégories et saisons
📞 **Nous contacter** - Email, téléphone, WhatsApp

Parlez-moi plus spécifiquement de ce qui vous intéresse. Par exemple, vous pouvez me demander "Comment réserver ?", "Parle-moi des chambres", "Quels sont les repas ?", ou "Quelles activités sont disponibles ?"`,
      en: `I understand you! I can help you with many questions about Dar Dhiafa Paul Klee.

Here's what I can explain:
📋 **How to book** - Step by step booking process
🛏️ **Our rooms** - The 4 room categories available
🍽️ **Meals** - Breakfast, lunch, dinner served on request
✨ **Activities** - Cultural visits, crafts, gastronomy in Kairouan
📍 **The house** - Complete presentation of Dar Dhiafa
💰 **Rates** - Prices by category and season
📞 **Contact us** - Email, phone, WhatsApp

Tell me more specifically what interests you. For example, you can ask me "How to book?", "Tell me about rooms", "What meals are available?", or "What activities are available?"`,
      ar: `أفهمك! يمكنني مساعدتك في العديد من الأسئلة حول دار ضيافة بول كلي.

إليك ما يمكنني شرحه:
📋 **كيفية الحجز** - عملية الحجز خطوة بخطوة
🛏️ **غرفنا** - الفئات الأربع للغرف المتاحة
🍽️ **الوجبات** - الإفطار والغداء والعشاء تقدم عند الطلب
✨ **الأنشطة** - زيارات ثقافية وحرف ومأكولات في القيروان
📍 **المنزل** - عرض كامل لدار ضيافة
💰 **الأسعار** - الأسعار حسب الفئات والمواسم
📞 **الاتصال بنا** - البريد الإلكتروني والهاتف وواتساب

أخبريني بشكل أكثر تحديداً بما يهمك. على سبيل المثال، يمكنك أن تسأليني "كيف أحجز؟"، "أخبريني عن الغرف"، "ما هي الوجبات المتاحة؟" أو "ما هي الأنشطة المتاحة؟"`
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

