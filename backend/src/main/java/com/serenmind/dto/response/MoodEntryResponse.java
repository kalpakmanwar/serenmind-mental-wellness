package com.serenmind.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoodEntryResponse {

    private Long id;
    private Integer moodScore;
    private String notes;
    private String activities;
    private Integer energyLevel;
    private Integer stressLevel;
    private LocalDateTime timestamp;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

