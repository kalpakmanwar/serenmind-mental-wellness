package com.serenmind.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiReportResponse {

    private Long id;
    private String reportType;
    private String content;
    private String summary;
    private Integer tokensUsed;
    private String modelUsed;
    private Boolean isMockResponse;
    private LocalDateTime createdAt;
}

