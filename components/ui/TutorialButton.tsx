"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Keyboard as KeyboardIcon } from 'lucide-react';
import { TypingTutorial } from './TypingTutorial';

// Global trigger so we can open it from anywhere
export const openTutorial = () => {
  window.dispatchEvent(new CustomEvent('open-typing-tutorial'));
};

export function TutorialButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-typing-tutorial', handleOpen);
    return () => window.removeEventListener('open-typing-tutorial', handleOpen);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 items-center gap-2 rounded-lg border-2 border-slate-900 bg-white px-3 text-sm font-bold text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#baeef3]"
        title="Typing Tutorial"
      >
        <KeyboardIcon className="h-4 w-4" strokeWidth={2.2} />
        <span>Tutorial</span>
      </button>

      {isMounted && isOpen ? createPortal(<TypingTutorial onClose={() => setIsOpen(false)} />, document.body) : null}
    </>
  );
}
