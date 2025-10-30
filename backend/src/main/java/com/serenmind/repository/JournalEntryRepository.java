package com.serenmind.repository;

import com.serenmind.model.JournalEntry;
import com.serenmind.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {

    List<JournalEntry> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<JournalEntry> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    List<JournalEntry> findByUserIdAndIsFavoriteTrueOrderByCreatedAtDesc(Long userId);

    List<JournalEntry> findByUserIdAndTagsContainingOrderByCreatedAtDesc(Long userId, String tag);
}

