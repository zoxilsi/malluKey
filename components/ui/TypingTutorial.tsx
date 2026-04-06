import React, { useEffect } from 'react';
import { X, Keyboard as KeyboardIcon } from 'lucide-react';

interface TypingTutorialProps {
  onClose: () => void;
}

const RealisticKey = ({ children, main, shift, className = "min-w-[40px] h-10 px-2" }: { children?: React.ReactNode, main?: string, shift?: string, className?: string }) => (
  <kbd className={`mx-1 inline-flex flex-col items-center justify-center rounded-md border-2 border-slate-900 bg-white font-black text-slate-900 shadow-[2px_3px_0px_rgba(0,0,0,1)] relative ${className} align-middle`}>
    {shift && <span className="text-[10px] absolute top-0.5 left-1.5 text-slate-500 font-bold">{shift}</span>}
    {main && <span className="text-base font-bold absolute bottom-0.5 right-1.5">{main}</span>}
    {children}
  </kbd>
);

export function TypingTutorial({ onClose }: TypingTutorialProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[10000] grid place-items-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 flex w-[min(96vw,960px)] max-h-[90dvh] flex-col overflow-hidden rounded-2xl border-4 border-slate-900 bg-[#baeef3] shadow-[8px_8px_0px_rgba(0,0,0,1)] font-sans">
        {/* Header */}
        <div className="shrink-0 border-b-4 border-slate-900 bg-[#baeef3] p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="rounded-lg border-2 border-slate-900 bg-[#B3F023] p-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <KeyboardIcon className="h-5 w-5" strokeWidth={2.4} />
            </div>
            <h2 className="text-lg font-black tracking-tight md:text-xl">Malayalam Typing Tutorial</h2>
          </div>
          <button
            onClick={onClose}
            title="Close"
            className="flex items-center justify-center rounded-md border-2 border-slate-900 bg-white p-2 text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors hover:bg-slate-100"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Simple guide: start with letters, then join sounds, then practice short words.
          </p>
        </div>

        {/* Content area: Scrollable */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-[#baeef3] p-4 md:p-6">

          <div className="rounded-xl border-2 border-slate-900 bg-white p-4 text-sm font-semibold leading-relaxed text-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            In this keyboard, each English key maps to Malayalam. Usually:
            normal key gives one character, and Shift + key gives another form.
          </div>

          {/* Section 1 */}
          <section className="space-y-3 rounded-xl border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="text-base font-black text-slate-900 md:text-lg">
              Step 1: Type basic consonants
            </h3>
            <p className="text-sm font-semibold text-slate-700">
              Start by typing a single key. Example consonants:
            </p>
            <div className="space-y-2 text-sm font-bold text-slate-900">
              <div className="flex items-center gap-2">
                <RealisticKey main="k" shift="ക" />
                <span>k = ക</span>
              </div>
              <div className="flex items-center gap-2">
                <RealisticKey main="h" shift="പ" />
                <span>h = പ</span>
              </div>
              <div className="flex items-center gap-2">
                <RealisticKey main="j" shift="ര" />
                <span>j = ര</span>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 rounded-xl border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="text-base font-black text-slate-900 md:text-lg">
              Step 2: Learn vowel sign vs vowel letter
            </h3>
            <p className="text-sm font-semibold text-slate-700">
              Normal key often gives a vowel sign. Shift + same key gives full vowel letter.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border-2 border-slate-900 bg-slate-50 p-3 text-sm font-bold">
                <div className="mb-2 text-slate-700">Normal key</div>
                <div className="flex items-center justify-between">
                  <span>
                    <RealisticKey main="e" shift="ാ" />
                    = sign
                  </span>
                  <span className="text-xl">ാ</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>
                    <RealisticKey main="f" shift="ി" />
                    = sign
                  </span>
                  <span className="text-xl">ി</span>
                </div>
              </div>
              <div className="rounded-lg border-2 border-slate-900 bg-[#B3F023] p-3 text-sm font-bold text-slate-900">
                <div className="mb-2">Shift + key</div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center">
                    <RealisticKey className="w-fit px-2">Shift</RealisticKey>
                    +
                    <RealisticKey main="e" shift="ാ" />
                  </span>
                  <span className="text-xl">ആ</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="inline-flex items-center">
                    <RealisticKey className="w-fit px-2">Shift</RealisticKey>
                    +
                    <RealisticKey main="f" shift="ി" />
                  </span>
                  <span className="text-xl">ഇ</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 rounded-xl border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="text-base font-black text-slate-900 md:text-lg">
              Step 3: Join letters using the linker key
            </h3>
            <p className="text-sm font-semibold text-slate-700">
              Use the linker key <RealisticKey main="d" shift="്" /> between letters.
            </p>
            <div className="space-y-2 text-sm font-bold text-slate-900">
              <div className="flex flex-wrap items-center gap-2">
                <RealisticKey main="k" shift="ക" /> + <RealisticKey main="d" shift="്" /> + <RealisticKey main="k" shift="ക" /> = ക്ക
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <RealisticKey main="h" shift="പ" /> + <RealisticKey main="d" shift="്" /> + <RealisticKey main="j" shift="ര" /> = പ്ര
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <RealisticKey main=";" shift="ച" /> + <RealisticKey main="d" shift="്" /> + <RealisticKey main=";" shift="ച" /> = ച്ച
              </div>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="text-base font-black text-slate-900 md:text-lg">
              Step 4: Chillu letters (end sound letters)
            </h3>
            <div className="grid gap-2 text-sm font-bold text-slate-900 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-md border border-slate-300 bg-slate-50 px-3 py-2">ൻ <span><RealisticKey className="w-fit px-2">Shift</RealisticKey> + <RealisticKey main="v" shift="ന" /></span></div>
              <div className="flex items-center justify-between rounded-md border border-slate-300 bg-slate-50 px-3 py-2">ർ <span><RealisticKey className="w-fit px-2">Shift</RealisticKey> + <RealisticKey main="j" shift="ര" /></span></div>
              <div className="flex items-center justify-between rounded-md border border-slate-300 bg-slate-50 px-3 py-2">ൽ <span><RealisticKey className="w-fit px-2">Shift</RealisticKey> + <RealisticKey main="n" shift="ല" /></span></div>
              <div className="flex items-center justify-between rounded-md border border-slate-300 bg-slate-50 px-3 py-2">ൾ <span><RealisticKey className="w-fit px-2">Shift</RealisticKey> + <RealisticKey main="m" shift="സ" /></span></div>
            </div>
          </section>

          <section className="rounded-xl border-2 border-slate-900 bg-[#B3F023] p-4 text-sm font-bold text-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            Practice tip: type slowly first. Accuracy first, speed later.
          </section>

        </div>
      </div>
    </div>
  );
}
