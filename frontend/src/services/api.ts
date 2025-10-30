import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  MoodEntry,
  MoodEntryRequest,
  MoodTrends,
  JournalEntry,
  JournalEntryRequest,
  AiChatRequest,
  AiChatResponse,
  AiReport,
  AiReportRequest,
  Goal,
  GoalRequest,
  GoalStatus,
} from '@/types';

// =========================================
// Axios Instance Configuration
// =========================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// =========================================
// Request Interceptor (Add JWT Token)
// =========================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =========================================
// Response Interceptor (Handle 401)
// =========================================

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);

          // Retry original request with new token
          originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// =========================================
// Auth API
// =========================================

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await api.post('/auth/logout', { refreshToken });
  },
};

// =========================================
// Mood API
// =========================================

export const moodApi = {
  getAll: async (): Promise<MoodEntry[]> => {
    const response = await api.get<MoodEntry[]>('/moods');
    return response.data;
  },

  getById: async (id: number): Promise<MoodEntry> => {
    const response = await api.get<MoodEntry>(`/moods/${id}`);
    return response.data;
  },

  create: async (data: MoodEntryRequest): Promise<MoodEntry> => {
    const response = await api.post<MoodEntry>('/moods', data);
    return response.data;
  },

  update: async (id: number, data: MoodEntryRequest): Promise<MoodEntry> => {
    const response = await api.put<MoodEntry>(`/moods/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/moods/${id}`);
  },

  getTrends: async (startDate?: string, endDate?: string): Promise<MoodTrends> => {
    // Default to last 30 days if no dates provided
    const end = endDate || new Date().toISOString();
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    
    const response = await api.get<MoodTrends>('/moods/trends', {
      params: { startDate: start, endDate: end }
    });
    return response.data;
  },
};

// =========================================
// Journal API
// =========================================

export const journalApi = {
  getAll: async (): Promise<JournalEntry[]> => {
    const response = await api.get<JournalEntry[]>('/journals');
    return response.data;
  },

  getById: async (id: number): Promise<JournalEntry> => {
    const response = await api.get<JournalEntry>(`/journals/${id}`);
    return response.data;
  },

  create: async (data: JournalEntryRequest): Promise<JournalEntry> => {
    const response = await api.post<JournalEntry>('/journals', data);
    return response.data;
  },

  update: async (id: number, data: JournalEntryRequest): Promise<JournalEntry> => {
    const response = await api.put<JournalEntry>(`/journals/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/journals/${id}`);
  },

  getFavorites: async (): Promise<JournalEntry[]> => {
    const response = await api.get<JournalEntry[]>('/journals/favorites');
    return response.data;
  },
};

// =========================================
// AI API
// =========================================

export const aiApi = {
  chat: async (data: AiChatRequest): Promise<AiChatResponse> => {
    const response = await api.post<AiChatResponse>('/ai/chat', data);
    return response.data;
  },

  generateReport: async (data: AiReportRequest): Promise<AiReport> => {
    const response = await api.post<AiReport>('/ai/reports', data);
    return response.data;
  },
};

// =========================================
// Reports API
// =========================================

export const reportsApi = {
  getAll: async (): Promise<AiReport[]> => {
    const response = await api.get<AiReport[]>('/reports');
    return response.data;
  },

  getById: async (id: number): Promise<AiReport> => {
    const response = await api.get<AiReport>(`/reports/${id}`);
    return response.data;
  },

  download: async (id: number): Promise<Blob> => {
    const response = await api.get(`/reports/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  getByType: async (reportType: string): Promise<AiReport[]> => {
    const response = await api.get<AiReport[]>(`/reports/type/${reportType}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/reports/${id}`);
  },
};

// =========================================
// Goals API
// =========================================

export const goalsApi = {
  getAll: async (): Promise<Goal[]> => {
    const response = await api.get<Goal[]>('/goals');
    return response.data;
  },

  getActive: async (): Promise<Goal[]> => {
    const response = await api.get<Goal[]>('/goals/active');
    return response.data;
  },

  getWithStreaks: async (): Promise<Goal[]> => {
    const response = await api.get<Goal[]>('/goals/streaks');
    return response.data;
  },

  countActive: async (): Promise<number> => {
    const response = await api.get<number>('/goals/count');
    return response.data;
  },

  create: async (data: GoalRequest): Promise<Goal> => {
    const response = await api.post<Goal>('/goals', data);
    return response.data;
  },

  recordProgress: async (goalId: number): Promise<Goal> => {
    const response = await api.post<Goal>(`/goals/${goalId}/progress`);
    return response.data;
  },

  updateStatus: async (goalId: number, status: GoalStatus): Promise<Goal> => {
    const response = await api.patch<Goal>(`/goals/${goalId}/status?status=${status}`);
    return response.data;
  },

  delete: async (goalId: number): Promise<void> => {
    await api.delete(`/goals/${goalId}`);
  },
};

// =========================================
// Service Aliases for cleaner imports
// =========================================

export const authService = authApi;
export const moodService = moodApi;
export const journalService = journalApi;
export const aiService = aiApi;
export const reportService = reportsApi;
export const goalService = goalsApi;

export default api;

