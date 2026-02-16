import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  ChevronLeft, 
  RefreshCw, 
  Check, 
  X, 
  Star, 
  ImageIcon, 
  ArrowRight,
  Flame,
  Layout,
  Target
} from 'lucide-react';

// --- ROBUST DATA SET ---
const TOPICS = [
  {
    id: 'planets',
    title: 'Solar System',
    description: 'Explore the reaches of our galaxy.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop',
    color: 'indigo',
    content: [
      { id: 1, q: "Which planet is shown here?", img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bc46?w=600&h=400&fit=crop", a: "Earth", options: ["Mars", "Earth", "Venus", "Neptune"] },
      { id: 2, q: "This 'Red Planet' is named...?", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&h=400&fit=crop", a: "Mars", options: ["Jupiter", "Mars", "Saturn", "Mercury"] },
      { id: 3, q: "Identify the planet with famous rings.", img: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=600&h=400&fit=crop", a: "Saturn", options: ["Uranus", "Neptune", "Saturn", "Jupiter"] },
      { id: 4, q: "What is this giant gas planet?", img: "https://images.unsplash.com/photo-1630839437035-dac17da580d0?w=600&h=400&fit=crop", a: "Jupiter", options: ["Jupiter", "Saturn", "Pluto", "Sun"] }
    ]
  },
  {
    id: 'nature',
    title: 'Wildlife',
    description: 'Animals and their habitats.',
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=400&fit=crop',
    color: 'emerald',
    content: [
      { id: 1, q: "What animal is this?", img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop", a: "Lion", options: ["Tiger", "Lion", "Leopard", "Lynx"] },
      { id: 2, q: "Identify this arctic dweller.", img: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&h=400&fit=crop", a: "Polar Bear", options: ["Grizzly Bear", "Polar Bear", "Panda", "Arctic Fox"] },
      { id: 3, q: "What is the fastest land animal?", img: "https://images.unsplash.com/photo-1534177714502-0ca7a1c43209?w=600&h=400&fit=crop", a: "Cheetah", options: ["Lion", "Ostrich", "Cheetah", "Horse"] },
      { id: 4, q: "Which bird is this?", img: "https://images.unsplash.com/photo-1522926127622-51eda4f1db3f?w=600&h=400&fit=crop", a: "Toucan", options: ["Parrot", "Toucan", "Eagle", "Hummingbird"] }
    ]
  },
  {
    id: 'coding',
    title: 'Code Icons',
    description: 'Tech logos and code concepts.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=400&fit=crop',
    color: 'orange',
    content: [
      { id: 1, q: "Which library uses this logo?", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop", a: "React", options: ["Vue", "Angular", "React", "Svelte"] },
      { id: 2, q: "What language is this?", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop", a: "Python", options: ["Java", "C++", "Python", "Ruby"] },
      { id: 3, q: "Which tool uses this icon?", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop", a: "GitHub", options: ["GitLab", "GitHub", "BitBucket", "Docker"] },
      { id: 4, q: "This styling tool is...", img: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop", a: "CSS", options: ["HTML", "JSON", "CSS", "PHP"] }
    ]
  }
];

// --- APP COMPONENT ---
export default function App() {
  const [screen, setScreen] = useState('home'); // home, mode-select, flashcards, quiz
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [score, setScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null); // null, correct, wrong
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // --- ACTIONS ---
  const startLearning = (topic) => {
    setSelectedTopic(topic);
    setScreen('mode-select');
  };

  const startMode = (mode) => {
    setScreen(mode);
    setCurrentIdx(0);
    setScore(0);
    setAnswerStatus(null);
    setSelectedAnswer(null);
    setIsFlipped(false);
  };

  const handleQuizAnswer = (option) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(option);
    const isCorrect = option === selectedTopic.content[currentIdx].a;
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIdx < selectedTopic.content.length - 1) {
        setCurrentIdx(c => c + 1);
        setSelectedAnswer(null);
        setAnswerStatus(null);
      } else {
        setScreen('result');
      }
    }, 1500);
  };

  const nextFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((currentIdx + 1) % selectedTopic.content.length);
    }, 150);
  };

  // --- RENDER HELPERS ---
  const Home = () => (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-12 text-center">
        <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-2xl mb-4">
          <Target className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Mastery Lab</h1>
        <p className="text-slate-500">Choose a topic to begin your training session.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TOPICS.map(topic => (
          <button 
            key={topic.id}
            onClick={() => startLearning(topic)}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left"
          >
            <div className="h-40 overflow-hidden">
              <img src={topic.image} alt={topic.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-800 mb-1">{topic.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{topic.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topic.content.length} Lessons</span>
                <ChevronLeft className="w-5 h-5 text-slate-300 rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const ModeSelect = () => (
    <div className="max-w-4xl mx-auto p-6 animate-in zoom-in-95 duration-300">
      <button onClick={() => setScreen('home')} className="flex items-center text-slate-400 hover:text-slate-800 mb-8 font-bold transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" /> BACK TO TOPICS
      </button>
      
      <div className="text-center mb-10">
         <h2 className="text-3xl font-black text-slate-900 mb-2">Training Mode</h2>
         <p className="text-slate-500 italic">Topic: {selectedTopic.title}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => startMode('flashcards')}
          className="bg-white p-8 rounded-3xl shadow-sm border-2 border-slate-50 hover:border-indigo-500 hover:shadow-lg transition-all text-center group"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Flashcards</h3>
          <p className="text-slate-500">A relaxed way to study images and answers at your own pace.</p>
        </button>

        <button 
          onClick={() => startMode('quiz')}
          className="bg-white p-8 rounded-3xl shadow-sm border-2 border-slate-50 hover:border-emerald-500 hover:shadow-lg transition-all text-center group"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Picture Quiz</h3>
          <h3 className="text-sm font-bold text-emerald-600 mb-2 uppercase">Challenge</h3>
          <p className="text-slate-500">Test your memory by identifying the correct subject from 4 options.</p>
        </button>
      </div>
    </div>
  );

  const Flashcards = () => {
    const current = selectedTopic.content[currentIdx];
    return (
      <div className="max-w-2xl mx-auto p-6 flex flex-col items-center">
        <div className="w-full flex justify-between mb-8">
          <button onClick={() => setScreen('mode-select')} className="text-slate-400 hover:text-slate-800 font-bold">QUIT</button>
          <div className="text-slate-400 font-mono text-sm">{currentIdx + 1} / {selectedTopic.content.length}</div>
        </div>

        <div 
          className="relative w-full aspect-[4/5] md:aspect-square cursor-pointer transition-transform duration-500 transform-style-3d"
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* FRONT */}
          <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col p-4 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
             <img src={current.img} className="w-full h-3/4 object-cover rounded-[2rem] mb-6 shadow-inner" alt="Front" />
             <div className="flex-grow flex items-center justify-center text-center px-4">
                <h3 className="text-2xl font-bold text-slate-800 italic">Click to reveal identity</h3>
             </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-8 text-center rotate-y-180" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
             <div className="bg-white/10 p-4 rounded-full mb-6">
                <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
             </div>
             <h3 className="text-5xl font-black text-white mb-2 tracking-tighter">{current.a}</h3>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Correct Answer</p>
          </div>
        </div>

        <button 
          onClick={nextFlashcard}
          className="mt-12 bg-indigo-600 text-white px-10 py-4 rounded-full font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-3"
        >
          NEXT CARD <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const Quiz = () => {
    const current = selectedTopic.content[currentIdx];
    return (
      <div className="max-w-3xl mx-auto p-6 flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
        <div className="flex justify-between items-center mb-8">
           <button onClick={() => setScreen('mode-select')} className="text-slate-400 font-bold">QUIT</button>
           <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-white rounded-full border border-slate-100 text-sm font-bold flex items-center gap-1">
               <Trophy className="w-4 h-4 text-yellow-500" /> {score}
             </div>
             <div className="text-slate-400 font-mono text-sm">{currentIdx + 1}/{selectedTopic.content.length}</div>
           </div>
        </div>

        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-8 overflow-hidden">
          <img src={current.img} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-6 shadow-inner" alt="Quiz Visual" />
          <h2 className="text-2xl font-black text-slate-900 text-center mb-4">{current.q}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {current.options.map((opt, i) => {
            let colorClass = "bg-white border-slate-200 text-slate-700 hover:border-indigo-500";
            if (selectedAnswer === opt) {
              colorClass = opt === current.a ? "bg-emerald-500 border-emerald-500 text-white" : "bg-rose-500 border-rose-500 text-white";
            } else if (selectedAnswer && opt === current.a) {
              colorClass = "bg-emerald-500 border-emerald-500 text-white opacity-70";
            }

            return (
              <button
                key={i}
                disabled={!!selectedAnswer}
                onClick={() => handleQuizAnswer(opt)}
                className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all duration-200 flex justify-between items-center shadow-sm ${colorClass}`}
              >
                {opt}
                {selectedAnswer === opt && (opt === current.a ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />)}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const Result = () => (
    <div className="max-w-xl mx-auto p-8 text-center animate-in zoom-in-95 duration-500 pt-20">
      <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <Trophy className="w-16 h-16 text-yellow-500" />
      </div>
      <h2 className="text-5xl font-black text-slate-900 mb-2">Training Complete!</h2>
      <p className="text-slate-500 text-xl mb-10">You identified {score} out of {selectedTopic.content.length} correctly.</p>
      
      <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
        <div className="text-7xl font-black mb-2">{Math.round((score/selectedTopic.content.length)*100)}%</div>
        <p className="text-indigo-300 font-bold tracking-widest uppercase">Mastery Level</p>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={() => startMode(screen === 'quiz' ? 'quiz' : 'flashcards')}
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 flex items-center justify-center gap-3"
        >
          <RefreshCw className="w-6 h-6" /> TRY AGAIN
        </button>
        <button 
          onClick={() => setScreen('home')}
          className="w-full py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xl hover:bg-slate-50"
        >
          ANOTHER TOPIC
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Dynamic Navbar */}
      <nav className="h-20 bg-white border-b border-slate-100 sticky top-0 z-50 px-6 flex items-center justify-between">
         <div className="flex items-center gap-2" onClick={() => setScreen('home')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl cursor-pointer">M</div>
            <span className="font-black text-xl tracking-tight text-slate-800 hidden sm:block">MasteryHub</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-slate-400 font-bold bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
               <Flame className="w-4 h-4 text-orange-500" /> 4 Day Streak
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-indigo-100 p-0.5">
               <img src="https://api.dicebear.com/7.x/big-smile/svg?seed=Lucky" className="w-full h-full rounded-full" alt="avatar" />
            </div>
         </div>
      </nav>

      <main className="py-10 h-[calc(100vh-80px)] overflow-y-auto">
        {screen === 'home' && <Home />}
        {screen === 'mode-select' && <ModeSelect />}
        {screen === 'flashcards' && <Flashcards />}
        {screen === 'quiz' && <Quiz />}
        {screen === 'result' && <Result />}
      </main>
    </div>
  );
}

