import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// =========================================
// Date & Time Utilities
// =========================================

export const formatDate = (date: string | Date, format = 'MMMM DD, YYYY'): string => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('MMMM DD, YYYY [at] h:mm A');
};

export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

export const getTodayDate = (): string => {
  return dayjs().format('YYYY-MM-DD');
};

// =========================================
// String Utilities
// =========================================

export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

// =========================================
// Mood Utilities
// =========================================

export const getMoodEmoji = (mood: string): string => {
  const moodEmojis: Record<string, string> = {
    'Very Happy': '😄',
    'Happy': '😊',
    'Okay': '😐',
    'Sad': '😔',
    'Very Sad': '😢',
    'Anxious': '😰',
    'Angry': '😠',
    'Calm': '😌',
    'Excited': '🤩',
    'Tired': '😴',
    'Energetic': '⚡',
    'Stressed': '😫',
  };
  return moodEmojis[mood] || '😊';
};

export const getMoodColor = (moodScore: number): string => {
  if (moodScore >= 8) return 'bg-green-100 text-green-800';
  if (moodScore >= 6) return 'bg-blue-100 text-blue-800';
  if (moodScore >= 4) return 'bg-yellow-100 text-yellow-800';
  if (moodScore >= 2) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

export const getEnergyLevel = (level: number): string => {
  if (level >= 8) return 'Very High';
  if (level >= 6) return 'High';
  if (level >= 4) return 'Moderate';
  if (level >= 2) return 'Low';
  return 'Very Low';
};

export const getStressLevel = (level: number): string => {
  if (level >= 8) return 'Very High';
  if (level >= 6) return 'High';
  if (level >= 4) return 'Moderate';
  if (level >= 2) return 'Low';
  return 'Very Low';
};

// =========================================
// File Download Utilities
// =========================================

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// =========================================
// Local Storage Utilities
// =========================================

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// =========================================
// Validation Utilities
// =========================================

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters
  return password.length >= 8;
};

// =========================================
// Class Name Utilities
// =========================================

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// =========================================
// Debounce Utility
// =========================================

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// =========================================
// Copy to Clipboard
// =========================================

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

