package com.serenmind.repository;

import com.serenmind.model.MoodEntry;
import com.serenmind.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {

    List<MoodEntry> findByUserIdOrderByTimestampDesc(Long userId);

    List<MoodEntry> findByUserOrderByTimestampDesc(User user, Pageable pageable);

    List<MoodEntry> findByUserIdAndTimestampBetweenOrderByTimestampDesc(
        Long userId, 
        LocalDateTime startDate, 
        LocalDateTime endDate
    );

    @Query("SELECT AVG(m.moodScore) FROM MoodEntry m WHERE m.user.id = :userId " +
           "AND m.timestamp >= :startDate AND m.timestamp <= :endDate")
    Double calculateAverageMood(
        @Param("userId") Long userId,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
}

