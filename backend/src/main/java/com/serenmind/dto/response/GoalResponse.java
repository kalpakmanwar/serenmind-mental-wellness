package com.serenmind.dto.response;

import com.serenmind.model.Goal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalResponse {

    private Long id;
    private String title;
    private String description;
    private Goal.GoalType type;
    private Integer targetCount;
    private Goal.GoalPeriod period;
    private Integer currentProgress;
    private Integer currentStreak;
    private Integer longestStreak;
    private LocalDate startDate;
    private LocalDate lastCompletionDate;
    private Goal.GoalStatus status;
    private List<LocalDate> completionDates;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Calculated fields
    private Boolean isCompletedToday;
    private Double progressPercentage;
    private Integer daysUntilReset; // Days until progress resets based on period

    public static GoalResponse fromGoal(Goal goal) {
        return GoalResponse.builder()
                .id(goal.getId())
                .title(goal.getTitle())
                .description(goal.getDescription())
                .type(goal.getType())
                .targetCount(goal.getTargetCount())
                .period(goal.getPeriod())
                .currentProgress(goal.getCurrentProgress())
                .currentStreak(goal.getCurrentStreak())
                .longestStreak(goal.getLongestStreak())
                .startDate(goal.getStartDate())
                .lastCompletionDate(goal.getLastCompletionDate())
                .status(goal.getStatus())
                .completionDates(goal.getCompletionDates())
                .createdAt(goal.getCreatedAt())
                .updatedAt(goal.getUpdatedAt())
                .isCompletedToday(isCompletedToday(goal))
                .progressPercentage(calculateProgressPercentage(goal))
                .daysUntilReset(calculateDaysUntilReset(goal))
                .build();
    }

    private static Boolean isCompletedToday(Goal goal) {
        LocalDate today = LocalDate.now();
        return goal.getLastCompletionDate() != null && 
               goal.getLastCompletionDate().equals(today);
    }

    private static Double calculateProgressPercentage(Goal goal) {
        if (goal.getTargetCount() == null || goal.getTargetCount() == 0) {
            return 0.0;
        }
        return (double) goal.getCurrentProgress() / goal.getTargetCount() * 100;
    }

    private static Integer calculateDaysUntilReset(Goal goal) {
        LocalDate today = LocalDate.now();
        LocalDate resetDate;

        switch (goal.getPeriod()) {
            case DAILY:
                resetDate = today.plusDays(1);
                break;
            case WEEKLY:
                resetDate = today.plusWeeks(1).with(java.time.DayOfWeek.MONDAY);
                break;
            case MONTHLY:
                resetDate = today.plusMonths(1).withDayOfMonth(1);
                break;
            default:
                return null;
        }

        return (int) java.time.temporal.ChronoUnit.DAYS.between(today, resetDate);
    }
}

