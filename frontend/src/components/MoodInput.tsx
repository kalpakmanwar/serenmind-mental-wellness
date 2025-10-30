import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

// =========================================
// Mood Input Component (Extracted for Testing)
// =========================================

interface MoodInputProps {
  onSubmit: (data: {
    moodScore: number;
    energyLevel: number;
    stressLevel: number;
    notes: string;
  }) => void;
  isLoading?: boolean;
}

const MOOD_EMOJIS = [
  { emoji: '😢', label: 'Very Sad', value: 2 },
  { emoji: '😐', label: 'Neutral', value: 5 },
  { emoji: '😊', label: 'Happy', value: 7 },
  { emoji: '😄', label: 'Very Happy', value: 9 },
  { emoji: '🤩', label: 'Excellent', value: 10 },
];

export const MoodInput: React.FC<MoodInputProps> = ({ onSubmit, isLoading = false }) => {
  const [selectedMood, setSelectedMood] = useState<number>(5);
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) return;

    onSubmit({
      moodScore: selectedMood,
      energyLevel,
      stressLevel,
      notes: notes.trim(),
    });

    // Reset form
    setSelectedMood(5);
    setEnergyLevel(5);
    setStressLevel(5);
    setNotes('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
      onSubmit={handleSubmit}
      data-testid="mood-input-form"
    >
      <h2 className="text-2xl font-heading font-bold text-text-dark dark:text-white mb-4">
        How are you feeling today?
      </h2>

      {/* Emoji Mood Selector */}
      <div className="mb-6">
        <label className="label">Select your mood</label>
        <div className="flex gap-2 flex-wrap" role="group" aria-label="Mood selection">
          {MOOD_EMOJIS.map((mood) => (
            <button
              key={mood.value}
              type="button"
              onClick={() => setSelectedMood(mood.value)}
              className={`text-4xl p-3 rounded-2xl transition-all duration-300 ${
                selectedMood === mood.value
                  ? 'bg-accent-peach scale-110 shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 hover:scale-105'
              }`}
              aria-label={mood.label}
              aria-pressed={selectedMood === mood.value}
              data-testid={`mood-${mood.value}`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Energy Level Slider */}
      <div className="mb-6">
        <label htmlFor="energy-level" className="label">
          Energy Level: {energyLevel}/10
        </label>
        <input
          id="energy-level"
          type="range"
          min="1"
          max="10"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-sage"
          aria-label="Energy level slider"
          data-testid="energy-slider"
        />
      </div>

      {/* Stress Level Slider */}
      <div className="mb-6">
        <label htmlFor="stress-level" className="label">
          Stress Level: {stressLevel}/10
        </label>
        <input
          id="stress-level"
          type="range"
          min="1"
          max="10"
          value={stressLevel}
          onChange={(e) => setStressLevel(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-peach"
          aria-label="Stress level slider"
          data-testid="stress-slider"
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label htmlFor="mood-notes" className="label">
          Notes (optional)
        </label>
        <textarea
          id="mood-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How are you feeling? Any specific thoughts?"
          rows={3}
          className="textarea"
          aria-label="Mood notes"
          data-testid="mood-notes"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full flex items-center justify-center gap-2"
        aria-label="Save mood entry"
        data-testid="submit-mood"
      >
        {isLoading ? (
          <>
            <div className="spinner w-5 h-5" />
            Saving...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Save Mood Entry
          </>
        )}
      </button>
    </motion.form>
  );
};

