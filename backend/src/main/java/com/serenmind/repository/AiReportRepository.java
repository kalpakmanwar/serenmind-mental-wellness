package com.serenmind.repository;

import com.serenmind.model.AiReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiReportRepository extends JpaRepository<AiReport, Long> {

    List<AiReport> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<AiReport> findByUserIdAndReportTypeOrderByCreatedAtDesc(Long userId, String reportType);
}

