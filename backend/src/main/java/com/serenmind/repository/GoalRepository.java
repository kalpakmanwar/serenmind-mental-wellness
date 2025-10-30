package com.serenmind.repository;

import com.serenmind.model.Goal;
import com.serenmind.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByUserOrderByCreatedAtDesc(User user);

    List<Goal> findByUserAndStatusOrderByCreatedAtDesc(User user, Goal.GoalStatus status);

    @Query("SELECT g FROM Goal g WHERE g.user = :user AND g.status = 'ACTIVE' ORDER BY g.createdAt DESC")
    List<Goal> findActiveGoalsByUser(@Param("user") User user);

    @Query("SELECT COUNT(g) FROM Goal g WHERE g.user = :user AND g.status = 'ACTIVE'")
    Long countActiveGoalsByUser(@Param("user") User user);

    @Query("SELECT g FROM Goal g WHERE g.user = :user AND g.currentStreak > 0 ORDER BY g.currentStreak DESC")
    List<Goal> findGoalsWithStreakByUser(@Param("user") User user);
}

