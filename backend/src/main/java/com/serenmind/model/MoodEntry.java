package com.serenmind.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * MoodEntry entity for tracking user mood scores and notes.
 */
@Entity
@Table(name = "mood_entries", indexes = {
    @Index(name = "idx_user_timestamp", columnList = "user_id, timestamp")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoodEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @Min(1)
    @Max(10)
    @Column(name = "mood_score", nullable = false)
    private Integer moodScore;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "activities", length = 500)
    private String activities; // Comma-separated activities

    @Column(name = "energy_level")
    @Min(1)
    @Max(10)
    private Integer energyLevel;

    @Column(name = "stress_level")
    @Min(1)
    @Max(10)
    private Integer stressLevel;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

