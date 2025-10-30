package com.serenmind.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for mood trends data formatted for Chart.js.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoodTrendsResponse {

    /**
     * Array of date labels for Chart.js x-axis.
     * Format: "YYYY-MM-DD" or "MMM DD" depending on date range
     */
    private List<String> dates;

    /**
     * Array of mood scores corresponding to dates for Chart.js y-axis.
     */
    private List<Integer> moodScores;

    /**
     * Optional: Array of energy levels
     */
    private List<Integer> energyLevels;

    /**
     * Optional: Array of stress levels
     */
    private List<Integer> stressLevels;

    /**
     * Statistical summary
     */
    private TrendsSummary summary;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TrendsSummary {
        private Double averageMood;
        private Double averageEnergy;
        private Double averageStress;
        private Integer totalEntries;
        private Integer highestMood;
        private Integer lowestMood;
        private String startDate;
        private String endDate;
    }
}

