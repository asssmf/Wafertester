import React, { useState, useEffect } from 'react';
import { Beaker, CheckCircle, XCircle, RotateCcw, Shuffle, ChevronRight, ChevronLeft, Droplets, Filter, TestTube } from 'lucide-react';

const IonFlashcardGame = () => {
  // --- Data ---
  const initialCards = [
    // --- CATIONS (NaOH Tests) - From PDF ---
    {
      id: 1,
      category: 'Cations (NaOH)',
      question: 'Test for Aluminum (Al³⁺) with NaOH',
      answer: 'White precipitate.\nSoluble in excess NaOH (forms colorless solution).',
      icon: <Droplets className="w-8 h-8 text-blue-500" />
    },
    {
      id: 2,
      category: 'Cations (NaOH)',
      question: 'Test for Calcium (Ca²⁺) with NaOH',
      answer: 'White precipitate.\nInsoluble in excess NaOH.',
      icon: <Droplets className="w-8 h-8 text-blue-500" />
    },
    {
      id: 3,
      category: 'Cations (NaOH)',
      question: 'Test for Chromium(III) (Cr³⁺) with NaOH',
      answer: 'Green precipitate.\nSoluble in excess NaOH.',
      icon: <Droplets className="w-8 h-8 text-green-600" />
    },
    {
      id: 4,
      category: 'Cations (NaOH)',
      question: 'Test for Copper(II) (Cu²⁺) with NaOH',
      answer: 'Light blue precipitate.\nInsoluble in excess NaOH.',
      icon: <Droplets className="w-8 h-8 text-cyan-600" />
    },
    {
      id: 5,
      category: 'Cations (NaOH)',
      question: 'Test for Iron(II) (Fe²⁺) with NaOH',
      answer: 'Green precipitate.\nInsoluble in excess.\n(Turns brown near surface on standing).',
      icon: <Droplets className="w-8 h-8 text-green-700" />
    },
    {
      id: 6,
      category: 'Cations (NaOH)',
      question: 'Test for Iron(III) (Fe³⁺) with NaOH',
      answer: 'Red-brown precipitate.\nInsoluble in excess NaOH.',
      icon: <Droplets className="w-8 h-8 text-orange-700" />
    },
    {
      id: 7,
      category: 'Cations (NaOH)',
      question: 'Test for Zinc (Zn²⁺) with NaOH',
      answer: 'White precipitate.\nSoluble in excess NaOH (forms colorless solution).',
      icon: <Droplets className="w-8 h-8 text-blue-500" />
    },
    {
      id: 8,
      category: 'Cations (NaOH)',
      question: 'Test for Ammonium (NH₄⁺) with NaOH',
      answer: 'No precipitate.\nAmmonia gas produced on warming.',
      icon: <Droplets className="w-8 h-8 text-purple-500" />
    },

    // --- CATIONS (Ammonia Tests) - From PDF ---
    {
      id: 9,
      category: 'Cations (NH₃)',
      question: 'Test for Aluminum (Al³⁺) with Aqueous Ammonia',
      answer: 'White precipitate.\nInsoluble in excess Ammonia.',
      icon: <TestTube className="w-8 h-8 text-teal-500" />
    },
    {
      id: 10,
      category: 'Cations (NH₃)',
      question: 'Test for Calcium (Ca²⁺) with Aqueous Ammonia',
      answer: 'No precipitate (or very slight white precipitate).',
      icon: <TestTube className="w-8 h-8 text-teal-500" />
    },
    {
      id: 11,
      category: 'Cations (NH₃)',
      question: 'Test for Chromium(III) (Cr³⁺) with Aqueous Ammonia',
      answer: 'Grey-Green precipitate.\nInsoluble in excess Ammonia.',
      icon: <TestTube className="w-8 h-8 text-teal-600" />
    },
    {
      id: 12,
      category: 'Cations (NH₃)',
      question: 'Test for Copper(II) (Cu²⁺) with Aqueous Ammonia',
      answer: 'Light blue precipitate.\nSoluble in excess Ammonia (forms DARK BLUE solution).',
      icon: <TestTube className="w-8 h-8 text-blue-800" />
    },
    {
      id: 13,
      category: 'Cations (NH₃)',
      question: 'Test for Iron(II) (Fe²⁺) with Aqueous Ammonia',
      answer: 'Green precipitate.\nInsoluble in excess Ammonia.',
      icon: <TestTube className="w-8 h-8 text-green-700" />
    },
    {
      id: 14,
      category: 'Cations (NH₃)',
      question: 'Test for Iron(III) (Fe³⁺) with Aqueous Ammonia',
      answer: 'Red-brown precipitate.\nInsoluble in excess Ammonia.',
      icon: <TestTube className="w-8 h-8 text-orange-700" />
    },
    {
      id: 15,
      category: 'Cations (NH₃)',
      question: 'Test for Zinc (Zn²⁺) with Aqueous Ammonia',
      answer: 'White precipitate.\nSoluble in excess Ammonia (forms colorless solution).',
      icon: <TestTube className="w-8 h-8 text-teal-500" />
    },

    // --- ANIONS (Standard Chemistry Knowledge) ---
    {
      id: 16,
      category: 'Anions',
      question: 'Test for Carbonate (CO₃²⁻)',
      answer: 'Add dilute acid.\nResult: Effervescence (Carbon Dioxide produced).',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 17,
      category: 'Anions',
      question: 'Test for Chloride (Cl⁻) [in solution]',
      answer: 'Acidify with dilute nitric acid, then add aqueous Silver Nitrate.\nResult: White precipitate.',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 18,
      category: 'Anions',
      question: 'Test for Bromide (Br⁻) [in solution]',
      answer: 'Acidify with dilute nitric acid, then add aqueous Silver Nitrate.\nResult: Cream precipitate.',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 19,
      category: 'Anions',
      question: 'Test for Iodide (I⁻) [in solution]',
      answer: 'Acidify with dilute nitric acid, then add aqueous Silver Nitrate.\nResult: Yellow precipitate.',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 20,
      category: 'Anions',
      question: 'Test for Nitrate (NO₃⁻) [in solution]',
      answer: 'Add aqueous NaOH, then aluminum foil; warm carefully.\nResult: Ammonia gas produced.',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 21,
      category: 'Anions',
      question: 'Test for Sulfate (SO₄²⁻) [in solution]',
      answer: 'Acidify, then add aqueous Barium Nitrate (or Barium Chloride).\nResult: White precipitate.',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    },
    {
      id: 22,
      category: 'Anions',
      question: 'Test for Sulfite (SO₃²⁻)',
      answer: 'Add dilute hydrochloric acid, warm gently.\nResult: Sulfur dioxide produced (turns KMnO₄ from purple to colorless).',
      icon: <Beaker className="w-8 h-8 text-indigo-500" />
    }
  ];

  // --- State ---
  const [cards, setCards] = useState(initialCards);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [gameMode, setGameMode] = useState('study'); // 'study' or 'quiz'
  const [animating, setAnimating] = useState(false);

  // --- Logic ---
  const filteredCards = currentFilter === 'All' 
    ? cards 
    : cards.filter(card => card.category === currentFilter);

  const currentCard = filteredCards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsFlipped(false);
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
      setAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsFlipped(false);
      setCurrentIndex((prev) => (prev - 1 < 0 ? filteredCards.length - 1 : prev - 1));
      setAnimating(false);
    }, 200);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleQuizResponse = (correct) => {
    setScore(prev => ({
      ...prev,
      [correct ? 'correct' : 'wrong']: prev[correct ? 'correct' : 'wrong'] + 1
    }));
    handleNext();
  };

  const resetGame = () => {
    setScore({ correct: 0, wrong: 0 });
    setCurrentIndex(0);
    setIsFlipped(false);
    setCards(initialCards); // Reset order
  };

  const toggleFilter = (filter) => {
    setCurrentFilter(filter);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // --- Keyboard navigation ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ' || e.key === 'Enter') handleFlip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, currentFilter]);

  if (!currentCard) return <div className="p-8 text-center">No cards found for this filter.</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 p-4 md:p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-2xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TestTube className="w-8 h-8 text-indigo-600" />
            Aqueous Ion Tests
          </h1>
          <p className="text-slate-500">Cations (NaOH/NH₃) & Anions</p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          <button 
            onClick={() => setGameMode('study')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${gameMode === 'study' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Study Mode
          </button>
          <button 
            onClick={() => { setGameMode('quiz'); resetGame(); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${gameMode === 'quiz' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Quiz Mode
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="w-full max-w-3xl mb-6 flex flex-wrap gap-2 justify-center">
        {['All', 'Cations (NaOH)', 'Cations (NH₃)', 'Anions'].map(cat => (
          <button
            key={cat}
            onClick={() => toggleFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              currentFilter === cat 
                ? 'bg-slate-800 text-white border-slate-800' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Progress & Score */}
      <div className="w-full max-w-xl flex justify-between items-center text-sm text-slate-500 mb-4 px-2">
        <span>Card {currentIndex + 1} of {filteredCards.length}</span>
        {gameMode === 'quiz' && (
          <div className="flex gap-4 font-medium">
            <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {score.correct}</span>
            <span className="text-red-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> {score.wrong}</span>
          </div>
        )}
      </div>

      {/* Flashcard Container */}
      <div className="relative w-full max-w-xl h-80 perspective-1000 mb-8 group cursor-pointer" onClick={handleFlip}>
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front of Card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center justify-center p-8 text-center hover:shadow-2xl transition-shadow">
             <div className="absolute top-4 left-4 opacity-50">
               {currentCard.icon}
             </div>
             <div className="bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
               {currentCard.category}
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
               {currentCard.question}
             </h2>
             <p className="mt-8 text-slate-400 text-sm font-medium animate-pulse">
               Click or Space to Flip
             </p>
          </div>

          {/* Back of Card */}
          <div className="absolute w-full h-full backface-hidden bg-slate-900 rounded-2xl shadow-xl rotate-y-180 flex flex-col items-center justify-center p-8 text-center text-white">
            <div className="absolute top-4 left-4 opacity-50">
               {currentCard.icon}
            </div>
             <div className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
               Answer
             </div>
             <p className="text-lg md:text-xl font-medium leading-relaxed whitespace-pre-line">
               {currentCard.answer}
             </p>
          </div>

        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-xl flex flex-col items-center gap-4">
        
        {/* Quiz Buttons (Visible only when flipped in Quiz Mode) */}
        {gameMode === 'quiz' && isFlipped && (
          <div className="flex gap-4 w-full animate-in fade-in slide-in-from-bottom-4">
            <button 
              onClick={(e) => { e.stopPropagation(); handleQuizResponse(false); }}
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors"
            >
              <XCircle className="w-5 h-5" /> Needs Practice
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleQuizResponse(true); }}
              className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors"
            >
              <CheckCircle className="w-5 h-5" /> Got it!
            </button>
          </div>
        )}

        {/* Standard Navigation */}
        <div className={`flex items-center gap-6 ${gameMode === 'quiz' && isFlipped ? 'opacity-50 pointer-events-none' : ''}`}>
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Previous Card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 text-sm font-medium transition-colors"
          >
            <Shuffle className="w-4 h-4" /> Shuffle
          </button>

          <button 
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>

          <button 
            onClick={handleNext}
            className="p-3 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Next Card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Key Legend */}
      <div className="mt-8 text-xs text-slate-400 flex gap-4">
        <span>Space: Flip</span>
        <span>← / → : Navigate</span>
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

export default IonFlashcardGame;

