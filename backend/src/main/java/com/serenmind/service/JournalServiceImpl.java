package com.serenmind.service;

import com.serenmind.dto.request.JournalEntryRequest;
import com.serenmind.dto.response.JournalEntryResponse;
import com.serenmind.model.JournalEntry;
import com.serenmind.model.User;
import com.serenmind.repository.JournalEntryRepository;
import com.serenmind.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of JournalService.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class JournalServiceImpl implements JournalService {

    private final JournalEntryRepository journalEntryRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public JournalEntryResponse createJournalEntry(Long userId, JournalEntryRequest request) {
        log.info("Creating journal entry for user ID: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        JournalEntry journalEntry = JournalEntry.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .tags(request.getTags())
                .isFavorite(request.getIsFavorite() != null ? request.getIsFavorite() : false)
                .isPrivate(request.getIsPrivate() != null ? request.getIsPrivate() : true)
                .build();

        journalEntry = journalEntryRepository.save(journalEntry);
        log.info("Journal entry created with ID: {}", journalEntry.getId());

        return mapToJournalEntryResponse(journalEntry);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JournalEntryResponse> getUserJournalEntries(Long userId) {
        log.info("Fetching all journal entries for user ID: {}", userId);

        return journalEntryRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToJournalEntryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public JournalEntryResponse getJournalEntryById(Long userId, Long entryId) {
        log.info("Fetching journal entry ID: {} for user ID: {}", entryId, userId);

        JournalEntry journalEntry = journalEntryRepository.findById(entryId)
                .orElseThrow(() -> new IllegalArgumentException("Journal entry not found"));

        if (!journalEntry.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to access this journal entry");
        }

        return mapToJournalEntryResponse(journalEntry);
    }

    @Override
    @Transactional
    public JournalEntryResponse updateJournalEntry(Long userId, Long entryId, JournalEntryRequest request) {
        log.info("Updating journal entry ID: {} for user ID: {}", entryId, userId);

        JournalEntry journalEntry = journalEntryRepository.findById(entryId)
                .orElseThrow(() -> new IllegalArgumentException("Journal entry not found"));

        if (!journalEntry.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to update this journal entry");
        }

        // Update fields
        journalEntry.setTitle(request.getTitle());
        journalEntry.setContent(request.getContent());
        journalEntry.setTags(request.getTags());
        if (request.getIsFavorite() != null) {
            journalEntry.setIsFavorite(request.getIsFavorite());
        }
        if (request.getIsPrivate() != null) {
            journalEntry.setIsPrivate(request.getIsPrivate());
        }

        journalEntry = journalEntryRepository.save(journalEntry);
        log.info("Journal entry updated successfully");

        return mapToJournalEntryResponse(journalEntry);
    }

    @Override
    @Transactional
    public void deleteJournalEntry(Long userId, Long entryId) {
        log.info("Deleting journal entry ID: {} for user ID: {}", entryId, userId);

        JournalEntry journalEntry = journalEntryRepository.findById(entryId)
                .orElseThrow(() -> new IllegalArgumentException("Journal entry not found"));

        if (!journalEntry.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to delete this journal entry");
        }

        journalEntryRepository.delete(journalEntry);
        log.info("Journal entry deleted successfully");
    }

    @Override
    @Transactional(readOnly = true)
    public List<JournalEntryResponse> getFavoriteJournalEntries(Long userId) {
        log.info("Fetching favorite journal entries for user ID: {}", userId);

        return journalEntryRepository.findByUserIdAndIsFavoriteTrueOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToJournalEntryResponse)
                .collect(Collectors.toList());
    }

    /**
     * Map JournalEntry entity to JournalEntryResponse DTO.
     */
    private JournalEntryResponse mapToJournalEntryResponse(JournalEntry journalEntry) {
        return JournalEntryResponse.builder()
                .id(journalEntry.getId())
                .title(journalEntry.getTitle())
                .content(journalEntry.getContent())
                .tags(journalEntry.getTags())
                .isFavorite(journalEntry.getIsFavorite())
                .isPrivate(journalEntry.getIsPrivate())
                .createdAt(journalEntry.getCreatedAt())
                .updatedAt(journalEntry.getUpdatedAt())
                .build();
    }
}

