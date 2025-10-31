package com.serenmind.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "goals")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalType type; // MOOD_TRACKING, JOURNALING, AI_CHAT, CUSTOM

    @Column(nullable = false)
    private Integer targetCount; // e.g., 7 for "Journal 7 times per week"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalPeriod period; // DAILY, WEEKLY, MONTHLY

    @Column(nullable = false)
    private Integer currentProgress;

    @Column(nullable = false)
    private Integer currentStreak;

    @Column(nullable = false)
    private Integer longestStreak;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate lastCompletionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalStatus status; // ACTIVE, COMPLETED, PAUSED, ARCHIVED

    @ElementCollection
    @CollectionTable(name = "goal_completions", joinColumns = @JoinColumn(name = "goal_id"))
    @Column(name = "completion_date")
    @Builder.Default
    private List<LocalDate> completionDates = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (currentProgress == null) currentProgress = 0;
        if (currentStreak == null) currentStreak = 0;
        if (longestStreak == null) longestStreak = 0;
        if (startDate == null) startDate = LocalDate.now();
        if (status == null) status = GoalStatus.ACTIVE;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum GoalType {
        MOOD_TRACKING("Track your mood"),
        JOURNALING("Write in journal"),
        AI_CHAT("Chat with AI"),
        CUSTOM("Custom goal");

        private final String displayName;

        GoalType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum GoalPeriod {
        DAILY("per day"),
        WEEKLY("per week"),
        MONTHLY("per month");

        private final String displayName;

        GoalPeriod(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum GoalStatus {
        ACTIVE,
        COMPLETED,
        PAUSED,
        ARCHIVED
    }
}

