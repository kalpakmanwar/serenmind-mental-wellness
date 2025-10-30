package com.serenmind.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serenmind.client.OpenAiClient;
import com.serenmind.client.OpenAiRequest;
import com.serenmind.client.OpenAiResponse;
import com.serenmind.dto.request.AiChatRequest;
import com.serenmind.dto.request.AiReportRequest;
import com.serenmind.dto.response.AiChatResponse;
import com.serenmind.dto.response.AiReportResponse;
import com.serenmind.model.AiReport;
import com.serenmind.model.JournalEntry;
import com.serenmind.model.MoodEntry;
import com.serenmind.model.User;
import com.serenmind.repository.AiReportRepository;
import com.serenmind.repository.JournalEntryRepository;
import com.serenmind.repository.MoodEntryRepository;
import com.serenmind.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of AiService with full OpenAI integration.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AiServiceImpl implements AiService {

    private final OpenAiClient openAiClient;
    private final UserRepository userRepository;
    private final MoodEntryRepository moodEntryRepository;
    private final JournalEntryRepository journalEntryRepository;
    private final AiReportRepository aiReportRepository;
    private final ObjectMapper objectMapper;

    @Value("${app.openai.model:gpt-4}")
    private String model;

    @Value("${app.openai.mock-mode:true}")
    private Boolean mockMode;

    @Value("${app.openai.temperature:0.7}")
    private Double temperature;

    @Value("${app.openai.max-tokens:1000}")
    private Integer maxTokens;

    @Override
    @Transactional(readOnly = true)
    public AiChatResponse chat(Long userId, AiChatRequest request) {
        log.info("Generating AI chat response for user ID: {}", userId);
        long startTime = System.currentTimeMillis();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Prepare context from recent mood and journal entries
        String context = prepareUserContext(userId, request.getContextSize() != null ? request.getContextSize() : 5);

        // Build OpenAI request
        OpenAiRequest openAiRequest = buildChatRequest(user, request.getMessage(), context);

        // Call OpenAI API
        OpenAiResponse openAiResponse = openAiClient.chatCompletion(openAiRequest);

        // Parse structured response
        AiChatResponse response = parseAiResponse(openAiResponse);

        // Add metadata
        long responseTime = System.currentTimeMillis() - startTime;
        AiChatResponse.ResponseMetadata metadata = AiChatResponse.ResponseMetadata.builder()
                .model(openAiResponse.getModel())
                .tokensUsed(openAiResponse.getUsage() != null ? openAiResponse.getUsage().getTotalTokens() : 0)
                .isMockResponse(mockMode)
                .responseTimeMs(responseTime)
                .build();
        response.setMetadata(metadata);

        log.info("AI chat response generated in {}ms, tokens: {}", responseTime, 
                 metadata.getTokensUsed());

        return response;
    }

    @Override
    @Transactional
    public AiReportResponse generateReport(Long userId, AiReportRequest request) {
        log.info("Generating AI report type '{}' for user ID: {}", request.getReportType(), userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Get data for specified number of days
        int days = request.getDaysToInclude() != null ? request.getDaysToInclude() : 7;
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        LocalDateTime endDate = LocalDateTime.now();

        // Fetch user data
        List<MoodEntry> moods = moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                userId, startDate, endDate);
        List<JournalEntry> journals = journalEntryRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .filter(j -> j.getCreatedAt().isAfter(startDate))
                .limit(10)
                .collect(Collectors.toList());

        // Build report prompt
        String prompt = buildReportPrompt(request.getReportType(), moods, journals, days);

        // Build OpenAI request
        OpenAiRequest openAiRequest = OpenAiRequest.builder()
                .model(model)
                .temperature(temperature)
                .maxTokens(maxTokens * 2) // Reports can be longer
                .messages(List.of(
                        OpenAiRequest.Message.builder()
                                .role("system")
                                .content("You are a compassionate mental wellness AI assistant. Generate detailed, actionable reports based on user data.")
                                .build(),
                        OpenAiRequest.Message.builder()
                                .role("user")
                                .content(prompt)
                                .build()
                ))
                .build();

        // Call OpenAI API
        OpenAiResponse openAiResponse = openAiClient.chatCompletion(openAiRequest);
        String content = openAiResponse.getChoices().get(0).getMessage().getContent();

        // Create and save report
        AiReport aiReport = AiReport.builder()
                .user(user)
                .reportType(request.getReportType())
                .content(content)
                .metadata("{\"days\": " + days + "}")
                .promptUsed(prompt.substring(0, Math.min(500, prompt.length())) + "...")
                .modelUsed(openAiResponse.getModel())
                .tokensUsed(openAiResponse.getUsage() != null ? openAiResponse.getUsage().getTotalTokens() : 0)
                .build();

        aiReport = aiReportRepository.save(aiReport);
        log.info("AI report saved with ID: {}", aiReport.getId());

        // Extract summary (first paragraph)
        String summary = content.split("\n\n")[0];

        return AiReportResponse.builder()
                .id(aiReport.getId())
                .reportType(aiReport.getReportType())
                .content(content)
                .summary(summary)
                .tokensUsed(aiReport.getTokensUsed())
                .modelUsed(aiReport.getModelUsed())
                .isMockResponse(mockMode)
                .createdAt(aiReport.getCreatedAt())
                .build();
    }

    /**
     * Prepare user context from recent mood and journal entries.
     */
    private String prepareUserContext(Long userId, int contextSize) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);

        // Get recent mood entries
        List<MoodEntry> recentMoods = moodEntryRepository
                .findByUserIdAndTimestampBetweenOrderByTimestampDesc(userId, sevenDaysAgo, LocalDateTime.now())
                .stream()
                .limit(contextSize)
                .collect(Collectors.toList());

        // Get recent journal entries
        List<JournalEntry> recentJournals = journalEntryRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .filter(j -> j.getCreatedAt().isAfter(sevenDaysAgo))
                .limit(Math.min(3, contextSize))
                .collect(Collectors.toList());

        StringBuilder context = new StringBuilder();
        context.append("## User's Recent Activity\n\n");

        // Add mood context
        if (!recentMoods.isEmpty()) {
            context.append("### Recent Mood Entries:\n");
            for (MoodEntry mood : recentMoods) {
                context.append(String.format("- %s: Mood %d/10, Energy %d/10, Stress %d/10. %s\n",
                        mood.getTimestamp().format(DateTimeFormatter.ofPattern("MMM dd")),
                        mood.getMoodScore(),
                        mood.getEnergyLevel() != null ? mood.getEnergyLevel() : 0,
                        mood.getStressLevel() != null ? mood.getStressLevel() : 0,
                        mood.getNotes() != null ? "\"" + mood.getNotes() + "\"" : ""
                ));
            }
            context.append("\n");
        } else {
            context.append("### Recent Mood Entries:\nNo recent mood entries.\n\n");
        }

        // Add journal context
        if (!recentJournals.isEmpty()) {
            context.append("### Recent Journal Entries:\n");
            for (JournalEntry journal : recentJournals) {
                String snippet = journal.getContent().length() > 150 
                    ? journal.getContent().substring(0, 150) + "..." 
                    : journal.getContent();
                context.append(String.format("- %s: \"%s\" - %s\n",
                        journal.getCreatedAt().format(DateTimeFormatter.ofPattern("MMM dd")),
                        journal.getTitle(),
                        snippet
                ));
            }
            context.append("\n");
        } else {
            context.append("### Recent Journal Entries:\nNo recent journal entries.\n\n");
        }

        return context.toString();
    }

    /**
     * Build OpenAI chat request with system prompt and user context.
     */
    private OpenAiRequest buildChatRequest(User user, String userMessage, String context) {
        String systemPrompt = "You are an intelligent, helpful AI assistant similar to ChatGPT. " +
                "You can answer ANY question on ANY topic - technology, science, math, history, advice, coding, etc. " +
                "While you're part of SerenMind (a mental wellness app), you can discuss anything the user asks about. " +
                "Always respond in valid JSON format with these fields: " +
                "{ \"reply\": \"your helpful response\", " +
                "\"summary\": \"brief summary (optional, can be empty)\", " +
                "\"suggestions\": [\"helpful tip 1\", \"tip 2\", ...] }. " +
                "Be conversational, knowledgeable, and friendly. " +
                "For mental health questions, be empathetic and supportive.";

        String userPrompt = String.format(
                "%s\n\n## User's Message:\n%s\n\n" +
                "Please provide a supportive response in JSON format.",
                context, userMessage
        );

        return OpenAiRequest.builder()
                .model(model)
                .temperature(temperature)
                .maxTokens(maxTokens)
                .messages(List.of(
                        OpenAiRequest.Message.builder().role("system").content(systemPrompt).build(),
                        OpenAiRequest.Message.builder().role("user").content(userPrompt).build()
                ))
                .build();
    }

    /**
     * Build report generation prompt.
     */
    private String buildReportPrompt(String reportType, List<MoodEntry> moods, 
                                     List<JournalEntry> journals, int days) {
        StringBuilder prompt = new StringBuilder();
        prompt.append(String.format("Generate a %s report for the past %d days.\n\n", reportType, days));

        // Add mood statistics
        if (!moods.isEmpty()) {
            double avgMood = moods.stream().mapToInt(MoodEntry::getMoodScore).average().orElse(0);
            int highest = moods.stream().mapToInt(MoodEntry::getMoodScore).max().orElse(0);
            int lowest = moods.stream().mapToInt(MoodEntry::getMoodScore).min().orElse(0);

            prompt.append(String.format("## Mood Statistics:\n" +
                    "- Average mood: %.1f/10\n" +
                    "- Highest: %d/10\n" +
                    "- Lowest: %d/10\n" +
                    "- Total entries: %d\n\n", avgMood, highest, lowest, moods.size()));

            prompt.append("## Mood Entries:\n");
            moods.forEach(m -> prompt.append(String.format("- %s: %d/10 - %s\n",
                    m.getTimestamp().format(DateTimeFormatter.ofPattern("MMM dd")),
                    m.getMoodScore(),
                    m.getNotes() != null ? m.getNotes() : ""
            )));
            prompt.append("\n");
        }

        // Add journal excerpts
        if (!journals.isEmpty()) {
            prompt.append("## Journal Entries:\n");
            journals.forEach(j -> {
                String excerpt = j.getContent().length() > 200 
                    ? j.getContent().substring(0, 200) + "..." 
                    : j.getContent();
                prompt.append(String.format("- %s: \"%s\" - %s\n",
                        j.getCreatedAt().format(DateTimeFormatter.ofPattern("MMM dd")),
                        j.getTitle(),
                        excerpt
                ));
            });
            prompt.append("\n");
        }

        prompt.append("Please provide:\n" +
                "1. Overall summary of the user's mental wellness trend\n" +
                "2. Key patterns identified\n" +
                "3. Positive highlights to celebrate\n" +
                "4. Areas for improvement\n" +
                "5. Specific, actionable recommendations");

        return prompt.toString();
    }

    /**
     * Parse structured JSON response from OpenAI.
     */
    private AiChatResponse parseAiResponse(OpenAiResponse openAiResponse) {
        String content = openAiResponse.getChoices().get(0).getMessage().getContent();

        try {
            // Extract JSON from response (may be wrapped in markdown code blocks)
            String jsonContent = content;
            if (content.contains("```json")) {
                jsonContent = content.substring(content.indexOf("```json") + 7);
                jsonContent = jsonContent.substring(0, jsonContent.indexOf("```"));
            } else if (content.contains("```")) {
                jsonContent = content.substring(content.indexOf("```") + 3);
                jsonContent = jsonContent.substring(0, jsonContent.indexOf("```"));
            }

            JsonNode jsonNode = objectMapper.readTree(jsonContent.trim());

            // Extract fields
            String reply = jsonNode.has("reply") ? jsonNode.get("reply").asText() : content;
            String summary = jsonNode.has("summary") ? jsonNode.get("summary").asText() : "";
            
            List<String> suggestions = new ArrayList<>();
            if (jsonNode.has("suggestions") && jsonNode.get("suggestions").isArray()) {
                jsonNode.get("suggestions").forEach(s -> suggestions.add(s.asText()));
            }

            return AiChatResponse.builder()
                    .reply(reply)
                    .summary(summary)
                    .suggestions(suggestions)
                    .build();

        } catch (JsonProcessingException e) {
            log.warn("Failed to parse JSON response, using raw content: {}", e.getMessage());
            // Fallback to raw content
            return AiChatResponse.builder()
                    .reply(content)
                    .summary("")
                    .suggestions(List.of())
                    .build();
        }
    }

    // Legacy methods for backward compatibility
    @Override
    public String generateChatResponse(Long userId, String userMessage) {
        AiChatRequest request = new AiChatRequest(userMessage, 5);
        AiChatResponse response = chat(userId, request);
        return response.getReply();
    }

    @Override
    public String generateWeeklySummary(Long userId) {
        AiReportRequest request = new AiReportRequest("WEEKLY_SUMMARY", 7);
        AiReportResponse response = generateReport(userId, request);
        return response.getContent();
    }

    @Override
    public String analyzeJournalEntry(Long userId, Long journalEntryId) {
        // Simplified implementation
        return "Journal analysis feature - use generateReport with JOURNAL_ANALYSIS type";
    }
}
