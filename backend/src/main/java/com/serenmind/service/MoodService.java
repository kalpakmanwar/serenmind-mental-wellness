package com.serenmind.service;

import com.serenmind.dto.request.MoodEntryRequest;
import com.serenmind.dto.response.MoodEntryResponse;
import com.serenmind.dto.response.MoodTrendsResponse;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service interface for mood tracking operations.
 */
public interface MoodService {

    /**
     * Create a new mood entry for the authenticated user.
     */
    MoodEntryResponse createMoodEntry(Long userId, MoodEntryRequest request);

    /**
     * Get all mood entries for a user.
     */
    List<MoodEntryResponse> getUserMoodEntries(Long userId);

    /**
     * Get mood entries within a date range.
     */
    List<MoodEntryResponse> getMoodEntriesByDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate);

    /**
     * Get average mood score for a user within a date range.
     */
    Double getAverageMoodScore(Long userId, LocalDateTime startDate, LocalDateTime endDate);

    /**
     * Get mood trends formatted for Chart.js visualization.
     */
    MoodTrendsResponse getMoodTrends(Long userId, LocalDateTime startDate, LocalDateTime endDate);

    /**
     * Delete a mood entry.
     */
    void deleteMoodEntry(Long userId, Long entryId);
}

