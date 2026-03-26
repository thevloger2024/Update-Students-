import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, LogIn, LogOut, User, Search, X, Bookmark, MessageSquarePlus, Bell, Shield, Settings } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, signInWithGoogle, logOut } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { FeedbackModal } from './FeedbackModal';

const ADMIN_EMAIL = "thevloger2024@gmail.com";

const TYPING_WORDS = [
  "RRB", "SSC", "UPSC", "BPSC", "QUIZ", "LATEST JOBS", 
  "LATEST NEWS", "SCHOLARSHIPS", "ADMIT CARD", "RESULT NEET", "JEE"
];

export function Header() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }
  }, [location.search]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const currentWord = TYPING_WORDS[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        }
      }
    }, isDeleting ? 50 : 100); // Typing speed vs deleting speed

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  return (
    <header className="w-full bg-white shadow-sm pt-4 pb-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <Link to="/" className="flex items-center gap-2 text-academic-blue shrink-0">
            <GraduationCap size={32} strokeWidth={1.5} />
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
              Update Students
            </span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search jobs, admit cards, results..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-10 text-sm focus:ring-2 focus:ring-academic-blue transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-academic-blue transition-colors" size={18} />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>
          
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => setIsFeedbackOpen(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-academic-blue transition-colors"
              title="Give Feedback"
            >
              <MessageSquarePlus size={18} />
              <span className="hidden sm:inline">Feedback</span>
            </button>
            {user && (
              <Link 
                to="/saved" 
                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-academic-blue transition-colors"
                title="Saved Updates"
              >
                <Bookmark size={18} />
                <span className="hidden sm:inline">Saved</span>
              </Link>
            )}
            {user && (
              <Link 
                to="/notifications" 
                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-academic-blue transition-colors"
                title="Notification Settings"
              >
                <Bell size={18} />
                <span className="hidden sm:inline">Alerts</span>
              </Link>
            )}
            {user?.email === ADMIN_EMAIL && (
              <div className="flex items-center gap-2">
                <Link 
                  to="/admin" 
                  className="flex items-center gap-1.5 text-sm font-medium text-academic-blue hover:text-blue-800 transition-colors"
                  title="Admin Dashboard"
                >
                  <Shield size={18} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
                <Link 
                  to="/admin/features" 
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-academic-blue transition-colors"
                  title="Admin Features"
                >
                  <Settings size={18} />
                  <span className="hidden sm:inline">Features</span>
                </Link>
              </div>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200" referrerPolicy="no-referrer" loading="lazy" />
                  ) : (
                    <User size={20} />
                  )}
                  <span className="font-medium">{user.displayName}</span>
                </div>
                <button 
                  onClick={logOut}
                  className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="flex items-center gap-2 text-sm font-medium text-white bg-academic-blue px-4 py-2 rounded-full hover:bg-blue-800 transition-colors shadow-sm"
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
        
        <hr className="border-t-2 border-academic-blue/20 w-full" />
        
        <div className="h-6 mt-2 flex items-center justify-center">
          <span className="text-sm md:text-base font-medium text-slate-400 tracking-wider uppercase">
            {displayText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[2px] h-4 bg-slate-400 ml-1 align-middle"
            />
          </span>
        </div>
        
        <hr className="border-t-2 border-academic-blue/20 w-full mt-2" />
      </div>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </header>
  );
}

