package com.serenmind.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * OpenAI Chat Completions API request model.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpenAiRequest {

    private String model;
    private List<Message> messages;
    private Double temperature;
    private Integer maxTokens;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Message {
        private String role;  // "system", "user", "assistant"
        private String content;
    }
}

