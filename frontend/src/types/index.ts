// =========================================
// Type Definitions for SerenMind
// =========================================

export interface Goal {
  id: number;
  title: string;
  description?: string;
  type: GoalType;
  targetCount: number;
  period: GoalPeriod;
  currentProgress: number;
  currentStreak: number;
  longestStreak: number;
  startDate: string;
  lastCompletionDate?: string;
  status: GoalStatus;
  completionDates: string[];
  createdAt: string;
  updatedAt: string;
  isCompletedToday: boolean;
  progressPercentage: number;
  daysUntilReset?: number;
}

export enum GoalType {
  MOOD_TRACKING = 'MOOD_TRACKING',
  JOURNALING = 'JOURNALING',
  AI_CHAT = 'AI_CHAT',
  CUSTOM = 'CUSTOM'
}

export enum GoalPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

export enum GoalStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
  ARCHIVED = 'ARCHIVED'
}

export interface GoalRequest {
  title: string;
  description?: string;
  type: GoalType;
  targetCount: number;
  period: GoalPeriod;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  timezone?: string;
}

export interface MoodEntry {
  id: number;
  date: string;
  mood: string;
  moodScore: number;
  energyLevel: number;
  stressLevel: number;
  notes?: string;
  createdAt: string;
}

export interface MoodEntryRequest {
  timestamp?: string; // ISO string, optional (defaults to now on backend)
  moodScore: number;
  energyLevel: number;
  stressLevel: number;
  notes?: string;
  activities?: string;
}

export interface MoodTrends {
  dates: string[];
  moodScores: number[];
  energyLevels: number[];
  stressLevels: number[];
  summary: {
    averageMood: number;
    averageEnergy: number;
    averageStress: number;
    totalEntries: number;
  };
}

export interface JournalEntry {
  id: number;
  title: string;
  content: string;
  tags?: string;
  isFavorite: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntryRequest {
  title: string;
  content: string;
  tags?: string;
  isFavorite?: boolean;
  isPrivate?: boolean;
}

export interface AiChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AiChatRequest {
  message: string;
  includeContext?: boolean;
}

export interface AiChatResponse {
  reply: string;
  summary?: string;
  suggestions?: string[];
}

export interface AiReport {
  id: number;
  reportType: string;
  content: string;
  summary: string;
  tokensUsed: number;
  modelUsed: string;
  isMockResponse: boolean;
  createdAt: string;
}

export interface AiReportRequest {
  reportType: 'WEEKLY_SUMMARY' | 'MOOD_ANALYSIS' | 'JOURNAL_INSIGHTS' | 'MONTHLY_REPORT';
  startDate?: string;
  endDate?: string;
}

export type Theme = 'light' | 'dark';

export interface UserPreferences {
  theme: Theme;
  notifications: boolean;
  emailUpdates: boolean;
}

