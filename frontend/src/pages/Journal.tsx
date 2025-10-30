import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Star, 
  Trash2, 
  Edit3, 
  X, 
  Save,
  Heart,
  Calendar,
  Filter,
  SortDesc
} from 'lucide-react';
import { journalService } from '@/services/api';
import type { JournalEntry } from '@/types';
import toast from 'react-hot-toast';

// =========================================
// Journal Page Component
// =========================================

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Auto-save timer
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  // Filter entries based on search and favorites
  useEffect(() => {
    let filtered = entries;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query)
      );
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter(entry => entry.isFavorite);
    }

    setFilteredEntries(filtered);
  }, [entries, searchQuery, showFavoritesOnly]);

  const loadEntries = async () => {
    try {
      setIsLoading(true);
      const data = await journalService.getAll();
      setEntries(data);
    } catch (error: any) {
      toast.error('Failed to load journal entries');
      console.error('Load entries error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingEntry(null);
    setTitle('');
    setContent('');
    setIsFavorite(false);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsCreating(false);
    setTitle(entry.title);
    setContent(entry.content);
    setIsFavorite(entry.isFavorite);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingEntry(null);
    setTitle('');
    setContent('');
    setIsFavorite(false);
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    try {
      if (editingEntry) {
        // Update existing entry
        const updated = await journalService.update(editingEntry.id, {
          title: title.trim(),
          content: content.trim(),
          isFavorite
        });
        setEntries(prev => prev.map(e => e.id === updated.id ? updated : e));
        toast.success('Journal entry updated! ✅');
      } else {
        // Create new entry
        const created = await journalService.create({
          title: title.trim(),
          content: content.trim(),
          isFavorite
        });
        setEntries(prev => [created, ...prev]);
        toast.success('Journal entry created! 🎉');
      }
      
      handleCancel();
    } catch (error: any) {
      toast.error('Failed to save journal entry');
      console.error('Save entry error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this journal entry?')) {
      return;
    }

    try {
      await journalService.delete(id);
      setEntries(prev => prev.filter(e => e.id !== id));
      toast.success('Journal entry deleted');
    } catch (error: any) {
      toast.error('Failed to delete journal entry');
      console.error('Delete entry error:', error);
    }
  };

  const handleToggleFavorite = async (entry: JournalEntry) => {
    try {
      const updated = await journalService.update(entry.id, {
        ...entry,
        isFavorite: !entry.isFavorite
      });
      setEntries(prev => prev.map(e => e.id === updated.id ? updated : e));
      toast.success(updated.isFavorite ? 'Added to favorites ⭐' : 'Removed from favorites');
    } catch (error: any) {
      toast.error('Failed to update favorite status');
      console.error('Toggle favorite error:', error);
    }
  };

  // Auto-save functionality
  const handleContentChange = useCallback((value: string) => {
    setContent(value);

    // Clear existing timer
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

    // Set new timer for auto-save (3 seconds after typing stops)
    if (editingEntry && title.trim() && value.trim()) {
      const timer = setTimeout(async () => {
        try {
          await journalService.update(editingEntry.id, {
            title: title.trim(),
            content: value.trim(),
            isFavorite
          });
          toast.success('Auto-saved ✓', { duration: 1000 });
        } catch (error) {
          console.error('Auto-save error:', error);
        }
      }, 3000);
      
      setAutoSaveTimer(timer);
    }
  }, [editingEntry, title, isFavorite, autoSaveTimer]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-heading font-bold text-text-dark dark:text-white mb-2 flex items-center gap-3">
                <BookOpen className="w-10 h-10 text-accent-peach" />
                My Journal
              </h1>
              <p className="text-text-gray dark:text-gray-400">
                Express yourself freely with auto-save journaling
              </p>
            </div>
            
            <button
              onClick={handleCreate}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Entry
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-gray" />
              <input
                type="text"
                placeholder="Search journals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            {/* Favorites Filter */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`btn ${showFavoritesOnly ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
            >
              <Star className={`w-5 h-5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              Favorites
            </button>
          </div>
        </motion.div>

        {/* Create/Edit Form */}
        <AnimatePresence>
          {(isCreating || editingEntry) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-bold text-text-dark dark:text-white">
                    {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-text-gray" />
                  </button>
                </div>

                {/* Title Input */}
                <input
                  type="text"
                  placeholder="Entry title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input w-full mb-4 text-lg font-semibold"
                  autoFocus
                />

                {/* Content Textarea */}
                <textarea
                  placeholder="Write your thoughts..."
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="input w-full min-h-[300px] resize-y font-sans"
                  style={{ lineHeight: '1.6' }}
                />

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`btn btn-secondary flex items-center gap-2 ${isFavorite ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : ''}`}
                  >
                    <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Favorite' : 'Add to Favorites'}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Entry
                    </button>
                  </div>
                </div>

                {editingEntry && (
                  <p className="text-sm text-text-gray dark:text-gray-400 mt-2 text-right">
                    ✓ Auto-save enabled
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent-peach border-t-transparent"></div>
            <p className="mt-4 text-text-gray dark:text-gray-400">Loading journals...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-text-gray opacity-50" />
            <p className="text-xl text-text-gray dark:text-gray-400 mb-2">
              {searchQuery || showFavoritesOnly 
                ? 'No entries found' 
                : 'No journal entries yet'}
            </p>
            <p className="text-text-gray dark:text-gray-400 mb-6">
              {searchQuery || showFavoritesOnly 
                ? 'Try adjusting your search or filters' 
                : 'Start journaling to track your thoughts and feelings'}
            </p>
            {!searchQuery && !showFavoritesOnly && (
              <button
                onClick={handleCreate}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Your First Entry
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="card hover:shadow-lg transition-shadow cursor-pointer group relative"
                >
                  {/* Favorite Badge */}
                  {entry.isFavorite && (
                    <div className="absolute top-4 right-4">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                  )}

                  {/* Content */}
                  <div onClick={() => handleEdit(entry)}>
                    <h3 className="text-xl font-heading font-bold text-text-dark dark:text-white mb-2 pr-8">
                      {entry.title}
                    </h3>
                    
                    <p className="text-text-gray dark:text-gray-400 mb-4 line-clamp-3">
                      {entry.content}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-text-gray dark:text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(entry.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(entry);
                      }}
                      className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(entry);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        entry.isFavorite 
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-text-gray'
                      }`}
                      title={entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-5 h-5 ${entry.isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entry.id);
                      }}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Entry Count */}
        {!isLoading && entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-text-gray dark:text-gray-400"
          >
            <p>
              Showing {filteredEntries.length} of {entries.length} 
              {entries.length === 1 ? ' entry' : ' entries'}
              {showFavoritesOnly && ' (favorites only)'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Journal;
