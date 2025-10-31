package com.serenmind.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiChatResponse {

    /**
     * Main AI response message.
     */
    private String reply;

    /**
     * Brief summary of user's current state based on context.
     */
    private String summary;

    /**
     * Actionable suggestions for the user.
     */
    private List<String> suggestions;

    /**
     * Metadata about the response.
     */
    private ResponseMetadata metadata;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResponseMetadata {
        private String model;
        private Integer tokensUsed;
        private Boolean isMockResponse;
        private Long responseTimeMs;
    }
}

