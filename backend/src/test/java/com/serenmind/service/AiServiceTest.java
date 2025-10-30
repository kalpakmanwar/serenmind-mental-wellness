package com.serenmind.service;

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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for AiService.
 */
@ExtendWith(MockitoExtension.class)
class AiServiceTest {

    @Mock
    private OpenAiClient openAiClient;

    @Mock
    private UserRepository userRepository;

    @Mock
    private MoodEntryRepository moodEntryRepository;

    @Mock
    private JournalEntryRepository journalEntryRepository;

    @Mock
    private AiReportRepository aiReportRepository;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private AiServiceImpl aiService;

    private User testUser;
    private List<MoodEntry> mockMoodEntries;
    private List<JournalEntry> mockJournalEntries;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .fullName("Test User")
                .email("test@example.com")
                .build();

        mockMoodEntries = Arrays.asList(
                MoodEntry.builder()
                        .id(1L)
                        .user(testUser)
                        .moodScore(8)
                        .energyLevel(9)
                        .stressLevel(2)
                        .notes("Feeling great today!")
                        .timestamp(LocalDateTime.now().minusDays(1))
                        .build(),
                MoodEntry.builder()
                        .id(2L)
                        .user(testUser)
                        .moodScore(7)
                        .energyLevel(7)
                        .stressLevel(3)
                        .notes("Good morning")
                        .timestamp(LocalDateTime.now().minusDays(2))
                        .build()
        );

        mockJournalEntries = Collections.singletonList(
                JournalEntry.builder()
                        .id(1L)
                        .user(testUser)
                        .title("Daily Reflection")
                        .content("Today was productive. Completed my goals and felt accomplished.")
                        .createdAt(LocalDateTime.now().minusDays(1))
                        .build()
        );

        // Set default property values
        ReflectionTestUtils.setField(aiService, "model", "gpt-4");
        ReflectionTestUtils.setField(aiService, "mockMode", true);
        ReflectionTestUtils.setField(aiService, "temperature", 0.7);
        ReflectionTestUtils.setField(aiService, "maxTokens", 1000);
    }

    @Test
    void testChat_Success_WithMockMode() {
        // Arrange
        AiChatRequest request = new AiChatRequest("I'm feeling anxious today", 5);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                anyLong(), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(mockMoodEntries);
        when(journalEntryRepository.findByUserIdOrderByCreatedAtDesc(anyLong()))
                .thenReturn(mockJournalEntries);

        // Create mock OpenAI response
        OpenAiResponse mockOpenAiResponse = createMockOpenAiResponse(
                "{\n" +
                "  \"reply\": \"I understand you're feeling anxious. This is a common experience.\",\n" +
                "  \"summary\": \"User is experiencing anxiety.\",\n" +
                "  \"suggestions\": [\"Try breathing exercises\", \"Take a walk\", \"Journal your feelings\"]\n" +
                "}"
        );

        when(openAiClient.chatCompletion(any(OpenAiRequest.class))).thenReturn(mockOpenAiResponse);
        when(objectMapper.readTree(anyString())).thenCallRealMethod();

        // Act
        AiChatResponse response = aiService.chat(1L, request);

        // Assert
        assertNotNull(response);
        assertNotNull(response.getReply());
        assertNotNull(response.getSummary());
        assertNotNull(response.getSuggestions());
        assertNotNull(response.getMetadata());
        assertTrue(response.getMetadata().getIsMockResponse());
        assertEquals("mock-model", response.getMetadata().getModel());

        verify(openAiClient, times(1)).chatCompletion(any(OpenAiRequest.class));
        verify(userRepository, times(1)).findById(1L);
        verify(moodEntryRepository, times(1)).findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                anyLong(), any(LocalDateTime.class), any(LocalDateTime.class));
    }

    @Test
    void testChat_UserNotFound_ThrowsException() {
        // Arrange
        AiChatRequest request = new AiChatRequest("Hello", 5);
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> aiService.chat(1L, request));
        verify(openAiClient, never()).chatCompletion(any());
    }

    @Test
    void testChat_WithContext_IncludesMoodAndJournal() {
        // Arrange
        AiChatRequest request = new AiChatRequest("How am I doing?", 3);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                anyLong(), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(mockMoodEntries);
        when(journalEntryRepository.findByUserIdOrderByCreatedAtDesc(anyLong()))
                .thenReturn(mockJournalEntries);

        OpenAiResponse mockOpenAiResponse = createMockOpenAiResponse(
                "{\"reply\":\"You're doing well!\",\"summary\":\"Positive trend\",\"suggestions\":[]}"
        );

        when(openAiClient.chatCompletion(any(OpenAiRequest.class))).thenReturn(mockOpenAiResponse);

        // Act
        AiChatResponse response = aiService.chat(1L, request);

        // Assert
        assertNotNull(response);
        verify(moodEntryRepository, times(1)).findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                eq(1L), any(LocalDateTime.class), any(LocalDateTime.class));
        verify(journalEntryRepository, times(1)).findByUserIdOrderByCreatedAtDesc(1L);
    }

    @Test
    void testGenerateReport_Success() {
        // Arrange
        AiReportRequest request = new AiReportRequest("WEEKLY_SUMMARY", 7);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                anyLong(), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(mockMoodEntries);
        when(journalEntryRepository.findByUserIdOrderByCreatedAtDesc(anyLong()))
                .thenReturn(mockJournalEntries);

        OpenAiResponse mockOpenAiResponse = createMockOpenAiResponse(
                "## Weekly Summary\n\nYou've had a great week with consistent mood scores averaging 7.5/10..."
        );

        when(openAiClient.chatCompletion(any(OpenAiRequest.class))).thenReturn(mockOpenAiResponse);

        AiReport savedReport = AiReport.builder()
                .id(1L)
                .user(testUser)
                .reportType("WEEKLY_SUMMARY")
                .content("## Weekly Summary...")
                .modelUsed("mock-model")
                .tokensUsed(250)
                .createdAt(LocalDateTime.now())
                .build();

        when(aiReportRepository.save(any(AiReport.class))).thenReturn(savedReport);

        // Act
        AiReportResponse response = aiService.generateReport(1L, request);

        // Assert
        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("WEEKLY_SUMMARY", response.getReportType());
        assertNotNull(response.getContent());
        assertNotNull(response.getSummary());
        assertEquals(250, response.getTokensUsed());
        assertTrue(response.getIsMockResponse());

        verify(aiReportRepository, times(1)).save(any(AiReport.class));
    }

    @Test
    void testGenerateReport_WithCustomDays() {
        // Arrange
        AiReportRequest request = new AiReportRequest("MOOD_ANALYSIS", 14);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                anyLong(), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(mockMoodEntries);
        when(journalEntryRepository.findByUserIdOrderByCreatedAtDesc(anyLong()))
                .thenReturn(mockJournalEntries);

        OpenAiResponse mockOpenAiResponse = createMockOpenAiResponse("Report content");
        when(openAiClient.chatCompletion(any(OpenAiRequest.class))).thenReturn(mockOpenAiResponse);

        AiReport savedReport = AiReport.builder()
                .id(2L)
                .user(testUser)
                .reportType("MOOD_ANALYSIS")
                .content("Report content")
                .modelUsed("mock-model")
                .tokensUsed(200)
                .createdAt(LocalDateTime.now())
                .build();

        when(aiReportRepository.save(any(AiReport.class))).thenReturn(savedReport);

        // Act
        AiReportResponse response = aiService.generateReport(1L, request);

        // Assert
        assertNotNull(response);
        assertEquals("MOOD_ANALYSIS", response.getReportType());
        verify(moodEntryRepository, times(1)).findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                eq(1L), any(LocalDateTime.class), any(LocalDateTime.class));
    }

    @Test
    void testGenerateReport_EmptyMoodData_HandlesGracefully() {
        // Arrange
        AiReportRequest request = new AiReportRequest("WEEKLY_SUMMARY", 7);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                anyLong(), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(Collections.emptyList());
        when(journalEntryRepository.findByUserIdOrderByCreatedAtDesc(anyLong()))
                .thenReturn(Collections.emptyList());

        OpenAiResponse mockOpenAiResponse = createMockOpenAiResponse(
                "No recent data available. Start tracking your mood to get insights!"
        );

        when(openAiClient.chatCompletion(any(OpenAiRequest.class))).thenReturn(mockOpenAiResponse);

        AiReport savedReport = AiReport.builder()
                .id(3L)
                .user(testUser)
                .reportType("WEEKLY_SUMMARY")
                .content("No recent data available...")
                .modelUsed("mock-model")
                .tokensUsed(50)
                .createdAt(LocalDateTime.now())
                .build();

        when(aiReportRepository.save(any(AiReport.class))).thenReturn(savedReport);

        // Act
        AiReportResponse response = aiService.generateReport(1L, request);

        // Assert
        assertNotNull(response);
        assertNotNull(response.getContent());
        verify(aiReportRepository, times(1)).save(any(AiReport.class));
    }

    @Test
    void testLegacyMethods_StillWork() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(moodEntryRepository.findByUserIdAndTimestampBetweenOrderByTimestampDesc(
                anyLong(), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(mockMoodEntries);
        when(journalEntryRepository.findByUserIdOrderByCreatedAtDesc(anyLong()))
                .thenReturn(mockJournalEntries);

        OpenAiResponse mockOpenAiResponse = createMockOpenAiResponse(
                "{\"reply\":\"Test reply\",\"summary\":\"Test\",\"suggestions\":[]}"
        );

        when(openAiClient.chatCompletion(any(OpenAiRequest.class))).thenReturn(mockOpenAiResponse);

        // Act
        String response = aiService.generateChatResponse(1L, "Test message");

        // Assert
        assertNotNull(response);
        verify(openAiClient, times(1)).chatCompletion(any(OpenAiRequest.class));
    }

    /**
     * Helper method to create mock OpenAI response.
     */
    private OpenAiResponse createMockOpenAiResponse(String content) {
        OpenAiResponse response = new OpenAiResponse();
        response.setId("mock-123");
        response.setObject("chat.completion");
        response.setCreated(System.currentTimeMillis() / 1000);
        response.setModel("mock-model");

        OpenAiResponse.Message message = new OpenAiResponse.Message();
        message.setRole("assistant");
        message.setContent(content);

        OpenAiResponse.Choice choice = new OpenAiResponse.Choice();
        choice.setIndex(0);
        choice.setMessage(message);
        choice.setFinishReason("stop");

        response.setChoices(Collections.singletonList(choice));

        OpenAiResponse.Usage usage = new OpenAiResponse.Usage();
        usage.setPromptTokens(100);
        usage.setCompletionTokens(150);
        usage.setTotalTokens(250);
        response.setUsage(usage);

        return response;
    }
}

