package com.serenmind.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoodEntryRequest {

    @NotNull(message = "Mood score is required")
    @Min(value = 1, message = "Mood score must be at least 1")
    @Max(value = 10, message = "Mood score must be at most 10")
    private Integer moodScore;

    private String notes;

    private String activities; // Comma-separated

    @Min(value = 1, message = "Energy level must be at least 1")
    @Max(value = 10, message = "Energy level must be at most 10")
    private Integer energyLevel;

    @Min(value = 1, message = "Stress level must be at least 1")
    @Max(value = 10, message = "Stress level must be at most 10")
    private Integer stressLevel;

    private LocalDateTime timestamp; // Optional, defaults to now if not provided
}

