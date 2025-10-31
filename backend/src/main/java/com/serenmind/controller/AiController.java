package com.serenmind.controller;

import com.serenmind.dto.request.AiChatRequest;
import com.serenmind.dto.request.AiReportRequest;
import com.serenmind.dto.response.AiChatResponse;
import com.serenmind.dto.response.AiReportResponse;
import com.serenmind.dto.response.MessageResponse;
import com.serenmind.model.User;
import com.serenmind.repository.UserRepository;
import com.serenmind.service.AiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST controller for AI-powered features.
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "AI Features", description = "AI-powered insights and chat with context-aware responses")
@SecurityRequirement(name = "bearerAuth")
public class AiController {

    private final AiService aiService;
    private final UserRepository userRepository;

    @PostMapping("/chat")
    @Operation(summary = "Chat with AI assistant", 
               description = "Send a message and receive structured AI response with suggestions based on your recent mood and journal entries")
    public ResponseEntity<AiChatResponse> chat(
            @Valid @RequestBody AiChatRequest request,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("AI chat endpoint called for user ID: {}", userId);
        
        AiChatResponse response = aiService.chat(userId, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reports")
    @Operation(summary = "Generate and persist AI report", 
               description = "Generate insights report (WEEKLY_SUMMARY, MOOD_ANALYSIS, JOURNAL_INSIGHTS) and save to database")
    public ResponseEntity<AiReportResponse> generateReport(
            @Valid @RequestBody AiReportRequest request,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("AI report generation endpoint called for user ID: {}, type: {}", 
                 userId, request.getReportType());
        
        AiReportResponse response = aiService.generateReport(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Legacy endpoints for backward compatibility
    
    @PostMapping("/chat/simple")
    @Operation(summary = "Simple chat (legacy)", description = "Deprecated: Use POST /api/ai/chat instead")
    @Deprecated
    public ResponseEntity<MessageResponse> chatSimple(
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        String userMessage = request.get("message");
        log.info("Legacy AI chat endpoint called for user ID: {}", userId);
        
        String response = aiService.generateChatResponse(userId, userMessage);
        return ResponseEntity.ok(new MessageResponse(response));
    }

    @GetMapping("/weekly-summary")
    @Operation(summary = "Generate weekly summary (legacy)", description = "Deprecated: Use POST /api/ai/reports with type=WEEKLY_SUMMARY")
    @Deprecated
    public ResponseEntity<MessageResponse> getWeeklySummary(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Legacy weekly summary endpoint called for user ID: {}", userId);
        
        String summary = aiService.generateWeeklySummary(userId);
        return ResponseEntity.ok(new MessageResponse(summary));
    }

    @GetMapping("/analyze-journal/{journalId}")
    @Operation(summary = "Analyze journal entry (legacy)", description = "Deprecated: Use POST /api/ai/reports with type=JOURNAL_ANALYSIS")
    @Deprecated
    public ResponseEntity<MessageResponse> analyzeJournal(
            @PathVariable Long journalId,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Legacy journal analysis endpoint called for journal ID: {} and user ID: {}", journalId, userId);
        
        String analysis = aiService.analyzeJournalEntry(userId, journalId);
        return ResponseEntity.ok(new MessageResponse(analysis));
    }

    /**
     * Extract user ID from authentication.
     */
    private Long getUserIdFromAuth(Authentication authentication) {
        String email = authentication.getName(); // Email from JWT subject
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
        return user.getId();
    }
}

