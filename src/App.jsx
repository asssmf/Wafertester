import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Beaker, 
  Wind, 
  Droplets, 
  TestTube, 
  Filter, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Shuffle, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb 
} from 'lucide-react';

const UltimateFlashcards = () => {
  // --- MASTER DATA SET ---
  const initialCards = [
    // --- FLAME TESTS ---
    {
      id: 1,
      category: 'Flame Test',
      question: 'Flame color for Lithium (Li⁺)',
      answer: 'Red',
      hint: 'Think "Lithium Batteries get hot (Red)"',
      icon: <Flame className="w-8 h-8 text-red-500" />
    },
    {
      id: 2,
      category: 'Flame Test',
      question: 'Flame color for Sodium (Na⁺)',
      answer: 'Yellow',
      hint: 'Think of street lights (Sodium vapor lamps) or the Sun',
      icon: <Flame className="w-8 h-8 text-yellow-500" />
    },
    {
      id: 3,
      category: 'Flame Test',
      question: 'Flame color for Potassium (K⁺)',
      answer: 'Lilac',
      hint: 'Purple flowers',
      icon: <Flame className="w-8 h-8 text-purple-400" />
    },
    {
      id: 4,
      category: 'Flame Test',
      question: 'Flame color for Calcium (Ca²⁺)',
      answer: 'Orange-Red',
      hint: 'Brick Red',
      icon: <Flame className="w-8 h-8 text-orange-500" />
    },
    {
      id: 5,
      category: 'Flame Test',
      question: 'Flame color for Barium (Ba²⁺)',
      answer: 'Light Green',
      hint: 'Barium sounds like "Bear" in the woods (Green)',
      icon: <Flame className="w-8 h-8 text-green-400" />
    },
    {
      id: 6,
      category: 'Flame Test',
      question: 'Flame color for Copper(II) (Cu²⁺)',
      answer: 'Blue-Green',
      hint: 'Think of the Statue of Liberty (oxidized copper)',
      icon: <Flame className="w-8 h-8 text-teal-500" />
    },

    // --- CATIONS (NaOH) ---
    {
      id: 7,
      category: 'Cations (NaOH)',
      question: 'Aluminum (Al³⁺) + NaOH',
      answer: 'White precipitate.\nDissolves in excess NaOH.',
      hint: 'Remember Z.A.C. (Zinc, Aluminum, Chromium dissolve)',
      icon: <Droplets className="w-8 h-8 text-blue-500" />
    },
    {
      id: 8,
      category: 'Cations (NaOH)',
      question: 'Zinc (Zn²⁺) + NaOH',
      answer: 'White precipitate.\nDissolves in excess NaOH.',
      hint: 'Remember Z.A.C. (Zinc, Aluminum, Chromium dissolve)',
      icon: <Droplets className="w-8 h-8 text-blue-500" />
    },
    {
      id: 9,
      category: 'Cations (NaOH)',
      question: 'Calcium (Ca²⁺) + NaOH',
      answer: 'White precipitate.\nINSOLUBLE in excess.',
      hint: 'Calcium = Bone = White & Stubborn (Insoluble)',
      icon: <Droplets className="w-8 h-8 text-blue-500" />
    },
    {
      id: 10,
      category: 'Cations (NaOH)',
      question: 'Copper(II) (Cu²⁺) + NaOH',
      answer: 'Light Blue precipitate.\nInsoluble in excess.',
      icon: <Droplets className="w-8 h-8 text-cyan-600" />
    },
    {
      id: 11,
      category: 'Cations (NaOH)',
      question: 'Iron(II) (Fe²⁺) + NaOH',
      answer: 'Dirty Green precipitate.\nInsoluble in excess.',
      hint: 'Iron 2 = 2 colors of green / Dirty Green Grass',
      icon: <Droplets className="w-8 h-8 text-green-700" />
    },
    {
      id: 12,
      category: 'Cations (NaOH)',
      question: 'Iron(III) (Fe³⁺) + NaOH',
      answer: 'Red-Brown precipitate.\nInsoluble in excess.',
      hint: 'Think Rust (Oxidized Iron)',
      icon: <Droplets className="w-8 h-8 text-orange-700" />
    },
    {
      id: 13,
      category: 'Cations (NaOH)',
      question: 'Ammonium (NH₄⁺) + NaOH',
      answer: 'No precipitate.\nProduces Ammonia gas on warming.',
      icon: <TestTube className="w-8 h-8 text-purple-500" />
    },

    // --- CATIONS (Ammonia) ---
    {
      id: 14,
      category: 'Cations (NH₃)',
      question: 'Zinc (Zn²⁺) + Aqueous Ammonia',
      answer: 'White precipitate.\nDISSOLVES in excess.',
      hint: 'Zinc is a Zealot (Dissolves in everything)',
      icon: <TestTube className="w-8 h-8 text-teal-500" />
    },
    {
      id: 15,
      category: 'Cations (NH₃)',
      question: 'Aluminum (Al³⁺) + Aqueous Ammonia',
      answer: 'White precipitate.\nINSOLUBLE in excess.',
      hint: 'Aluminum is Awkward (Refuses to dissolve in Ammonia)',
      icon: <TestTube className="w-8 h-8 text-teal-500" />
    },
    {
      id: 16,
      category: 'Cations (NH₃)',
      question: 'Copper(II) (Cu²⁺) + Aqueous Ammonia',
      answer: 'Light blue precipitate.\nDISSOLVES in excess to form DARK BLUE solution.',
      hint: 'Deep Blue Sea',
      icon: <TestTube className="w-8 h-8 text-blue-800" />
    },

    // --- ANIONS ---
    {
      id: 17,
      category: 'Anions',
      question: 'Test for Chloride (Cl⁻)',
      answer: 'Add Nitric Acid + Silver Nitrate.\nResult: WHITE precipitate.',
      hint: 'Milk (Chlorine)',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 18,
      category: 'Anions',
      question: 'Test for Bromide (Br⁻)',
      answer: 'Add Nitric Acid + Silver Nitrate.\nResult: CREAM precipitate.',
      hint: 'Cream (Bromine)',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 19,
      category: 'Anions',
      question: 'Test for Iodide (I⁻)',
      answer: 'Add Nitric Acid + Silver Nitrate.\nResult: YELLOW precipitate.',
      hint: 'Butter (Iodine)',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 20,
      category: 'Anions',
      question: 'Test for Sulfate (SO₄²⁻)',
      answer: 'Add Acid + Barium Nitrate.\nResult: WHITE precipitate.',
      hint: 'BaSO4 = Heavy White Base',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 21,
      category: 'Anions',
      question: 'Test for Carbonate (CO₃²⁻)',
      answer: 'Add Acid.\nResult: Bubbles (CO₂ gas).',
      hint: 'Fizzy Soda',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 22,
      category: 'Anions',
      question: 'Test for Nitrate (NO₃⁻)',
      answer: 'Add NaOH + Al Foil + Heat.\nResult: Ammonia gas produced.',
      hint: 'Al foil transforms NO3 to NH3',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },

    // --- GAS TESTS ---
    {
      id: 23,
      category: 'Gas Tests',
      question: 'Test for Hydrogen (H₂)',
      answer: 'Lighted splint -> Squeaky Pop.',
      icon: <Wind className="w-8 h-8 text-slate-500" />
    },
    {
      id: 24,
      category: 'Gas Tests',
      question: 'Test for Oxygen (O₂)',
      answer: 'Glowing splint -> Relights.',
      icon: <Wind className="w-8 h-8 text-red-500" />
    },
    {
      id: 25,
      category: 'Gas Tests',
      question: 'Test for Carbon Dioxide (CO₂)',
      answer: 'Bubble through Limewater -> Turns Milky/Cloudy.',
      icon: <Wind className="w-8 h-8 text-slate-400" />
    },
    {
      id: 26,
      category: 'Gas Tests',
      question: 'Test for Ammonia (NH₃)',
      answer: 'Damp Red Litmus Paper -> Turns Blue.',
      icon: <Wind className="w-8 h-8 text-blue-500" />
    },
    {
      id: 27,
      category: 'Gas Tests',
      question: 'Test for Chlorine (Cl₂)',
      answer: 'Damp Blue Litmus Paper -> Turns Red then Bleaches White.',
      hint: 'Swimming pool smell',
      icon: <Wind className="w-8 h-8 text-green-500" />
    },

    // --- VOCABULARY ---
    {
      id: 28,
      category: 'Vocab',
      question: 'Solvent',
      answer: 'The liquid in which a solute dissolves (e.g., Water).',
      icon: <Filter className="w-8 h-8 text-teal-600" />
    },
    {
      id: 29,
      category: 'Vocab',
      question: 'Solute',
      answer: 'The substance which dissolves (e.g., Salt).',
      icon: <Filter className="w-8 h-8 text-teal-600" />
    },
    {
      id: 30,
      category: 'Vocab',
      question: 'Saturated Solution',
      answer: 'A solution where no more solute can dissolve at that temperature.',
      icon: <Filter className="w-8 h-8 text-teal-600" />
    }
  ];

  // --- State ---
  const [cards, setCards] = useState(initialCards);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [gameMode, setGameMode] = useState('study'); 
  const [animating, setAnimating] = useState(false);

  // --- Logic ---
  const filteredCards = currentFilter === 'All' 
    ? cards 
    : cards.filter(card => card.category === currentFilter);

  const currentCard = filteredCards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) setShowHint(false); // Hide hint if flipping back to front
  };

  const nextCard = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsFlipped(false);
      setShowHint(false);
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
      setAnimating(false);
    }, 200);
  };

  const prevCard = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsFlipped(false);
      setShowHint(false);
      setCurrentIndex((prev) => (prev - 1 < 0 ? filteredCards.length - 1 : prev - 1));
      setAnimating(false);
    }, 200);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  const handleQuizResponse = (correct) => {
    setScore(prev => ({
      ...prev,
      [correct ? 'correct' : 'wrong']: prev[correct ? 'correct' : 'wrong'] + 1
    }));
    nextCard();
  };

  const resetGame = () => {
    setScore({ correct: 0, wrong: 0 });
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    setCards(initialCards);
  };

  const toggleFilter = (filter) => {
    setCurrentFilter(filter);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === ' ' || e.key === 'Enter') handleFlip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, currentFilter]);

  if (!currentCard) return <div className="p-8 text-center text-white">No cards found.</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500/30 p-4 md:p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-4xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-indigo-400">
            <Beaker className="w-8 h-8" />
            Ultimate Chemistry
          </h1>
          <p className="text-slate-400">Flames, Ions, Gases & Vocab</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 shadow-sm">
          <button 
            onClick={() => setGameMode('study')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${gameMode === 'study' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Study
          </button>
          <button 
            onClick={() => { setGameMode('quiz'); resetGame(); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${gameMode === 'quiz' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Quiz
          </button>
        </div>
      </div>

      {/* Categories / Filters */}
      <div className="w-full max-w-4xl mb-6 flex flex-wrap gap-2 justify-center">
        {['All', 'Flame Test', 'Cations (NaOH)', 'Cations (NH₃)', 'Anions', 'Gas Tests', 'Vocab'].map(cat => (
          <button
            key={cat}
            onClick={() => toggleFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              currentFilter === cat 
                ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/20' 
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-indigo-400 hover:text-indigo-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Progress & Score */}
      <div className="w-full max-w-xl flex justify-between items-center text-sm text-slate-400 mb-4 px-2">
        <span>Card {currentIndex + 1} of {filteredCards.length}</span>
        {gameMode === 'quiz' && (
          <div className="flex gap-4 font-medium">
            <span className="text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {score.correct}</span>
            <span className="text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" /> {score.wrong}</span>
          </div>
        )}
      </div>

      {/* FLASHCARD AREA */}
      <div className="relative w-full max-w-xl h-80 perspective-1000 mb-8 group cursor-pointer" onClick={handleFlip}>
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* --- FRONT --- */}
          <div className="absolute w-full h-full backface-hidden bg-slate-800 rounded-2xl shadow-xl border border-slate-700 flex flex-col items-center justify-center p-8 text-center hover:shadow-2xl hover:shadow-indigo-500/10 transition-all">
             
             {/* Category Tag */}
             <div className="absolute top-4 left-4 bg-slate-900/50 p-2 rounded-lg border border-slate-700">
               {currentCard.icon}
             </div>
             <div className="bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
               {currentCard.category}
             </div>

             {/* Question */}
             <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
               {currentCard.question}
             </h2>

             {/* Hint Button (Only if hint exists) */}
             {currentCard.hint && !isFlipped && (
               <button 
                onClick={(e) => { e.stopPropagation(); setShowHint(!showHint); }}
                className="mt-6 flex items-center gap-2 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors z-10 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20"
               >
                 <Lightbulb className="w-3 h-3" /> {showHint ? 'Hide Hint' : 'Need a Hint?'}
               </button>
             )}

             {/* Display Hint Text */}
             {showHint && (
               <p className="mt-3 text-sm text-yellow-200/80 italic animate-in fade-in slide-in-from-top-1">
                 "{currentCard.hint}"
               </p>
             )}

             <p className="absolute bottom-6 text-slate-500 text-xs font-medium animate-pulse">
               Click to Flip
             </p>
          </div>

          {/* --- BACK --- */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl rotate-y-180 flex flex-col items-center justify-center p-8 text-center text-slate-900">
             <div className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
               Answer
             </div>
             <p className="text-xl md:text-2xl font-bold leading-relaxed whitespace-pre-line">
               {currentCard.answer}
             </p>
          </div>

        </div>
      </div>

      {/* CONTROLS */}
      <div className="w-full max-w-xl flex flex-col items-center gap-4">
        
        {/* Quiz Buttons */}
        {gameMode === 'quiz' && isFlipped && (
          <div className="flex gap-4 w-full animate-in fade-in slide-in-from-bottom-4">
            <button 
              onClick={(e) => { e.stopPropagation(); handleQuizResponse(false); }}
              className="flex-1 bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-400 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors"
            >
              <XCircle className="w-5 h-5" /> Again
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleQuizResponse(true); }}
              className="flex-1 bg-green-900/30 hover:bg-green-900/50 border border-green-800 text-green-400 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors"
            >
              <CheckCircle className="w-5 h-5" /> Got it
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className={`flex items-center gap-4 md:gap-6 ${gameMode === 'quiz' && isFlipped ? 'opacity-50 pointer-events-none' : ''}`}>
          <button 
            onClick={prevCard}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-sm font-medium transition-colors"
          >
            <Shuffle className="w-4 h-4" /> Shuffle
          </button>

          <button 
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>

          <button 
            onClick={nextCard}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* CSS for 3D Transform */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default UltimateFlashcards;

