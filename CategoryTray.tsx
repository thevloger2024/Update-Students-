import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../contexts/utils';

const CATEGORIES = [
  "RRB", "SSC", "UPSC", "BPSC", "POLICE", "ARMY", "NAVI", "AGNEEVEER", "SSB", "NEET", "JEE"
];

interface CategoryTrayProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryTray({ selectedCategory, onSelectCategory }: CategoryTrayProps) {
  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-[100px] z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex overflow-x-auto py-3 gap-2 no-scrollbar scroll-smooth">
          <button
            onClick={() => onSelectCategory(null)}
            className={cn(
              "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200",
              selectedCategory === null 
                ? "bg-academic-blue text-white shadow-md" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            All Updates
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200",
                selectedCategory === cat 
                  ? "bg-academic-blue text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
