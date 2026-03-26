import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../contexts/utils';
import { Bookmark, Share2 } from 'lucide-react';
import { useBookmarkContext } from '../contexts/BookmarkContext';

export interface UpdateData {
  id: string;
  title: string;
  type: 'job' | 'admit_card' | 'result';
  category: string;
  state: string;
  startDate?: string;
  endDate?: string;
  updateDate?: string;
  releaseDate?: string;
  organization: string;
  posts?: number;
  description: string;
  ageLimit?: string;
  officialUrl?: string;
  createdAt: number;
}

interface UpdateCardProps {
  update: UpdateData;
}

export const UpdateCard: React.FC<UpdateCardProps> = ({ update }) => {
  const { bookmarks, toggleBookmark, isAuthenticated } = useBookmarkContext();
  const isBookmarked = bookmarks[update.id];

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(update);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareData = {
      title: update.title,
      text: `Check out this update: ${update.title} from ${update.organization}`,
      url: `${window.location.origin}/update/${update.id}`,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-[140px] relative group"
    >
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
        {isAuthenticated && (
          <button
            onClick={handleBookmark}
            className={cn(
              "p-1.5 rounded-full transition-all duration-200",
              isBookmarked 
                ? "text-academic-gold bg-yellow-50 shadow-sm" 
                : "text-slate-300 hover:text-academic-gold hover:bg-slate-50 opacity-0 group-hover:opacity-100"
            )}
            title={isBookmarked ? "Remove Bookmark" : "Save Update"}
          >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        )}
        
        <button
          onClick={handleShare}
          className="p-1.5 rounded-full text-slate-300 hover:text-academic-blue hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
          title="Share Update"
        >
          <Share2 size={16} />
        </button>
      </div>
      
      <Link to={`/update/${update.id}`} className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-blue-600 font-semibold text-sm md:text-base line-clamp-2 leading-tight pr-6">
            {update.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {update.organization} {update.posts ? `| ${update.posts} Posts` : ''}
          </p>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100">
          {update.type === 'job' ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] md:text-xs font-medium text-red-600">
              {update.startDate && <span>Start: {update.startDate}</span>}
              {update.endDate && <span>End: {update.endDate}</span>}
              {update.updateDate && <span>Last Updated: {update.updateDate}</span>}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] md:text-xs font-medium text-red-600">
              {update.releaseDate && <span>Released: {update.releaseDate}</span>}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
