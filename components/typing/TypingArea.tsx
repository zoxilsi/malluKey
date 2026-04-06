"use client";

import { Keyboard } from "@/components/ui/keyboard";
import { useCallback, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { getRandomSentences } from "@/lib/words/malayalam";
import { malayalamKeyMap } from "@/lib/layouts/malayalam";
import { motion, AnimatePresence } from "framer-motion";
import { IconKeyboard, IconRefresh, IconTarget, IconUser, IconTrophy, IconAlertTriangle, IconX } from "@tabler/icons-react";
import { submitScore, getLeaderboard, LeaderboardEntry } from "@/app/actions/leaderboard";

const DURATIONS = [15, 30, 60];

export default function TypingArea() {
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardMessage, setLeaderboardMessage] = useState("");

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
  const [inputWarning, setInputWarning] = useState("");
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInputLockedRef = useRef(false);
  const inputWarningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isInputLockedRef.current = isFinished || !isUsernameSet;
  }, [isFinished, isUsernameSet]);

  const fetchLeaderboard = async () => {
    const data = await getLeaderboard();
    setLeaderboard(data);
  };

  const showInputWarning = useCallback((message: string) => {
    setInputWarning(message);
    if (inputWarningTimeoutRef.current) clearTimeout(inputWarningTimeoutRef.current);
    inputWarningTimeoutRef.current = setTimeout(() => setInputWarning(""), 1600);
  }, []);

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
    setLeaderboardMessage("");
    setInputWarning("");
    setStats({ wpm: 0, accuracy: 100, correctWords: 0, wrongWords: 0 });
    fetchLeaderboard();
  }, [duration]);

  useEffect(() => { 
    setMounted(true); 
    resetTest();
    // Try to load username from localStorage
    const savedName = localStorage.getItem("malluKey_username");
    if (savedName) {
      setUsername(savedName);
      setIsUsernameSet(true);
    }
  }, [duration, resetTest]);

  const handleSetUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("malluKey_username", username.trim());
      setIsUsernameSet(true);
    }
  };

  const calculateStats = useCallback(() => {
    const actualTimeElapsed = duration - timeLeft;
    const timeElapsedInMinutes = actualTimeElapsed / 60;
    
    if (actualTimeElapsed <= 0) return { wpm: 0, accuracy: 0, correctWords: 0, wrongWords: 0 };
    
    const totalTyped = (pastInput + userInput).trim();
    const correctKeystrokes = totalTyped.split('').filter((c, i) => c === targetText[i]).length;
    const accuracy = totalTyped.length > 0 ? Math.round((correctKeystrokes / totalTyped.length) * 100) : 100;
    
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
      const finalStats = calculateStats();
      setStats(finalStats);

      // Submit to leaderboard
      submitScore(username, finalStats.wpm).then((res) => {
        setLeaderboardMessage(res.message);
        fetchLeaderboard();
      });
    }
  }, [timeLeft, isActive, calculateStats, username]);

  const processInputUpdate = useCallback((newInput: string) => {
    if (isInputLockedRef.current) return;
    const currentSentence = sentences[currentSentenceIdx] || "";
    
    if (newInput.length >= currentSentence.length) {
      setPastInput((prev) => prev + newInput + " ");
      setUserInput("");
      setCurrentSentenceIdx((prev) => prev + 1);
    } else {
      setUserInput(newInput);
    }
  }, [sentences, currentSentenceIdx]);

  const handleVirtualKey = useCallback((code: string) => {
    if (isInputLockedRef.current) return;
    const mappedChar = malayalamKeyMap[code]?.normal;
    if (!isActive) setIsActive(true);
    
    if (code === 'Backspace') {
      setUserInput((prev) => prev.slice(0, -1));
      return;
    }
    
    if (mappedChar) {
      processInputUpdate(userInput + mappedChar);
    }
    }, [isActive, malayalamKeyMap, userInput, processInputUpdate]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
      if (isInputLockedRef.current) return;

      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (key === 'v' || key === 'x' || key === 'insert')) {
        e.preventDefault();
        showInputWarning('Paste is blocked during the typing test');
        return;
      }

      const mapping = malayalamKeyMap[e.code];
      const mappedChar = mapping ? (e.shiftKey ? mapping.shift : mapping.normal) : undefined;
      
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Enter'].includes(e.key)) return;
      if (!isActive) setIsActive(true);

      if (e.key === 'Backspace') {
        setUserInput((prev) => prev.slice(0, -1));
        return;
      }

      let c = mappedChar;
      if (e.code === 'Space') c = ' ';
      if (!c && e.key.length === 1 && e.key !== ' ') c = e.key;

      if (c) {
        processInputUpdate(userInput + c);
      }
    },
    [isActive, userInput, processInputUpdate, showInputWarning]
  );

  useEffect(() => {
    const blockClipboardInput = (e: ClipboardEvent) => {
      if (isInputLockedRef.current) return;
      e.preventDefault();
      showInputWarning('Paste is blocked during the typing test');
    };

    const blockDropInput = (e: DragEvent) => {
      if (isInputLockedRef.current) return;
      e.preventDefault();
      showInputWarning('Drop is blocked during the typing test');
    };

    window.addEventListener('paste', blockClipboardInput);
    window.addEventListener('drop', blockDropInput);

    return () => {
      window.removeEventListener('paste', blockClipboardInput);
      window.removeEventListener('drop', blockDropInput);
      if (inputWarningTimeoutRef.current) clearTimeout(inputWarningTimeoutRef.current);
    };
  }, [showInputWarning]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!mounted) return null;

  const currentSentence = sentences[currentSentenceIdx] || "";
  const nextSentence = sentences[currentSentenceIdx + 1] || "";

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-1 py-0 sm:px-2">
      
      {/* Username Popup */}
      {!isUsernameSet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl border-4 border-slate-900 bg-[#baeef3] p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-900 bg-[#B3F023] shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <IconUser className="h-8 w-8 text-slate-900" stroke={2.5} />
              </div>
            </div>
            <h2 className="mb-2 text-center text-2xl font-black text-slate-900">Enter Your Name</h2>
            <p className="mb-6 text-center font-bold text-slate-700">to join the malluKey leaderboard!</p>
            <form onSubmit={handleSetUsername} className="flex flex-col gap-4">
              <input
                autoFocus
                type="text"
                maxLength={15}
                placeholder="Typing master..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border-4 border-slate-900 px-4 py-3 text-lg font-black text-slate-900 placeholder-slate-400 outline-none focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all"
                required
              />
              <button type="submit" className="w-full rounded-xl border-4 border-slate-900 bg-[#B3F023] px-4 py-3 text-xl font-black text-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-[#a0d620]">
                Start Typing!
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Main UI Area */}
      <div className={"relative flex w-full flex-col items-center transition-all duration-500 " + (isFinished || !isUsernameSet ? "pointer-events-none blur-md opacity-40" : "")}>
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

          {inputWarning && (
            <div className="mb-2 rounded-lg border-2 border-slate-900 bg-[#ffe9a8] px-3 py-2 text-center text-xs font-black text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:text-sm">
              {inputWarning}
            </div>
          )}

          <div className="text-left leading-relaxed tracking-wide font-sans md:leading-loose text-slate-500 font-medium mb-0 select-none flex flex-col">
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
            <div className="relative z-0 hidden mb-4 mt-0.5 select-none break-words text-xl font-bold text-slate-400 opacity-40 blur-[0.5px] transition-all duration-700 pointer-events-none md:block lg:text-2xl">
              {nextSentence}
            </div>
          </div>
        </div>

        <div className="mt-4 hidden w-full overflow-x-auto pb-2 sm:block">
          <div className="w-max mx-auto flex justify-center">
            <Keyboard
              soundUrl="https://keyb.himan.me/sounds/sound.ogg"
                onKeyEvent={(e) => { if (e.phase === 'down' && e.source === 'pointer') handleVirtualKey(e.code); }}
                theme="classic"
                enableHaptics
                enableSound={!isFinished && isUsernameSet}
              />
            </div>
          </div>
        </div>

      {/* Split Results / Leaderboard Modal */}
      {isFinished && isUsernameSet && createPortal(
        <div className="fixed inset-0 z-[10000] overflow-y-auto bg-slate-900/60 p-3 sm:p-5 md:p-8">
          <div className="mx-auto flex min-h-full w-full items-start justify-center md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="relative my-4 flex w-full max-w-6xl flex-col gap-6 overflow-hidden rounded-[2rem] border-4 border-slate-900 bg-white p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] sm:my-6 sm:p-6 md:max-h-[calc(100dvh-5rem)] md:flex-row md:gap-8 md:p-8"
            >
              <button
                onClick={resetTest}
                aria-label="Close results"
                className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900 bg-[#baeef3] text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#B3F023] sm:right-4 sm:top-4"
              >
                <IconX className="h-5 w-5" stroke={2.4} />
              </button>

          {/* Left Side: Stats */}
          <div className="flex flex-1 flex-col justify-center overflow-y-auto pr-0 md:pr-2">
            <div className="mb-4 inline-block w-fit rounded-full border-2 border-slate-900 bg-[#baeef3] px-3 py-1 text-sm font-black text-slate-900">
              {username}'s Result
            </div>
            <h2 className="mb-6 flex items-center justify-start gap-3 text-2xl font-black text-slate-900 sm:text-3xl">
              <IconTarget className="w-8 h-8 text-slate-900" stroke={2.5} />
              Analytics
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-5 w-full">
              <div className="bg-[#B3F023] border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
                <div className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-1.5"><IconKeyboard className="w-4 h-4" /> WPM</div>
                <div className="text-5xl font-black text-slate-900 sm:text-6xl">{stats.wpm}</div>
              </div>
              <div className="bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
                <div className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-1.5"><IconTarget className="w-4 h-4" /> Accuracy</div>
                <div className="text-4xl font-black text-slate-900 sm:text-5xl">{stats.accuracy}<span className="text-3xl">%</span></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 w-full">
              <div className="bg-white border-2 border-slate-900 rounded-xl p-3 flex flex-col items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <span className="text-xs font-black text-slate-900 uppercase">Correct Words</span>
                <span className="text-3xl font-black text-slate-900">{stats.correctWords}</span>
              </div>
              <div className="bg-white border-2 border-slate-900 rounded-xl p-3 flex flex-col items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <span className="text-xs font-black text-slate-900 uppercase">Wrong Words</span>
                <span className="text-3xl font-black text-slate-900">{stats.wrongWords}</span>
              </div>
            </div>

            {/* Dynamic Status Message Based on Server Return */}
            {leaderboardMessage && (
              <div className={`mb-6 flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 p-4 font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] ${leaderboardMessage.includes('Top 10') ? 'bg-[#B3F023] text-green-900' : 'bg-[#ffe9a8] text-slate-900 ring-2 ring-amber-500/70'}`}>
                {leaderboardMessage.includes('Top 10') ? <IconTrophy /> : <IconAlertTriangle />}
                {leaderboardMessage}
              </div>
            )}

            <button onClick={resetTest} className="w-full bg-[#B3F023] hover:bg-[#a0d620] text-slate-900 font-black text-xl py-4 px-8 border-4 border-slate-900 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-2">
              <IconRefresh className="w-6 h-6" stroke={2.5}/>
              Try Again
            </button>

            <div className="mt-4 rounded-xl border-2 border-slate-900 bg-slate-50 p-4 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <p className="mb-2 text-sm font-bold text-slate-800">
                Want to learn Malayalam typing? Need help with key combinations?
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-typing-tutorial'))}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-900 bg-white px-3 py-1.5 text-sm font-black text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#B3F023] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[0px_0px_0px_rgba(0,0,0,1)]"
              >
                <IconKeyboard className="h-4 w-4 stroke-[2.5px]" />
                Show Tutorial
              </button>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden w-1 rounded-full bg-slate-900/10 md:block"></div>

          {/* Right Side: Leaderboard */}
          <div className="flex min-h-0 flex-1 flex-col pt-4 md:pt-0">
            <h2 className="mb-6 flex items-center justify-start gap-3 text-2xl font-black text-slate-900 sm:text-3xl">
              <div className="bg-[#B3F023] p-1.5 rounded-full border-2 border-slate-900">
                <IconTrophy className="w-6 h-6 text-slate-900" stroke={2.5} />
              </div>
              Top 10 Typers
            </h2>

            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent">
              {leaderboard.length === 0 ? (
                <div className="text-center text-slate-500 font-bold p-8">Loading scores...</div>
              ) : (
                leaderboard.map((entry, idx) => {
                  // Custom styling for Top 3
                  let rowClasses = "bg-white text-slate-900";
                  let rankClasses = "bg-slate-100 text-slate-500 border-transparent";
                  let rankBadge = "";

                  if (idx === 0) {
                    rowClasses = "bg-[#FFE066] relative z-10 shadow-[4px_4px_0px_rgba(0,0,0,1)]";
                    rankClasses = "bg-yellow-400 text-yellow-900 border-slate-900";
                    rankBadge = "Top";
                  } else if (idx === 1) {
                    rowClasses = "bg-zinc-200 shadow-[3px_3px_0px_rgba(0,0,0,1)]";
                    rankClasses = "bg-zinc-300 text-zinc-800 border-slate-900";
                    rankBadge = "2nd";
                  } else if (idx === 2) {
                    rowClasses = "bg-orange-200 shadow-[3px_3px_0px_rgba(0,0,0,1)]";
                    rankClasses = "bg-orange-300 text-orange-900 border-slate-900";
                    rankBadge = "3rd";
                  } else {
                    rowClasses = "border-slate-900 border-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] opacity-90";
                  }

                  return (
                    <div key={entry.id} className={`flex items-center justify-between p-3 border-2 border-slate-900 rounded-xl transition-all ${rowClasses}`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm border-2 ${rankClasses}`}>
                          #{idx + 1}
                        </span>
                        <span className="font-black text-lg flex items-center gap-2 truncate max-w-[170px]">
                          {entry.name}
                          {rankBadge && (
                            <span className="rounded border border-slate-900/20 bg-white/70 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-700">
                              {rankBadge}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="bg-[#baeef3] px-3 py-1 rounded-lg border-2 border-slate-900 font-black text-slate-900 flex items-center gap-1 shadow-sm">
                        {entry.wpm} <span className="text-[10px] uppercase font-bold text-slate-700">WPM</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

            </motion.div>
          </div>
        </div>
      , document.body)}
    </div>
  );
}
