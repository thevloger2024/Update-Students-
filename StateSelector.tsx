import React, { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

interface StateSelectorProps {
  selectedState: string | null;
  onSelectState: (state: string | null) => void;
}

export function StateSelector({ selectedState, onSelectState }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-academic-blue text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <span className="font-semibold text-base md:text-lg">
              {selectedState ? `State: ${selectedState}` : "Select Your State"}
            </span>
          </div>
          <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 z-50 max-h-80 overflow-y-auto"
            >
              <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                <button
                  onClick={() => {
                    onSelectState(null);
                    setIsOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-md transition-colors ${
                    selectedState === null ? 'bg-academic-blue/10 text-academic-blue font-semibold' : 'hover:bg-slate-100'
                  }`}
                >
                  All India (Central)
                </button>
                {STATES.map((state) => (
                  <button
                    key={state}
                    onClick={() => {
                      onSelectState(state);
                      setIsOpen(false);
                    }}
                    className={`text-left px-4 py-2 rounded-md transition-colors ${
                      selectedState === state ? 'bg-academic-blue/10 text-academic-blue font-semibold' : 'hover:bg-slate-100'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-center text-xs md:text-sm text-slate-500 mt-2 italic">
        Select your State for best updates in your state.
      </p>
    </div>
  );
}
