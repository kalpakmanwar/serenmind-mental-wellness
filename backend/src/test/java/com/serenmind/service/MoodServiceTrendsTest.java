package com.serenmind.service;

import com.serenmind.dto.response.MoodTrendsResponse;
import com.serenmind.model.MoodEntry;
import com.serenmind.model.User;
import com.serenmind.repository.MoodEntryRepository;
import com.serenmind.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Unit tests for MoodService trends functionality.
 */
@ExtendWith(MockitoExtension.class)
class MoodServiceTrendsTest {

    @Mock
    private MoodEntryRepository moodEntryRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MoodServiceImpl moodService;

    private User user;
    private List<MoodEntry> mockMoodEntries;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .fullName("Test User")
                .email("test@example.com")
                .build();

        startDate = LocalDateTime.of(2025, 10, 1, 0, 0);
        endDate = LocalDateTime.of(2025, 10, 31, 23, 59);

        // Create mock mood entries
        mockMoodEntries = Arrays.asList(
                createMoodEntry(1L, 7, 8, 3, LocalDateTime.of(2025, 10, 1, 10, 0)),
                createMoodEntry(2L, 8, 9, 2, LocalDateTime.of(2025, 10, 5, 10, 0)),
                createMoodEntry(3L, 6, 7, 4, LocalDateTime.of(2025, 10, 10, 10, 0)),
                createMoodEntry(4L, 9, 9, 1, LocalDateTime.of(2025, 10, 15, 10, 0)),
                createMoodEntry(5L, 7, 8, 3, LocalDateTime.of(2025, 10, 20, 10, 0))
        );
    }

    private MoodEntry createMoodEntry(Long id, int mood, int energy, int stress, LocalDateTime timestamp) {
        return MoodEntry.builder()
                .id(id)
                .user(user)
                .moodScore(mood)
                .energyLevel(energy)
                .stressLevel(stress)
                .timestamp(timestamp)
                .build();
    }

    @Test
    void testGetMoodTrends_WithData_Success() {
        // Arrange
        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                any(Long.class), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(mockMoodEntries);

        // Act
        MoodTrendsResponse response = moodService.getMoodTrends(user.getId(), startDate, endDate);

        // Assert
        assertNotNull(response);
        assertEquals(5, response.getDates().size());
        assertEquals(5, response.getMoodScores().size());
        assertEquals(5, response.getEnergyLevels().size());
        assertEquals(5, response.getStressLevels().size());

        // Verify dates are formatted correctly (MMM dd)
        assertEquals("Oct 01", response.getDates().get(0));
        assertEquals("Oct 05", response.getDates().get(1));
        assertEquals("Oct 10", response.getDates().get(2));

        // Verify mood scores
        assertEquals(7, response.getMoodScores().get(0));
        assertEquals(8, response.getMoodScores().get(1));
        assertEquals(6, response.getMoodScores().get(2));
        assertEquals(9, response.getMoodScores().get(3));
        assertEquals(7, response.getMoodScores().get(4));

        // Verify summary statistics
        MoodTrendsResponse.TrendsSummary summary = response.getSummary();
        assertNotNull(summary);
        assertEquals(5, summary.getTotalEntries());
        assertEquals(7.4, summary.getAverageMood(), 0.1);
        assertEquals(8.2, summary.getAverageEnergy(), 0.1);
        assertEquals(2.6, summary.getAverageStress(), 0.1);
        assertEquals(9, summary.getHighestMood());
        assertEquals(6, summary.getLowestMood());
    }

    @Test
    void testGetMoodTrends_EmptyData_ReturnsEmptyArrays() {
        // Arrange
        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                any(Long.class), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(Collections.emptyList());

        // Act
        MoodTrendsResponse response = moodService.getMoodTrends(user.getId(), startDate, endDate);

        // Assert
        assertNotNull(response);
        assertTrue(response.getDates().isEmpty());
        assertTrue(response.getMoodScores().isEmpty());
        assertTrue(response.getEnergyLevels().isEmpty());
        assertTrue(response.getStressLevels().isEmpty());

        // Verify summary for empty data
        MoodTrendsResponse.TrendsSummary summary = response.getSummary();
        assertNotNull(summary);
        assertEquals(0, summary.getTotalEntries());
        assertEquals(0.0, summary.getAverageMood());
        assertEquals(0, summary.getHighestMood());
        assertEquals(0, summary.getLowestMood());
    }

    @Test
    void testGetMoodTrends_NullEnergyAndStress_HandledGracefully() {
        // Arrange
        List<MoodEntry> entriesWithNulls = Arrays.asList(
                MoodEntry.builder()
                        .id(1L)
                        .user(user)
                        .moodScore(7)
                        .energyLevel(null)
                        .stressLevel(null)
                        .timestamp(LocalDateTime.of(2025, 10, 1, 10, 0))
                        .build(),
                MoodEntry.builder()
                        .id(2L)
                        .user(user)
                        .moodScore(8)
                        .energyLevel(9)
                        .stressLevel(2)
                        .timestamp(LocalDateTime.of(2025, 10, 5, 10, 0))
                        .build()
        );

        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                any(Long.class), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(entriesWithNulls);

        // Act
        MoodTrendsResponse response = moodService.getMoodTrends(user.getId(), startDate, endDate);

        // Assert
        assertNotNull(response);
        assertEquals(2, response.getMoodScores().size());
        
        // Verify null values are replaced with 0
        assertEquals(0, response.getEnergyLevels().get(0));
        assertEquals(0, response.getStressLevels().get(0));
        assertEquals(9, response.getEnergyLevels().get(1));
        assertEquals(2, response.getStressLevels().get(1));

        // Average should only count non-null values
        MoodTrendsResponse.TrendsSummary summary = response.getSummary();
        assertEquals(9.0, summary.getAverageEnergy());
        assertEquals(2.0, summary.getAverageStress());
    }

    @Test
    void testGetMoodTrends_SingleEntry_Success() {
        // Arrange
        List<MoodEntry> singleEntry = Collections.singletonList(
                createMoodEntry(1L, 7, 8, 3, LocalDateTime.of(2025, 10, 15, 10, 0))
        );

        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                any(Long.class), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(singleEntry);

        // Act
        MoodTrendsResponse response = moodService.getMoodTrends(user.getId(), startDate, endDate);

        // Assert
        assertNotNull(response);
        assertEquals(1, response.getDates().size());
        assertEquals(1, response.getMoodScores().size());
        assertEquals(7, response.getMoodScores().get(0));

        // Summary for single entry
        MoodTrendsResponse.TrendsSummary summary = response.getSummary();
        assertEquals(1, summary.getTotalEntries());
        assertEquals(7.0, summary.getAverageMood());
        assertEquals(7, summary.getHighestMood());
        assertEquals(7, summary.getLowestMood());
    }
}

