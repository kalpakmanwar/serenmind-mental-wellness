package com.serenmind.controller;

import com.serenmind.dto.request.JournalEntryRequest;
import com.serenmind.dto.response.JournalEntryResponse;
import com.serenmind.model.User;
import com.serenmind.repository.UserRepository;
import com.serenmind.service.JournalService;
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

import java.util.List;

/**
 * REST controller for journal entry endpoints.
 */
@RestController
@RequestMapping("/api/journals")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Journal", description = "Endpoints for journal entries")
@SecurityRequirement(name = "bearerAuth")
public class JournalController {

    private final JournalService journalService;
    private final UserRepository userRepository;

    @PostMapping
    @Operation(summary = "Create a new journal entry")
    public ResponseEntity<JournalEntryResponse> createJournalEntry(
            @Valid @RequestBody JournalEntryRequest request,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Create journal entry endpoint called for user ID: {}", userId);
        JournalEntryResponse response = journalService.createJournalEntry(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get all journal entries for authenticated user")
    public ResponseEntity<List<JournalEntryResponse>> getUserJournalEntries(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Get journal entries endpoint called for user ID: {}", userId);
        List<JournalEntryResponse> responses = journalService.getUserJournalEntries(userId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a specific journal entry by ID")
    public ResponseEntity<JournalEntryResponse> getJournalEntryById(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Get journal entry ID: {} for user ID: {}", id, userId);
        JournalEntryResponse response = journalService.getJournalEntryById(userId, id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a journal entry")
    public ResponseEntity<JournalEntryResponse> updateJournalEntry(
            @PathVariable Long id,
            @Valid @RequestBody JournalEntryRequest request,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Update journal entry ID: {} for user ID: {}", id, userId);
        JournalEntryResponse response = journalService.updateJournalEntry(userId, id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a journal entry")
    public ResponseEntity<Void> deleteJournalEntry(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Delete journal entry ID: {} for user ID: {}", id, userId);
        journalService.deleteJournalEntry(userId, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/favorites")
    @Operation(summary = "Get favorite journal entries")
    public ResponseEntity<List<JournalEntryResponse>> getFavoriteJournalEntries(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Get favorite journal entries for user ID: {}", userId);
        List<JournalEntryResponse> responses = journalService.getFavoriteJournalEntries(userId);
        return ResponseEntity.ok(responses);
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

