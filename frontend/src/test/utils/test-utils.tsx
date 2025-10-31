import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

// =========================================
// Custom Render with Providers
// =========================================

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = ({ children }: AllProvidersProps) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// =========================================
// Mock Helpers
// =========================================

export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach(key => delete store[key]);
    },
  };
};

export const mockAuthUser = () => ({
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  createdAt: new Date().toISOString(),
});

export const mockMoodEntry = () => ({
  id: 1,
  userId: 1,
  date: new Date().toISOString(),
  moodScore: 7,
  energyLevel: 8,
  stressLevel: 4,
  notes: 'Feeling good today!',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const mockAiChatResponse = () => ({
  reply: "That's great to hear you're feeling good!",
  summary: 'User is feeling positive',
  suggestions: [
    'Tell me more about your day',
    'What made you feel good?',
    'Any challenges today?',
  ],
});

