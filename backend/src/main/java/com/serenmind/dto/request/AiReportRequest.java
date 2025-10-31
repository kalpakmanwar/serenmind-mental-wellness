package com.serenmind.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiReportRequest {

    @NotBlank(message = "Report type is required")
    private String reportType; // e.g., "WEEKLY_SUMMARY", "MOOD_ANALYSIS", "JOURNAL_INSIGHTS"

    /**
     * Optional: Number of days to include in report.
     * Default: 7 days
     */
    private Integer daysToInclude;
}

