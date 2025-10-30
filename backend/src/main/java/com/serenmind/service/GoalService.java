package com.serenmind.service;

import com.serenmind.dto.request.GoalRequest;
import com.serenmind.dto.response.GoalResponse;
import com.serenmind.model.Goal;
import com.serenmind.model.User;
import com.serenmind.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GoalService {

    private final GoalRepository goalRepository;

    @Transactional
    public GoalResponse createGoal(User user, GoalRequest request) {
        Goal goal = Goal.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType())
                .targetCount(request.getTargetCount())
                .period(request.getPeriod())
                .currentProgress(0)
                .currentStreak(0)
                .longestStreak(0)
                .startDate(LocalDate.now())
                .status(Goal.GoalStatus.ACTIVE)
                .build();

        goal = goalRepository.save(goal);
        log.info("Created goal {} for user {}", goal.getId(), user.getId());
        
        return GoalResponse.fromGoal(goal);
    }

    @Transactional(readOnly = true)
    public List<GoalResponse> getUserGoals(User user) {
        return goalRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(GoalResponse::fromGoal)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GoalResponse> getActiveGoals(User user) {
        return goalRepository.findActiveGoalsByUser(user)
                .stream()
                .map(GoalResponse::fromGoal)
                .collect(Collectors.toList());
    }

    @Transactional
    public GoalResponse recordProgress(User user, Long goalId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to goal");
        }

        LocalDate today = LocalDate.now();

        // Check if already completed today
        if (goal.getLastCompletionDate() != null && goal.getLastCompletionDate().equals(today)) {
            log.info("Goal {} already completed today", goalId);
            return GoalResponse.fromGoal(goal);
        }

        // Increment progress
        goal.setCurrentProgress(goal.getCurrentProgress() + 1);
        goal.setLastCompletionDate(today);
        goal.getCompletionDates().add(today);

        // Update streak
        updateStreak(goal);

        // Check if goal period is complete
        if (goal.getCurrentProgress() >= goal.getTargetCount()) {
            // Reset progress for next period
            goal.setCurrentProgress(0);
        }

        goal = goalRepository.save(goal);
        log.info("Recorded progress for goal {}: progress={}, streak={}", 
                goalId, goal.getCurrentProgress(), goal.getCurrentStreak());

        return GoalResponse.fromGoal(goal);
    }

    private void updateStreak(Goal goal) {
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        if (goal.getLastCompletionDate() == null) {
            // First completion
            goal.setCurrentStreak(1);
        } else if (goal.getLastCompletionDate().equals(yesterday)) {
            // Consecutive day
            goal.setCurrentStreak(goal.getCurrentStreak() + 1);
        } else if (!goal.getLastCompletionDate().equals(today)) {
            // Streak broken
            goal.setCurrentStreak(1);
        }

        // Update longest streak
        if (goal.getCurrentStreak() > goal.getLongestStreak()) {
            goal.setLongestStreak(goal.getCurrentStreak());
        }
    }

    @Transactional
    public GoalResponse updateGoalStatus(User user, Long goalId, Goal.GoalStatus status) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to goal");
        }

        goal.setStatus(status);
        goal = goalRepository.save(goal);
        
        log.info("Updated goal {} status to {}", goalId, status);
        return GoalResponse.fromGoal(goal);
    }

    @Transactional
    public void deleteGoal(User user, Long goalId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to goal");
        }

        goalRepository.delete(goal);
        log.info("Deleted goal {} for user {}", goalId, user.getId());
    }

    @Transactional(readOnly = true)
    public Long countActiveGoals(User user) {
        return goalRepository.countActiveGoalsByUser(user);
    }

    @Transactional(readOnly = true)
    public List<GoalResponse> getGoalsWithStreak(User user) {
        return goalRepository.findGoalsWithStreakByUser(user)
                .stream()
                .map(GoalResponse::fromGoal)
                .collect(Collectors.toList());
    }
}

