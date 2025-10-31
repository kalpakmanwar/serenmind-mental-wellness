import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle, Volume2, VolumeX, Pause, Play, StopCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { aiService } from '@/services/api';
import { useSpeech } from '@/hooks/useSpeech';
import type { AiChatResponse } from '@/types';

// =========================================
// Types
// =========================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

// =========================================
// Chat Page Component
// =========================================

const Chat = () => {
  const { isAuthenticated, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true); // Voice on by default
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Text-to-Speech hook
  const { speak, stop, pause, resume, isSpeaking, isPaused, isSupported } = useSpeech({
    rate: 1.0, // Normal speed
    pitch: 1.0,
    volume: 1.0
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Hello! 👋 I'm your mental wellness companion. I'm here to listen, provide support, and offer insights based on your mood tracking and journal entries. How are you feeling today?",
          timestamp: new Date(),
          suggestions: [
            "I'm feeling anxious",
            "Tell me about my mood trends",
            "I need some coping strategies",
            "Help me understand my emotions"
          ]
        }
      ]);
    }
  }, [messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response: AiChatResponse = await aiService.chat({
        message: inputMessage,
        includeContext: true
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Mark AI as used (for Dashboard workflow tracking)
      if (user?.id) {
        localStorage.setItem(`hasUsedAi_${user.id}`, 'true');
      }
      
      // Speak the AI response if voice is enabled
      if (voiceEnabled && isSupported) {
        // Combine reply with suggestions for complete voice output
        let fullResponse = response.reply;
        
        if (response.suggestions && response.suggestions.length > 0) {
          fullResponse += ". Here are some suggestions. ";
          response.suggestions.forEach((suggestion, index) => {
            fullResponse += `${index + 1}. ${suggestion}. `;
          });
        }
        
        speak(fullResponse);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      
      // Remove the user message if the request failed
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
      setInputMessage(inputMessage); // Restore the input
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-heading text-text-dark mb-4">
            Please log in to access the AI chat
          </h2>
          <a href="/login" className="btn btn-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-card shadow-soft h-full flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-peach via-accent-lavender to-accent-sage flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-heading text-text-dark dark:text-white">
                  AI Wellness Companion
                </h1>
                <p className="text-sm text-text-gray dark:text-gray-400">
                  Your personal mental health support
                </p>
              </div>
            </div>
            
            {/* Voice Controls */}
            {isSupported && (
              <div className="flex items-center gap-2">
                {/* Voice On/Off Toggle */}
                <button
                  onClick={() => {
                    setVoiceEnabled(!voiceEnabled);
                    if (isSpeaking) stop();
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    voiceEnabled 
                      ? 'bg-accent-peach/20 text-accent-peach hover:bg-accent-peach/30' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title={voiceEnabled ? "Voice ON - Click to disable" : "Voice OFF - Click to enable"}
                >
                  {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>

                {/* Play/Pause Control (only show when speaking) */}
                {isSpeaking && voiceEnabled && (
                  <button
                    onClick={() => isPaused ? resume() : pause()}
                    className="p-2 rounded-lg bg-accent-lavender/20 text-accent-lavender hover:bg-accent-lavender/30 transition-colors"
                    title={isPaused ? "Resume" : "Pause"}
                  >
                    {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  </button>
                )}

                {/* Stop Control (only show when speaking) */}
                {isSpeaking && voiceEnabled && (
                  <button
                    onClick={stop}
                    className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    title="Stop speaking"
                  >
                    <StopCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-accent-sage' 
                      : 'bg-gradient-to-br from-accent-peach to-accent-lavender'
                  } ${message.role === 'assistant' && isSpeaking && voiceEnabled ? 'animate-pulse' : ''}`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className={`w-4 h-4 text-white ${isSpeaking && voiceEnabled ? 'animate-bounce' : ''}`} />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-accent-sage text-text-dark'
                        : 'bg-gray-100 dark:bg-gray-700 text-text-dark dark:text-white'
                    }`}>
                      <p className="text-sm sm:text-base whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs px-3 py-1 rounded-full bg-accent-peach bg-opacity-20 text-text-dark dark:text-white hover:bg-opacity-30 transition-all duration-200"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="text-xs text-text-gray dark:text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-peach to-accent-lavender flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-accent-peach" />
                  <span className="text-sm text-text-gray dark:text-gray-400">Thinking...</span>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-700 dark:text-red-400 rounded-2xl"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Shift+Enter for new line)"
                rows={1}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-accent-peach focus:ring-2 focus:ring-accent-peach focus:ring-opacity-50 transition-all duration-300 bg-white dark:bg-gray-800 text-text-dark dark:text-white resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-3 bg-accent-peach hover:bg-opacity-90 text-text-dark rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-text-gray dark:text-gray-400 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;
