"use client";

import { Keyboard } from "@/components/ui/keyboard";
import { useCallback, useEffect, useState, useRef } from "react";
import { getRandomSentences } from "@/lib/words/malayalam";
import { malayalamKeyMap } from "@/lib/layouts/malayalam";
import { motion, AnimatePresence } from "framer-motion";
import { IconKeyboard, IconRefresh, IconTarget } from "@tabler/icons-react";

const DURATIONS = [15, 30, 60];

export default function TypingArea() {
  const [duration, setDuration] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [pastInput, setPastInput] = useState("");
  const [targetText, setTargetText] = useState("");
  const [userInput, setUserInput] = useState("");
  
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, correctWords: 0, wrongWords: 0 });
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const generated = getRandomSentences();
    setSentences(generated);
    setCurrentSentenceIdx(0);
    setTargetText(generated.join(' ')); 
    setUserInput("");
    setPastInput("");
    setTimeLeft(duration);
    setIsActive(false);
    setIsFinished(false);
    setStats({ wpm: 0, accuracy: 100, correctWords: 0, wrongWords: 0 });
  }, [duration]);

  useEffect(() => { setMounted(true); resetTest(); }, [duration, resetTest]);

  const calculateStats = useCallback(() => {
    // If the timer hasn't changed or test just ended instantly
    const actualTimeElapsed = duration - timeLeft;
    const timeElapsedInMinutes = actualTimeElapsed / 60;
    
    if (actualTimeElapsed <= 0) return { wpm: 0, accuracy: 0, correctWords: 0, wrongWords: 0 };
    
    // Total accumulated input vs Target
    const totalTyped = (pastInput + userInput).trim();
    
    // We only count characters that actually match targetText at that index
    const correctKeystrokes = totalTyped.split('').filter((c, i) => c === targetText[i]).length;
    const accuracy = totalTyped.length > 0 ? Math.round((correctKeystrokes / totalTyped.length) * 100) : 100;
    
    // Standard typing test formula: 5 characters = 1 word
    const grossWpm = (totalTyped.length / 5) / timeElapsedInMinutes;
    const netWpm = Math.max(0, Math.round(grossWpm - ((totalTyped.length - correctKeystrokes) / 5) / timeElapsedInMinutes));
    
    const correctWords = Math.round(correctKeystrokes / 5);
    const wrongWords = Math.round((totalTyped.length - correctKeystrokes) / 5);
    
    return { wpm: netWpm, accuracy, correctWords, wrongWords };
  }, [userInput, pastInput, targetText, timeLeft, duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
      setStats(calculateStats());
    }
  }, [timeLeft, isActive, calculateStats]);

  const processInputUpdate = useCallback((newInput: string) => {
    const currentSentence = sentences[currentSentenceIdx] || "";
    
    if (newInput.length >= currentSentence.length) {
      // Complete current sentence! Move to next adding EXACT typed input
      setPastInput((prev) => prev + newInput + " ");
      setUserInput("");
      setCurrentSentenceIdx((prev) => prev + 1);
    } else {
      setUserInput(newInput);
    }
  }, [sentences, currentSentenceIdx]);

  const handleVirtualKey = useCallback((code: string) => {
    if (isFinished) return;
    const mappedChar = malayalamKeyMap[code]?.normal;
    if (!isActive) setIsActive(true);
    
    if (code === 'Backspace') {
      setUserInput((prev) => prev.slice(0, -1));
      return;
    }
    
    const charToAdd = mappedChar;
    if (charToAdd) {
      processInputUpdate(userInput + charToAdd);
    }
  }, [isActive, isFinished, malayalamKeyMap, userInput, processInputUpdate]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (isFinished) return;

      const mapping = malayalamKeyMap[e.code];
      const mappedChar = mapping ? (e.shiftKey ? mapping.shift : mapping.normal) : undefined;
      
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Enter'].includes(e.key)) return;
      if (!isActive) setIsActive(true);

      if (e.key === 'Backspace') {
        setUserInput((prev) => prev.slice(0, -1));
        return;
      }

      if (mappedChar || e.key.length === 1) { // Allowing real standard keys if mappedChar lacks space?
        // Let's use mappedChar if exists, otherwise space if user hits space
        let c = mappedChar;
        if (e.code === 'Space') c = ' ';
        // Fallback for native typing
        if (!c && e.key.length === 1 && e.key !== ' ') c = e.key;

        if (c) {
          processInputUpdate(userInput + c);
        }
      }
    },
    [isActive, isFinished, malayalamKeyMap, userInput, processInputUpdate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!mounted) return null;

  const currentSentence = sentences[currentSentenceIdx] || "";
  const nextSentence = sentences[currentSentenceIdx + 1] || "";

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-1 py-0 sm:px-2">
      <div className={"relative flex w-full flex-col items-center transition-all duration-500 " + (isFinished ? "pointer-events-none blur-md opacity-40" : "")}>
        <div className="w-full relative">
          <div className="mb-2 flex items-center justify-between gap-3 opacity-80 transition-opacity hover:opacity-100">
            <div className="text-xl font-mono font-black tracking-tighter text-slate-900 sm:text-2xl">
              {timeLeft}s
            </div>
            
            <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2">
              {DURATIONS.map((dur) => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={`rounded-full border-2 border-transparent px-3 py-1.5 text-xs font-bold transition-all sm:px-5 sm:py-2 sm:text-sm ${duration === dur ? 'border-slate-900 bg-[#B3F023] text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none' : 'bg-transparent text-slate-600 hover:border-slate-900/20 hover:bg-[#baeef3] hover:text-slate-900'}`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Screen area proper */}
          <div className="text-left leading-relaxed tracking-wide font-sans md:leading-loose text-slate-500 font-medium mb-0 select-none flex flex-col">
            
            {/* Current Sentence */}
            <div className="relative mb-0 min-h-[4rem] break-words text-xl perspective-[1000px] sm:min-h-[5rem] sm:text-2xl md:text-3xl">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentSentenceIdx}
                  initial={{ opacity: 0, y: 5, rotateX: -5, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, rotateX: 5, scale: 1.02 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className="relative w-full"
                >
                  {currentSentence.split("").map((char, i) => {
                    let charStyle = "text-slate-500 font-medium"; 
                    if (i < userInput.length) {
                      charStyle = userInput[i] === char ? "text-slate-900 font-black" : "text-red-600 bg-red-200 line-through decoration-red-500/30";
                    }
                    return (
                      <span key={"c"+i} className={"relative " + charStyle}>
                        {char}
                        {i === userInput.length - 1 && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 0.8 }} className="absolute -right-[1px] top-0 bottom-0 w-[4px] bg-[#B3F023] shadow-md z-10" />
                        )}
                      </span>
                    );
                  })}
                  {userInput.length === 0 && currentSentence.length > 0 && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 0.8 }} className="absolute -left-[3px] top-[10%] bottom-[10%] w-[3px] bg-[#B3F023] rounded-full shadow-md z-10" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Sentence Shadow Preview */}
            <div className="relative z-0 hidden mb-4 mt-0.5 select-none break-words text-xl font-bold text-slate-400 opacity-40 blur-[0.5px] transition-all duration-700 pointer-events-none md:block lg:text-2xl">
              {nextSentence}
            </div>

          </div>
        </div>

        {/* Keyboard Component */}
        <div className="mt-4 hidden w-full overflow-x-auto pb-2 sm:block">
          <div className="w-max mx-auto flex justify-center">
            <Keyboard
              soundUrl="https://keyb.himan.me/sounds/sound.ogg"
                onKeyEvent={(e) => { if (e.phase === 'down' && e.source === 'pointer') handleVirtualKey(e.code); }}
                theme="classic"
                enableHaptics
                enableSound
              />
            </div>
          </div>
        </div>

        {/* Results Modal */}
      {isFinished && (
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute top-1/2 left-1/2 z-50 flex w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-hidden rounded-2xl border-4 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] sm:p-8">
          <div className="absolute top-0 left-0 w-full h-3 bg-[#B3F023] border-b-4 border-slate-900"></div>
          <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center justify-center gap-3">
            <IconTarget className="w-8 h-8 text-slate-900" stroke={2.5} />
            Analytics
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-5 w-full">
            <div className="bg-[#B3F023] border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
              <div className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-1.5"><IconKeyboard className="w-4 h-4" /> WPM</div>
              <div className="text-6xl font-black text-slate-900">{stats.wpm}</div>
            </div>
            <div className="bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
              <div className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-1.5"><IconTarget className="w-4 h-4" /> Accuracy</div>
              <div className="text-5xl font-black text-slate-900">{stats.accuracy}<span className="text-3xl">%</span></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 w-full">
            <div className="bg-white border-2 border-slate-900 rounded-xl p-3 flex flex-col items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <span className="text-xs font-black text-slate-900 uppercase">Correct Words</span>
              <span className="text-3xl font-black text-slate-900">{stats.correctWords}</span>
            </div>
            <div className="bg-white border-2 border-slate-900 rounded-xl p-3 flex flex-col items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <span className="text-xs font-black text-slate-900 uppercase">Wrong Words</span>
              <span className="text-3xl font-black text-slate-900">{stats.wrongWords}</span>
            </div>
          </div>
          <button onClick={resetTest} className="w-full bg-[#B3F023] hover:bg-[#a0d620] text-slate-900 font-black text-xl py-4 px-8 border-4 border-slate-900 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-2">
            <IconRefresh className="w-6 h-6" stroke={2.5}/>
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
