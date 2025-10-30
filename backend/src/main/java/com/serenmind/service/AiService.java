package com.serenmind.service;

import com.serenmind.dto.request.AiChatRequest;
import com.serenmind.dto.request.AiReportRequest;
import com.serenmind.dto.response.AiChatResponse;
import com.serenmind.dto.response.AiReportResponse;

/**
 * Service interface for AI-powered features (OpenAI integration).
 */
public interface AiService {

    /**
     * Generate AI chat response with context from user's mood and journal entries.
     */
    AiChatResponse chat(Long userId, AiChatRequest request);

    /**
     * Generate and persist an AI report (weekly summary, mood analysis, etc.).
     */
    AiReportResponse generateReport(Long userId, AiReportRequest request);

    /**
     * Legacy method - generate simple chat response.
     * @deprecated Use chat() instead
     */
    @Deprecated
    String generateChatResponse(Long userId, String userMessage);

    /**
     * Legacy method - generate weekly summary.
     * @deprecated Use generateReport() instead
     */
    @Deprecated
    String generateWeeklySummary(Long userId);

    /**
     * Legacy method - analyze journal entry.
     * @deprecated Use generateReport() instead
     */
    @Deprecated
    String analyzeJournalEntry(Long userId, Long journalEntryId);
}

