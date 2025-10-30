package com.serenmind.controller;

import com.serenmind.dto.request.MoodEntryRequest;
import com.serenmind.dto.response.MoodEntryResponse;
import com.serenmind.dto.response.MoodTrendsResponse;
import com.serenmind.model.User;
import com.serenmind.repository.UserRepository;
import com.serenmind.service.MoodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * REST controller for mood tracking endpoints.
 */
@RestController
@RequestMapping("/api/moods")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Mood Tracking", description = "Endpoints for mood entries and analytics")
@SecurityRequirement(name = "bearerAuth")
public class MoodController {

    private final MoodService moodService;
    private final UserRepository userRepository;

    @PostMapping
    @Operation(summary = "Create a new mood entry")
    public ResponseEntity<MoodEntryResponse> createMoodEntry(
            @Valid @RequestBody MoodEntryRequest request,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Create mood entry endpoint called for user ID: {}", userId);
        MoodEntryResponse response = moodService.createMoodEntry(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get all mood entries for authenticated user")
    public ResponseEntity<List<MoodEntryResponse>> getUserMoodEntries(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Get mood entries endpoint called for user ID: {}", userId);
        List<MoodEntryResponse> responses = moodService.getUserMoodEntries(userId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/range")
    @Operation(summary = "Get mood entries within a date range")
    public ResponseEntity<List<MoodEntryResponse>> getMoodEntriesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Get mood entries by date range for user ID: {}", userId);
        List<MoodEntryResponse> responses = moodService.getMoodEntriesByDateRange(userId, startDate, endDate);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/average")
    @Operation(summary = "Get average mood score within a date range")
    public ResponseEntity<Map<String, Object>> getAverageMoodScore(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Get average mood score for user ID: {}", userId);
        Double average = moodService.getAverageMoodScore(userId, startDate, endDate);
        return ResponseEntity.ok(Map.of(
                "averageMoodScore", average,
                "startDate", startDate,
                "endDate", endDate
        ));
    }

    @GetMapping("/trends")
    @Operation(summary = "Get mood trends formatted for Chart.js visualization", 
               description = "Returns mood data with dates and values arrays optimized for Chart.js line charts")
    public ResponseEntity<MoodTrendsResponse> getMoodTrends(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Get mood trends for user ID: {} between {} and {}", userId, startDate, endDate);
        MoodTrendsResponse response = moodService.getMoodTrends(userId, startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a mood entry")
    public ResponseEntity<Void> deleteMoodEntry(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Delete mood entry ID: {} for user ID: {}", id, userId);
        moodService.deleteMoodEntry(userId, id);
        return ResponseEntity.noContent().build();
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

