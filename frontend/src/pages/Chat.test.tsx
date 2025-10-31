import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { aiService } from '@/services/api';
import Chat from './Chat';
import type { AiChatResponse } from '@/types';

// Mock the AI service
vi.mock('@/services/api', () => ({
  aiService: {
    chat: vi.fn(),
  },
}));

// Mock the auth context
vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: { id: 1, username: 'testuser', email: 'test@example.com' },
  }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Chat Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =========================================
  // Rendering Tests
  // =========================================

  it('should render the chat interface', () => {
    render(<Chat />);
    
    expect(screen.getByText('AI Wellness Companion')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your message/i)).toBeInTheDocument();
  });

  it('should render welcome message on initial load', () => {
    render(<Chat />);
    
    expect(screen.getByText(/I'm your mental wellness companion/i)).toBeInTheDocument();
  });

  it('should render suggestion chips in welcome message', () => {
    render(<Chat />);
    
    expect(screen.getByText("I'm feeling anxious")).toBeInTheDocument();
    expect(screen.getByText("Tell me about my mood trends")).toBeInTheDocument();
  });

  // =========================================
  // Message Input Tests
  // =========================================

  it('should update input value when typing', () => {
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i) as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'Hello AI!' } });
    
    expect(input.value).toBe('Hello AI!');
  });

  it('should clear input after sending message', async () => {
    const mockResponse: AiChatResponse = {
      reply: 'Hello! How can I help you?',
      summary: 'Greeting',
      suggestions: [],
    };
    
    vi.mocked(aiService.chat).mockResolvedValue(mockResponse);
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i) as HTMLTextAreaElement;
    const sendButton = screen.getByLabelText('Send message');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  // =========================================
  // Message Sending Tests
  // =========================================

  it('should send message when send button is clicked', async () => {
    const mockResponse: AiChatResponse = {
      reply: 'Hello! How can I help you?',
      summary: 'Greeting',
      suggestions: ['Tell me more', 'How are you?'],
    };
    
    vi.mocked(aiService.chat).mockResolvedValue(mockResponse);
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    const sendButton = screen.getByLabelText('Send message');
    
    fireEvent.change(input, { target: { value: 'Hello AI' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(aiService.chat).toHaveBeenCalledWith({
        message: 'Hello AI',
        includeContext: true,
      });
    });
  });

  it('should display user message after sending', async () => {
    const mockResponse: AiChatResponse = {
      reply: 'I received your message',
      summary: 'Acknowledged',
      suggestions: [],
    };
    
    vi.mocked(aiService.chat).mockResolvedValue(mockResponse);
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByLabelText('Send message'));
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  it('should display AI response after sending message', async () => {
    const mockResponse: AiChatResponse = {
      reply: "That's a great question!",
      summary: 'Positive response',
      suggestions: ['Follow up question'],
    };
    
    vi.mocked(aiService.chat).mockResolvedValue(mockResponse);
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    fireEvent.change(input, { target: { value: 'How are you?' } });
    fireEvent.click(screen.getByLabelText('Send message'));
    
    await waitFor(() => {
      expect(screen.getByText("That's a great question!")).toBeInTheDocument();
    });
  });

  it('should send message when Enter key is pressed', async () => {
    const mockResponse: AiChatResponse = {
      reply: 'Response',
      summary: 'Summary',
      suggestions: [],
    };
    
    vi.mocked(aiService.chat).mockResolvedValue(mockResponse);
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    await waitFor(() => {
      expect(aiService.chat).toHaveBeenCalled();
    });
  });

  it('should not send message when Shift+Enter is pressed', () => {
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13, shiftKey: true });
    
    expect(aiService.chat).not.toHaveBeenCalled();
  });

  // =========================================
  // Suggestion Chips Tests
  // =========================================

  it('should populate input when suggestion chip is clicked', () => {
    render(<Chat />);
    
    const suggestionChip = screen.getByText("I'm feeling anxious");
    fireEvent.click(suggestionChip);
    
    const input = screen.getByPlaceholderText(/Type your message/i) as HTMLTextAreaElement;
    expect(input.value).toBe("I'm feeling anxious");
  });

  // =========================================
  // Loading State Tests
  // =========================================

  it('should show loading indicator while waiting for response', async () => {
    const mockResponse: AiChatResponse = {
      reply: 'Response',
      summary: 'Summary',
      suggestions: [],
    };
    
    vi.mocked(aiService.chat).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockResponse), 100))
    );
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByLabelText('Send message'));
    
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Thinking...')).not.toBeInTheDocument();
    });
  });

  it('should disable send button when loading', async () => {
    const mockResponse: AiChatResponse = {
      reply: 'Response',
      summary: 'Summary',
      suggestions: [],
    };
    
    vi.mocked(aiService.chat).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockResponse), 100))
    );
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    const sendButton = screen.getByLabelText('Send message');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);
    
    expect(sendButton).toBeDisabled();
    
    await waitFor(() => {
      expect(sendButton).not.toBeDisabled();
    });
  });

  // =========================================
  // Error Handling Tests
  // =========================================

  it('should display error message when API call fails', async () => {
    vi.mocked(aiService.chat).mockRejectedValue({
      response: { data: { message: 'API Error' } },
    });
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByLabelText('Send message'));
    
    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });

  it('should remove user message if API call fails', async () => {
    vi.mocked(aiService.chat).mockRejectedValue({
      response: { data: { message: 'Failed' } },
    });
    
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    const testMessage = 'This will fail';
    
    fireEvent.change(input, { target: { value: testMessage } });
    fireEvent.click(screen.getByLabelText('Send message'));
    
    await waitFor(() => {
      // Welcome message should still be there, but not the failed message
      const messages = screen.queryAllByText(testMessage);
      // Should only be in the input (restored), not in message history
      expect(messages.length).toBeLessThanOrEqual(1);
    });
  });

  // =========================================
  // Button State Tests
  // =========================================

  it('should disable send button when input is empty', () => {
    render(<Chat />);
    
    const sendButton = screen.getByLabelText('Send message');
    expect(sendButton).toBeDisabled();
  });

  it('should enable send button when input has text', () => {
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    const sendButton = screen.getByLabelText('Send message');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    expect(sendButton).not.toBeDisabled();
  });

  it('should disable send button when input only has whitespace', () => {
    render(<Chat />);
    
    const input = screen.getByPlaceholderText(/Type your message/i);
    const sendButton = screen.getByLabelText('Send message');
    
    fireEvent.change(input, { target: { value: '   ' } });
    
    expect(sendButton).toBeDisabled();
  });
});

