package com.serenmind.service;

import com.serenmind.dto.request.JournalEntryRequest;
import com.serenmind.dto.response.JournalEntryResponse;

import java.util.List;

/**
 * Service interface for journal operations.
 */
public interface JournalService {

    /**
     * Create a new journal entry.
     */
    JournalEntryResponse createJournalEntry(Long userId, JournalEntryRequest request);

    /**
     * Get all journal entries for a user.
     */
    List<JournalEntryResponse> getUserJournalEntries(Long userId);

    /**
     * Get a specific journal entry by ID.
     */
    JournalEntryResponse getJournalEntryById(Long userId, Long entryId);

    /**
     * Update a journal entry.
     */
    JournalEntryResponse updateJournalEntry(Long userId, Long entryId, JournalEntryRequest request);

    /**
     * Delete a journal entry.
     */
    void deleteJournalEntry(Long userId, Long entryId);

    /**
     * Get favorite journal entries.
     */
    List<JournalEntryResponse> getFavoriteJournalEntries(Long userId);
}

