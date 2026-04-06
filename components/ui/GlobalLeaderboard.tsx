"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { IconTrophy, IconX } from "@tabler/icons-react";
import { getLeaderboard, LeaderboardEntry } from "@/app/actions/leaderboard";

export default function GlobalLeaderboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    getLeaderboard()
      .then((data) => setLeaderboard(data))
      .finally(() => setIsLoading(false));
  }, [isOpen]);

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[9999] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-3xl border-4 border-slate-900 bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] max-h-[88dvh]"
          >
            <div className="relative shrink-0 border-b-2 border-slate-900/10 bg-white px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full border-2 border-slate-900 bg-[#baeef3] p-1.5 text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform hover:scale-110 hover:bg-[#B3F023] hover:shadow-none"
              >
                <IconX className="h-5 w-5" stroke={3} />
              </button>

              <div className="flex flex-col items-center">
                <div className="mb-4 -rotate-3 rounded-2xl border-4 border-slate-900 bg-[#B3F023] p-3 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <IconTrophy className="h-8 w-8 text-slate-900" stroke={2.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Hall of Fame</h2>
                <p className="mt-1 text-sm font-bold text-slate-500">Top 10 Fastest Typers</p>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
              <div className="flex flex-col gap-3">
                {isLoading && (
                  <div className="animate-pulse py-10 text-center font-bold text-slate-500">Fetching scores...</div>
                )}

                {!isLoading && leaderboard.length === 0 && (
                  <div className="py-10 text-center font-bold text-slate-500">No scores yet. Be the first!</div>
                )}

                {!isLoading && leaderboard.map((entry, idx) => {
                  let rowClasses = "bg-white text-slate-900 border-slate-900 border-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]";
                  let rankClasses = "bg-slate-100 text-slate-500 border-transparent";
                  let crown = "";

                  if (idx === 0) {
                    rowClasses = "bg-[#FFE066] text-slate-900 border-slate-900 border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]";
                    rankClasses = "bg-yellow-400 text-yellow-900 border-slate-900";
                    crown = "👑";
                  } else if (idx === 1) {
                    rowClasses = "bg-zinc-200 text-slate-900 border-slate-900 border-2 shadow-[3px_3px_0px_rgba(0,0,0,1)]";
                    rankClasses = "bg-zinc-300 text-zinc-800 border-slate-900";
                    crown = "🥈";
                  } else if (idx === 2) {
                    rowClasses = "bg-orange-200 text-slate-900 border-slate-900 border-2 shadow-[3px_3px_0px_rgba(0,0,0,1)]";
                    rankClasses = "bg-orange-300 text-orange-900 border-slate-900";
                    crown = "🥉";
                  }

                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between rounded-xl p-3 transition-all hover:translate-x-1 ${rowClasses}`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-black ${rankClasses}`}>
                          #{idx + 1}
                        </span>
                        <span className="flex max-w-[150px] items-center gap-2 truncate text-lg font-black sm:max-w-xs">
                          {entry.name}
                          {crown && <span className="inline-block text-xl drop-shadow-sm">{crown}</span>}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 rounded-lg border-2 border-slate-900 bg-[#baeef3] px-3 py-1 font-black text-slate-900 shadow-sm">
                        {entry.wpm}
                        <span className="text-[10px] font-bold uppercase text-slate-700">WPM</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full border-2 border-slate-900 bg-[#baeef3] px-3 py-1.5 text-sm font-bold text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <IconTrophy className="h-5 w-5" stroke={2} />
        <span className="hidden sm:inline">Leaderboard</span>
      </button>

      {isMounted ? createPortal(modal, document.body) : null}
    </>
  );
}
