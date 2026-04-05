"use client";

import { useState } from "react";
import { IconHeart, IconX } from "@tabler/icons-react";

export default function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleBmcClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // The widget injects a div with id bmc-wbtn
    const bmcWidget = document.getElementById('bmc-wbtn') || document.querySelector('div[style*="z-index: 2147483647"] iframe');
    if (bmcWidget) {
      bmcWidget.click();
      setIsOpen(false);
    } else {
      // Fallback try to click the iframe wrapper or just alert
      alert("Please wait for the Buy Me a Coffee widget to load in the bottom right!");
    }
  };

  return (
    <div className="fixed bottom-4 right-3 z-50 flex flex-col items-end gap-3 font-sans sm:bottom-6 sm:right-6">
      {isOpen && (
        <div className="w-[min(19rem,calc(100vw-1.5rem))] origin-bottom-right animate-in zoom-in-95 rounded-2xl border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div className="relative mb-3 flex items-center justify-center border-b border-slate-900/15 pb-2">
            <h3 className="flex items-center gap-2 text-xl font-black text-slate-900">
              <IconHeart className="h-5 w-5 text-[#7ab800]" fill="currentColor" stroke={2.2} />
              Support
            </h3>
            <button onClick={() => setIsOpen(false)} className="absolute right-0 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full p-1 transition-colors">
              <IconX stroke={2} className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            <p className="mb-1 text-center text-xs font-semibold text-slate-600">Your support helps me build better Malayalam typing tools.</p>
            
            <div className="rounded-xl border-2 border-slate-900 bg-[#f6fff0] p-2 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              <p className="mb-2 text-center text-xs font-black uppercase tracking-wider text-slate-900">UPI Support</p>
              <div className="flex flex-col items-center rounded-lg border border-slate-900/15 bg-white p-2">
              <img src="/upi-qr.png" alt="UPI QR" className="w-40 h-40 object-contain rounded-lg" />
                <p className="mt-2 rounded bg-[#baeef3] px-2 py-1 text-xs font-bold text-slate-900">Scan with any UPI app</p>
              </div>
            </div>

            <div className="flex items-center gap-2 py-0.5">
              <span className="h-px flex-1 bg-slate-900/20"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">or</span>
              <span className="h-px flex-1 bg-slate-900/20"></span>
            </div>

            <button onClick={handleBmcClick} className="mt-0.5 flex w-full justify-center rounded-xl border-2 border-slate-900 bg-[#B3F023]/35 p-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform hover:scale-[1.02] active:scale-95">
              <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=hizoxilsij&button_colour=FFDD00&font_color=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy me a coffee" className="h-12" />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border-2 border-slate-900 bg-white/95 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#eafad3] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none sm:px-5 sm:py-3 sm:text-base"
      >
        <IconHeart className="h-4 w-4 text-[#7ab800]" fill="currentColor" stroke={2} />
        Support
      </button>
    </div>
  );
}
