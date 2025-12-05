import React, { useState, useEffect, useRef } from 'react';
import { Recycle, CreditCard, CheckCircle, ArrowRight, Minus, Plus, Leaf, FileText, Droplets } from 'lucide-react';
import { AppStep, Language, MaterialType, Translation } from './types';
import { TEXTS, POINTS_PER_PLASTIC, POINTS_PER_PAPER } from './constants';
import Button from './components/Button';
import { getEcoFact } from './services/geminiService';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.AZE);
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [material, setMaterial] = useState<MaterialType>(MaterialType.PLASTIC);
  const [count, setCount] = useState<number>(0);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Derived state
  const t: Translation = TEXTS[lang];
  const points = count * (material === MaterialType.PLASTIC ? POINTS_PER_PLASTIC : POINTS_PER_PAPER);

  // --- Handlers ---

  const handleLanguageSelect = (selectedLang: Language) => {
    setLang(selectedLang);
  };

  const handleStart = () => {
    setStep(AppStep.SCAN_CARD);
  };

  // Simulate card scan
  const handleSimulateCardScan = () => {
    // Add a small delay to simulate reading
    setTimeout(() => {
      setStep(AppStep.SELECT_TYPE);
    }, 800);
  };

  const handleSelectMaterial = (type: MaterialType) => {
    setMaterial(type);
    setCount(0);
    setStep(AppStep.INSERTING);
  };

  const incrementCount = () => setCount(prev => prev + 1);
  const decrementCount = () => setCount(prev => Math.max(0, prev - 1));

  const handleConfirm = async () => {
    if (count === 0) return;
    
    setStep(AppStep.PROCESSING);
    
    // Simulate API call to save points
    // Also fetch AI fun fact
    setIsAiLoading(true);
    try {
        // Parallel simulation delay + AI fetch
        const [fact] = await Promise.all([
            getEcoFact(count, material, lang),
            new Promise(resolve => setTimeout(resolve, 2000)) // Min 2s loading screen
        ]);
        setAiMessage(fact);
    } catch (e) {
        console.error("Error", e);
    } finally {
        setIsAiLoading(false);
        setStep(AppStep.SUCCESS);
    }
  };

  const resetApp = () => {
    setStep(AppStep.WELCOME);
    setCount(0);
    setAiMessage("");
  };

  // Auto-reset after success
  useEffect(() => {
    if (step === AppStep.SUCCESS) {
      const timer = setTimeout(() => {
        resetApp();
      }, 8000); // 8 seconds to read message
      return () => clearTimeout(timer);
    }
  }, [step]);

  // --- Renders ---

  const renderLanguageSelector = () => (
    <div className="flex gap-4 mb-8 z-10">
      {Object.values(Language).map((l) => (
        <button
          key={l}
          onClick={() => handleLanguageSelect(l)}
          className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest transition-all ${
            lang === l 
            ? 'bg-white text-eco-900 shadow-lg scale-105' 
            : 'bg-eco-900/50 text-white/70 hover:bg-eco-800'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-eco-400 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <Recycle size={120} className="text-eco-400 relative z-10" />
      </div>
      
      <h1 className="text-6xl font-black mb-4 tracking-tight text-white drop-shadow-lg">
        EcoPay
      </h1>
      <p className="text-2xl text-eco-200 font-light mb-12 max-w-2xl">
        {t.subtitle}
      </p>

      {renderLanguageSelector()}

      <Button size="xl" onClick={handleStart} className="animate-bounce">
        {t.welcome} <ArrowRight className="ml-3 inline" />
      </Button>
    </div>
  );

  const renderScanCard = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-4xl font-bold mb-8">{t.scanCard}</h2>
      <p className="text-xl text-eco-200 mb-12">{t.scanCardSub}</p>
      
      <div 
        className="w-80 h-48 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl border-2 border-slate-500 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform group relative overflow-hidden"
        onClick={handleSimulateCardScan}
      >
         {/* Shiny reflection effect */}
         <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-[shimmer_1s_infinite]"></div>
         
         <CreditCard size={64} className="text-white/80" />
         <span className="absolute bottom-4 left-6 font-mono text-white/40 tracking-widest">•••• •••• •••• 1234</span>
      </div>
      <p className="mt-8 text-sm text-white/30 uppercase tracking-widest animate-pulse">
        {t.simulatedSensor}: Click Card
      </p>
    </div>
  );

  const renderSelectType = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-4xl font-bold mb-12">{t.selectMaterial}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <button
          onClick={() => handleSelectMaterial(MaterialType.PLASTIC)}
          className="group relative h-80 bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl border-4 border-blue-700/50 flex flex-col items-center justify-center transition-all hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] active:scale-95"
        >
          <div className="bg-blue-950/50 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform">
             <Droplets size={64} className="text-blue-400" />
          </div>
          <span className="text-3xl font-bold text-blue-100">{t.plastic}</span>
          <span className="mt-2 text-blue-300/60 font-mono text-lg">1 Unit = {POINTS_PER_PLASTIC} Pts</span>
        </button>

        <button
          onClick={() => handleSelectMaterial(MaterialType.PAPER)}
          disabled={false} /* Re-enabled for simulation per request */
          className="group relative h-80 bg-gradient-to-br from-amber-900 to-amber-800 rounded-3xl border-4 border-amber-700/50 flex flex-col items-center justify-center transition-all hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] active:scale-95"
        >
          <div className="bg-amber-950/50 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform">
             <FileText size={64} className="text-amber-400" />
          </div>
          <span className="text-3xl font-bold text-amber-100">{t.paper}</span>
          <span className="mt-2 text-amber-300/60 font-mono text-lg">{t.paperComingSoon}</span>
        </button>
      </div>
    </div>
  );

  const renderInserting = () => (
    <div className="flex flex-col h-full p-8 max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
            {material === MaterialType.PLASTIC ? <Droplets className="text-blue-400"/> : <FileText className="text-amber-400"/>}
            {t.insertItems}
        </h2>
        <div className="text-right">
             <p className="text-sm text-eco-300 uppercase">{t.currentPoints}</p>
             <p className="text-4xl font-black text-white">{points}</p>
        </div>
      </div>

      <div className="flex-1 bg-black/20 rounded-3xl border-2 border-white/10 flex flex-col items-center justify-center relative backdrop-blur-sm">
         {/* Central Counter */}
         <div className="relative z-10 text-center">
            <div className="text-[180px] leading-none font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 filter drop-shadow-2xl">
                {count}
            </div>
            <p className="text-2xl text-white/50 uppercase tracking-[0.5em]">{t.count}</p>
         </div>

         {/* Simulation Controls */}
         <div className="absolute bottom-8 flex gap-6 z-20">
            <Button variant="secondary" size="lg" onClick={decrementCount} className="rounded-full w-20 h-20 !p-0">
                <Minus size={32} />
            </Button>
            <div className="bg-black/40 px-4 py-2 rounded-lg text-xs text-center text-white/40 self-center border border-white/10">
                {t.simulatedSensor}<br/>Manual Input
            </div>
            <Button variant="primary" size="lg" onClick={incrementCount} className="rounded-full w-20 h-20 !p-0">
                <Plus size={32} />
            </Button>
         </div>
      </div>

      <div className="mt-8 flex justify-end">
          <Button 
            variant="primary" 
            size="xl" 
            fullWidth 
            onClick={handleConfirm}
            disabled={count === 0}
            className="shadow-2xl shadow-eco-500/20"
          >
            {t.confirm}
          </Button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="relative mb-8">
             <div className="w-24 h-24 border-8 border-eco-500/30 border-t-eco-400 rounded-full animate-spin"></div>
             <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-eco-400 animate-pulse" size={32} />
        </div>
        <h2 className="text-3xl font-bold animate-pulse">{t.processing}</h2>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in-up">
        <div className="bg-eco-500 rounded-full p-6 mb-8 shadow-[0_0_60px_rgba(34,197,94,0.6)] animate-[bounce_1s_infinite]">
            <CheckCircle size={80} className="text-white" />
        </div>
        
        <h2 className="text-5xl font-black mb-4">{t.successTitle}</h2>
        <p className="text-2xl text-eco-100 mb-8">{t.successMessage}</p>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20 max-w-2xl w-full">
            <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-4">
                <span className="text-lg text-white/70">{t.count}:</span>
                <span className="text-4xl font-bold">{count}</span>
            </div>
            <div className="flex justify-between items-end">
                <span className="text-lg text-white/70">{t.currentPoints}:</span>
                <span className="text-5xl font-black text-eco-400">{points}</span>
            </div>
        </div>

        {/* AI Eco Fact Section */}
        {aiMessage && (
            <div className="max-w-xl bg-gradient-to-r from-indigo-900/80 to-purple-900/80 p-6 rounded-xl border border-indigo-500/30 shadow-lg">
                <div className="flex items-center gap-2 mb-2 text-indigo-300 text-sm font-bold uppercase tracking-wider">
                     <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                     Eco-Fact (AI)
                </div>
                <p className="text-lg italic text-white font-medium leading-relaxed">
                    "{aiMessage}"
                </p>
            </div>
        )}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case AppStep.WELCOME: return renderWelcome();
      case AppStep.SCAN_CARD: return renderScanCard();
      case AppStep.SELECT_TYPE: return renderSelectType();
      case AppStep.INSERTING: return renderInserting();
      case AppStep.PROCESSING: return renderProcessing();
      case AppStep.SUCCESS: return renderSuccess();
      default: return renderWelcome();
    }
  };

  return (
    <div className="min-h-screen bg-eco-950 text-white font-sans selection:bg-eco-500 selection:text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Main Content Area - Simulating a Tablet Viewport */}
      <main className="relative z-10 h-screen w-full flex flex-col">
         {/* Simple Header for context (visible in select/insert modes) */}
         {step !== AppStep.WELCOME && step !== AppStep.SUCCESS && (
             <header className="p-6 flex justify-between items-center bg-black/20 backdrop-blur-sm border-b border-white/5">
                 <div className="flex items-center gap-2 text-eco-400 font-bold text-xl">
                    <Recycle /> EcoPay
                 </div>
                 <div className="flex gap-2">
                     <span className="px-3 py-1 bg-white/10 rounded text-sm font-mono text-white/50">{lang.toUpperCase()}</span>
                 </div>
             </header>
         )}

         <div className="flex-1 overflow-y-auto">
            {renderStep()}
         </div>
      </main>

      {/* Global CSS keyframes for one-off animations */}
      <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(12deg); }
            100% { transform: translateX(200%) skewX(12deg); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;