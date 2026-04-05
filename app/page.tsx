import TypingArea from "@/components/typing/TypingArea";
import { IconKeyboard, IconBrandInstagram, IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconCloud } from '@tabler/icons-react';
import SupportButton from "@/components/ui/SupportButton";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#baeef3] selection:bg-[#B3F023]/50 text-slate-900 font-sans">
      <div className="sm:hidden relative min-h-[100dvh] w-full px-4 py-8 flex flex-col items-center justify-center overflow-hidden">
        {/* Background static clouds for mobile */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <IconCloud className="absolute top-12 -left-4 w-24 h-24 text-white/50" fill="currentColor" stroke={0} />
          <IconCloud className="absolute top-1/4 -right-8 w-32 h-32 text-white/60" fill="currentColor" stroke={0} />
          <IconCloud className="absolute bottom-1/3 left-4 w-28 h-28 text-white/40" fill="currentColor" stroke={0} />
          <IconCloud className="absolute bottom-12 -right-2 w-20 h-20 text-white/50" fill="currentColor" stroke={0} />
        </div>

        <div className="relative z-10 w-full max-w-sm rounded-3xl border-2 border-slate-900 bg-white p-6 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="bg-[#B3F023] p-1.5 rounded-full border-2 border-neutral-900">
              <IconKeyboard className="w-5 h-5" stroke={2} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-neutral-900 border-b-4 border-[#B3F023] leading-none pb-0.5">
              mallu<span className="text-neutral-500 font-extrabold">key</span>
            </span>
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900">Desktop Recommended</h1>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              mallukey is optimized for bigger screens. Please open this website on a desktop or laptop for the best typing experience.
            </p>
          </div>

          <div className="w-full pt-4 mt-2 border-t-2 border-slate-900/5 text-sm font-bold text-slate-900">
            Created by <a href="https://instagram.com/zoxilsi" target="_blank" rel="noreferrer" className="ml-1 inline-block bg-[#B3F023] px-2 py-0.5 border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-[-2deg] rounded-md font-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:rotate-0 transition-all text-slate-900">zoxilsi</a>
          </div>
        </div>
      </div>

      <div className="relative hidden min-h-[100dvh] sm:block">
      {/* Background static clouds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <IconCloud className="absolute top-10 left-10 w-48 h-48 text-white/50" fill="currentColor" stroke={0} />
        <IconCloud className="absolute top-32 right-20 w-64 h-64 text-white/50" fill="currentColor" stroke={0} />
        <IconCloud className="absolute bottom-20 left-1/4 w-72 h-72 text-white/40" fill="currentColor" stroke={0} />
        <IconCloud className="absolute -left-10 top-1/2 w-40 h-40 text-white/40" fill="currentColor" stroke={0} />
        <IconCloud className="absolute top-1/2 right-1/3 w-32 h-32 text-white/30" fill="currentColor" stroke={0} />
        <IconCloud className="absolute bottom-1/4 right-10 w-56 h-56 text-white/50" fill="currentColor" stroke={0} />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col justify-between px-4 py-4 md:py-6 lg:py-8">
        {/* Clean Header */}
        <header className="relative z-20 mx-auto flex w-full flex-col items-center justify-between gap-3 rounded-[2rem] border-2 border-neutral-900 bg-white/95 px-4 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] backdrop-blur-sm md:flex-row md:gap-0 md:px-6">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="bg-[#B3F023] p-1.5 rounded-full border-2 border-neutral-900">
              <IconKeyboard className="w-5 h-5" stroke={2} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-neutral-900 border-b-4 border-[#B3F023] leading-none pb-0.5">
              mallu<span className="text-neutral-500 font-extrabold">key</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/zoxilsi" target="_blank" rel="noreferrer" className="bg-[#B3F023] p-2 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-slate-900">
              <IconBrandInstagram className="w-5 h-5" stroke={2}/>
            </a>
            <a href="https://github.com/zoxilsi/mallu-keyboard" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 bg-white text-slate-900 px-3 py-1.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-slate-900 font-bold text-sm">
              <IconBrandGithub className="w-5 h-5" stroke={2} />
              Star
            </a>
          </div>
        </header>

        {/* Hero Section / Typing Test */}
        <div className="relative z-10 mx-auto flex w-full flex-1 flex-col justify-center py-6 md:py-8">
          <div className="w-full rounded-[2rem] border-2 border-slate-900/10 bg-white/60 p-3 shadow-sm backdrop-blur-md sm:p-6 lg:p-8">
            <TypingArea />
          </div>
        </div>

        {/* Clean Footer */}
        <footer className="relative z-10 mx-auto flex w-full flex-col items-center justify-center gap-3 pt-2 text-slate-900">
          <div className="flex w-fit flex-col items-center gap-4 rounded-3xl border-2 border-slate-900/10 bg-white/60 px-4 py-4 backdrop-blur-sm shadow-sm sm:flex-row sm:gap-6 sm:px-8">
            <div className="flex items-center text-lg font-bold text-slate-900">
              Created by <a href="https://instagram.com/zoxilsi" target="_blank" rel="noreferrer" className="ml-2 inline-block bg-[#B3F023] px-3 py-1 border-2 border-slate-900 shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[-2deg] rounded-md font-black hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:rotate-0 transition-all text-slate-900">zoxilsi</a>
            </div>
            
            <div className="h-1 w-12 md:h-8 md:w-1 bg-slate-900/10 rounded-full"></div>
            
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/zoxilsi" target="_blank" rel="noreferrer" className="bg-white p-2.5 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-[#baeef3] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-slate-900 group">
                <IconBrandTwitter className="w-5 h-5 group-hover:scale-110 transition-transform" stroke={2}/>
              </a>
              <a href="https://linkedin.com/in/zoxilsi" target="_blank" rel="noreferrer" className="bg-white p-2.5 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-[#baeef3] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-slate-900 group">
                <IconBrandLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" stroke={2}/>
              </a>
              <a href="https://instagram.com/zoxilsi" target="_blank" rel="noreferrer" className="bg-white p-2.5 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-[#baeef3] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-slate-900 group">
                <IconBrandInstagram className="w-5 h-5 group-hover:scale-110 transition-transform" stroke={2}/>
              </a>
            </div>
          </div>
          
          <span className="rounded-md bg-white/60 px-2 py-1 font-mono text-xs font-bold text-slate-500">v1.1.0</span>
        </footer>
      </div>

      <SupportButton />
      </div>
    </main>
  );
}
