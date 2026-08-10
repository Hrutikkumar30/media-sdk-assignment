import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface MediaSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear?: () => void;
}

export function MediaSearch({ value, onChange, onSubmit, onClear }: MediaSearchProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <form id="search-form" onSubmit={onSubmit} className="relative group">
        {/* Glow backdrop effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
        
        <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl rounded-full shadow-2xl border border-slate-800 p-1.5 transition-all">
          <Search className="ml-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search high-res photos, videos, assets..."
            className="w-full pl-3 pr-24 py-3 bg-transparent text-white placeholder-slate-400 text-sm md:text-base font-medium focus:outline-none"
          />
          
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                onClear?.();
              }}
              className="p-1.5 mr-2 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-semibold rounded-full shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5 text-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
