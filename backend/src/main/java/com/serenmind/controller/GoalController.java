package com.serenmind.controller;

import com.serenmind.dto.request.GoalRequest;
import com.serenmind.dto.response.GoalResponse;
import com.serenmind.model.Goal;
import com.serenmind.model.User;
import com.serenmind.repository.UserRepository;
import com.serenmind.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
@Slf4j
public class GoalController {

    private final GoalService goalService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<GoalResponse> createGoal(
            Authentication authentication,
            @Valid @RequestBody GoalRequest request
    ) {
        Long userId = getUserIdFromAuth(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GoalResponse response = goalService.createGoal(user, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GoalResponse>> getUserGoals(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GoalResponse> goals = goalService.getUserGoals(user);
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/active")
    public ResponseEntity<List<GoalResponse>> getActiveGoals(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GoalResponse> goals = goalService.getActiveGoals(user);
        return ResponseEntity.ok(goals);
    }

    @PostMapping("/{goalId}/progress")
    public ResponseEntity<GoalResponse> recordProgress(
            Authentication authentication,
            @PathVariable Long goalId
    ) {
        Long userId = getUserIdFromAuth(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GoalResponse response = goalService.recordProgress(user, goalId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{goalId}/status")
    public ResponseEntity<GoalResponse> updateStatus(
            Authentication authentication,
            @PathVariable Long goalId,
            @RequestParam Goal.GoalStatus status
    ) {
        Long userId = getUserIdFromAuth(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GoalResponse response = goalService.updateGoalStatus(user, goalId, status);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal(
            Authentication authentication,
            @PathVariable Long goalId
    ) {
        Long userId = getUserIdFromAuth(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        goalService.deleteGoal(user, goalId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countActiveGoals(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long count = goalService.countActiveGoals(user);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/streaks")
    public ResponseEntity<List<GoalResponse>> getGoalsWithStreak(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<GoalResponse> goals = goalService.getGoalsWithStreak(user);
        return ResponseEntity.ok(goals);
    }

    private Long getUserIdFromAuth(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}

