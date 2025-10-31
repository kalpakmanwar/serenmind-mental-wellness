package com.serenmind.service;

import com.serenmind.dto.request.MoodEntryRequest;
import com.serenmind.dto.response.MoodEntryResponse;
import com.serenmind.dto.response.MoodTrendsResponse;
import com.serenmind.model.MoodEntry;
import com.serenmind.model.User;
import com.serenmind.repository.MoodEntryRepository;
import com.serenmind.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of MoodService for mood tracking operations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MoodServiceImpl implements MoodService {

    private final MoodEntryRepository moodEntryRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public MoodEntryResponse createMoodEntry(Long userId, MoodEntryRequest request) {
        log.info("Creating mood entry for user ID: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        MoodEntry moodEntry = MoodEntry.builder()
                .user(user)
                .moodScore(request.getMoodScore())
                .notes(request.getNotes())
                .activities(request.getActivities())
                .energyLevel(request.getEnergyLevel())
                .stressLevel(request.getStressLevel())
                .timestamp(request.getTimestamp() != null ? request.getTimestamp() : LocalDateTime.now())
                .build();

        moodEntry = moodEntryRepository.save(moodEntry);
        log.info("Mood entry created with ID: {}", moodEntry.getId());

        return mapToMoodEntryResponse(moodEntry);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MoodEntryResponse> getUserMoodEntries(Long userId) {
        log.info("Fetching all mood entries for user ID: {}", userId);

        return moodEntryRepository.findByUserIdOrderByTimestampDesc(userId)
                .stream()
                .map(this::mapToMoodEntryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MoodEntryResponse> getMoodEntriesByDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        log.info("Fetching mood entries for user ID: {} between {} and {}", userId, startDate, endDate);

        return moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(userId, startDate, endDate)
                .stream()
                .map(this::mapToMoodEntryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Double getAverageMoodScore(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        log.info("Calculating average mood score for user ID: {} between {} and {}", userId, startDate, endDate);

        Double average = moodEntryRepository.calculateAverageMood(userId, startDate, endDate);
        return average != null ? average : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public MoodTrendsResponse getMoodTrends(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        log.info("Fetching mood trends for user ID: {} between {} and {}", userId, startDate, endDate);

        // Fetch mood entries sorted by timestamp ascending (for chronological order)
        List<MoodEntry> moodEntries = moodEntryRepository
                .findByUserIdAndTimestampBetweenOrderByTimestampDesc(userId, startDate, endDate)
                .stream()
                .sorted(Comparator.comparing(MoodEntry::getTimestamp))
                .collect(Collectors.toList());

        // Prepare data arrays for Chart.js
        List<String> dates = new ArrayList<>();
        List<Integer> moodScores = new ArrayList<>();
        List<Integer> energyLevels = new ArrayList<>();
        List<Integer> stressLevels = new ArrayList<>();

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM dd");

        // Extract data from mood entries
        for (MoodEntry entry : moodEntries) {
            dates.add(entry.getTimestamp().format(dateFormatter));
            moodScores.add(entry.getMoodScore());
            energyLevels.add(entry.getEnergyLevel() != null ? entry.getEnergyLevel() : 0);
            stressLevels.add(entry.getStressLevel() != null ? entry.getStressLevel() : 0);
        }

        // Calculate summary statistics
        MoodTrendsResponse.TrendsSummary summary = calculateTrendsSummary(moodEntries, startDate, endDate);

        return MoodTrendsResponse.builder()
                .dates(dates)
                .moodScores(moodScores)
                .energyLevels(energyLevels)
                .stressLevels(stressLevels)
                .summary(summary)
                .build();
    }

    @Override
    @Transactional
    public void deleteMoodEntry(Long userId, Long entryId) {
        log.info("Deleting mood entry ID: {} for user ID: {}", entryId, userId);

        MoodEntry moodEntry = moodEntryRepository.findById(entryId)
                .orElseThrow(() -> new IllegalArgumentException("Mood entry not found"));

        if (!moodEntry.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to delete this mood entry");
        }

        moodEntryRepository.delete(moodEntry);
        log.info("Mood entry deleted successfully");
    }

    /**
     * Calculate summary statistics for mood trends.
     */
    private MoodTrendsResponse.TrendsSummary calculateTrendsSummary(
            List<MoodEntry> entries, LocalDateTime startDate, LocalDateTime endDate) {
        
        if (entries.isEmpty()) {
            return MoodTrendsResponse.TrendsSummary.builder()
                    .averageMood(0.0)
                    .averageEnergy(0.0)
                    .averageStress(0.0)
                    .totalEntries(0)
                    .highestMood(0)
                    .lowestMood(0)
                    .startDate(startDate.toLocalDate().toString())
                    .endDate(endDate.toLocalDate().toString())
                    .build();
        }

        double avgMood = entries.stream()
                .mapToInt(MoodEntry::getMoodScore)
                .average()
                .orElse(0.0);

        double avgEnergy = entries.stream()
                .filter(e -> e.getEnergyLevel() != null)
                .mapToInt(MoodEntry::getEnergyLevel)
                .average()
                .orElse(0.0);

        double avgStress = entries.stream()
                .filter(e -> e.getStressLevel() != null)
                .mapToInt(MoodEntry::getStressLevel)
                .average()
                .orElse(0.0);

        int highest = entries.stream()
                .mapToInt(MoodEntry::getMoodScore)
                .max()
                .orElse(0);

        int lowest = entries.stream()
                .mapToInt(MoodEntry::getMoodScore)
                .min()
                .orElse(0);

        return MoodTrendsResponse.TrendsSummary.builder()
                .averageMood(Math.round(avgMood * 100.0) / 100.0)
                .averageEnergy(Math.round(avgEnergy * 100.0) / 100.0)
                .averageStress(Math.round(avgStress * 100.0) / 100.0)
                .totalEntries(entries.size())
                .highestMood(highest)
                .lowestMood(lowest)
                .startDate(startDate.toLocalDate().toString())
                .endDate(endDate.toLocalDate().toString())
                .build();
    }

    /**
     * Map MoodEntry entity to MoodEntryResponse DTO.
     */
    private MoodEntryResponse mapToMoodEntryResponse(MoodEntry moodEntry) {
        return MoodEntryResponse.builder()
                .id(moodEntry.getId())
                .moodScore(moodEntry.getMoodScore())
                .notes(moodEntry.getNotes())
                .activities(moodEntry.getActivities())
                .energyLevel(moodEntry.getEnergyLevel())
                .stressLevel(moodEntry.getStressLevel())
                .timestamp(moodEntry.getTimestamp())
                .createdAt(moodEntry.getCreatedAt())
                .updatedAt(moodEntry.getUpdatedAt())
                .build();
    }
}

