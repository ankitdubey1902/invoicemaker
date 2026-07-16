import React from 'react';
import { ReceiptText, Sun, Moon, Sparkles } from 'lucide-react';

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80 transition-colors duration-200 print:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20 dark:shadow-indigo-500/10">
            <ReceiptText className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Invoice<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">Maker</span>
              </h1>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-950/40 dark:text-indigo-400 dark:ring-indigo-400/20">
                Pro
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Create professional, pixel-perfect invoices instantly
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400 md:flex">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Interactive Auto-Save</span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white cursor-pointer"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="h-5 w-5 transition-transform group-hover:-rotate-12" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
