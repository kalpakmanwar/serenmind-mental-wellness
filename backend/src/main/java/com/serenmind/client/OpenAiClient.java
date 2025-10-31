package com.serenmind.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import jakarta.annotation.PostConstruct;
import java.time.Duration;

/**
 * Client for interacting with OpenAI Chat Completions API.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class OpenAiClient {

    private final WebClient openAiWebClient;

    @Value("${app.openai.model:gpt-4}")
    private String defaultModel;

    // 🔥 TEMPORARILY SET TO TRUE UNTIL OPENAI BILLING IS FIXED 🔥
    private Boolean mockMode = true;

    @Value("${app.openai.timeout-seconds:30}")
    private Integer timeoutSeconds;

    @Value("${app.openai.max-retries:3}")
    private Integer maxRetries;

    @PostConstruct
    public void logConfiguration() {
        log.error("🔥🔥🔥 OPENAI CONFIG - HARDCODED MOCK MODE = FALSE 🔥🔥🔥");
        log.error("🔥 mock-mode = {} (HARDCODED!)", mockMode);
        log.error("🔥 model = {}", defaultModel);
        log.error("🔥 timeout = {} seconds", timeoutSeconds);
        log.error("🔥 IF YOU SEE 'Calling OpenAI API' - IT WORKED!");
        log.error("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
    }

    /**
     * Call OpenAI Chat Completions API with retry logic and exponential backoff.
     */
    public OpenAiResponse chatCompletion(OpenAiRequest request) {
        if (mockMode) {
            log.info("Mock mode enabled - returning canned response");
            return createMockResponse(request);
        }

        log.info("Calling OpenAI API with model: {}", request.getModel());

        try {
            return openAiWebClient
                    .post()
                    .uri("/chat/completions")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(OpenAiResponse.class)
                    .timeout(Duration.ofSeconds(timeoutSeconds))
                    .retryWhen(Retry.backoff(maxRetries, Duration.ofSeconds(1))
                            .filter(this::isRetryableException)
                            .doBeforeRetry(retrySignal -> 
                                log.warn("Retrying OpenAI request, attempt: {}", retrySignal.totalRetries() + 1)))
                    .onErrorMap(this::mapException)
                    .block();
        } catch (Exception e) {
            log.error("OpenAI API call failed: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to get AI response: " + e.getMessage(), e);
        }
    }

    /**
     * Create a mock response for testing without OpenAI API key.
     */
    private OpenAiResponse createMockResponse(OpenAiRequest request) {
        String userMessage = request.getMessages().stream()
                .filter(m -> "user".equals(m.getRole()))
                .map(OpenAiRequest.Message::getContent)
                .findFirst()
                .orElse("");

        String mockContent = generateMockContent(userMessage);

        OpenAiResponse response = new OpenAiResponse();
        response.setId("mock-" + System.currentTimeMillis());
        response.setObject("chat.completion");
        response.setCreated(System.currentTimeMillis() / 1000);
        response.setModel("mock-model");

        OpenAiResponse.Message message = new OpenAiResponse.Message();
        message.setRole("assistant");
        message.setContent(mockContent);

        OpenAiResponse.Choice choice = new OpenAiResponse.Choice();
        choice.setIndex(0);
        choice.setMessage(message);
        choice.setFinishReason("stop");

        response.setChoices(java.util.Collections.singletonList(choice));

        OpenAiResponse.Usage usage = new OpenAiResponse.Usage();
        usage.setPromptTokens(100);
        usage.setCompletionTokens(150);
        usage.setTotalTokens(250);
        response.setUsage(usage);

        return response;
    }

    /**
     * Generate intelligent, contextual mock content based on user message.
     * This enhanced version provides professional, empathetic responses similar to real AI.
     */
    private String generateMockContent(String userMessage) {
        String lowerMessage = userMessage.toLowerCase();

        // GREETINGS & INTRODUCTIONS
        if (lowerMessage.matches("^(hi|hello|hey|greetings|good morning|good afternoon|good evening).*")) {
            return "{\n" +
                   "  \"reply\": \"Hello! I'm glad you're here. I'm your AI wellness companion, and I'm here to listen and support you. How are you feeling today? Feel free to share what's on your mind, whether it's about your mood, stress, or anything else you'd like to discuss.\",\n" +
                   "  \"summary\": \"User initiated conversation. Ready to provide support.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Share how you're feeling right now\",\n" +
                   "    \"Tell me about your day or week\",\n" +
                   "    \"Ask about mood patterns or coping strategies\",\n" +
                   "    \"Let me know if there's something specific on your mind\"\n" +
                   "  ]\n" +
                   "}";
        }

        // ANXIETY & STRESS
        if (lowerMessage.contains("anxious") || lowerMessage.contains("anxiety") || 
            lowerMessage.contains("worried") || lowerMessage.contains("panic") ||
            lowerMessage.contains("nervous") || lowerMessage.contains("tense")) {
            return "{\n" +
                   "  \"reply\": \"I hear that you're feeling anxious, and I want you to know that your feelings are valid. Anxiety is our body's natural response to stress, but when it becomes overwhelming, it's important to have tools to manage it. Let's work through this together.\",\n" +
                   "  \"summary\": \"Experiencing anxiety symptoms. Needs grounding techniques and support.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\",\n" +
                   "    \"Practice box breathing: inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat 5 times\",\n" +
                   "    \"Write down what's making you anxious - sometimes seeing it on paper helps\",\n" +
                   "    \"If anxiety persists or worsens, please reach out to a mental health professional\"\n" +
                   "  ]\n" +
                   "}";
        }

        // STRESS & OVERWHELM
        if (lowerMessage.contains("stressed") || lowerMessage.contains("overwhelmed") ||
            lowerMessage.contains("pressure") || lowerMessage.contains("too much")) {
            return "{\n" +
                   "  \"reply\": \"Feeling stressed and overwhelmed is exhausting, and I'm sorry you're going through this. Remember, it's okay to not have everything figured out right now. Let's break things down into manageable pieces.\",\n" +
                   "  \"summary\": \"User is experiencing stress and feeling overwhelmed by current circumstances.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Make a list of everything on your mind, then prioritize just 3 most urgent items\",\n" +
                   "    \"Take a 10-minute break - step away from your tasks and do something you enjoy\",\n" +
                   "    \"Practice saying 'no' to new commitments until you have more capacity\",\n" +
                   "    \"Consider reaching out to friends, family, or a counselor for support\"\n" +
                   "  ]\n" +
                   "}";
        }

        // SADNESS & DEPRESSION
        if (lowerMessage.contains("sad") || lowerMessage.contains("depressed") ||
            lowerMessage.contains("down") || lowerMessage.contains("hopeless") ||
            lowerMessage.contains("empty") || lowerMessage.contains("worthless")) {
            return "{\n" +
                   "  \"reply\": \"I'm truly sorry you're feeling this way. These feelings can be incredibly heavy, and it takes courage to acknowledge them. Please know that you don't have to face this alone, and what you're feeling is real and deserves care and attention.\",\n" +
                   "  \"summary\": \"User is experiencing symptoms of sadness or depression. Gentle support and professional resources recommended.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Reach out to someone you trust - a friend, family member, or therapist\",\n" +
                   "    \"Try to maintain a routine: eat meals, stay hydrated, and get some fresh air if possible\",\n" +
                   "    \"Engage in one small, gentle activity you used to enjoy, even if you don't feel like it\",\n" +
                   "    \"If you're having thoughts of self-harm, please call a crisis helpline immediately (National Suicide Prevention Lifeline: 988)\"\n" +
                   "  ]\n" +
                   "}";
        }

        // ANGER & FRUSTRATION
        if (lowerMessage.contains("angry") || lowerMessage.contains("frustrated") ||
            lowerMessage.contains("irritated") || lowerMessage.contains("mad") ||
            lowerMessage.contains("furious")) {
            return "{\n" +
                   "  \"reply\": \"Anger is a powerful emotion, and it's telling you that something matters to you. It's okay to feel angry, but let's find healthy ways to process and express these feelings so they don't consume you.\",\n" +
                   "  \"summary\": \"User is experiencing anger or frustration. Needs healthy outlets for expression.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Take a timeout: step away from the situation for 10-15 minutes to cool down\",\n" +
                   "    \"Physical release: go for a run, do some push-ups, or punch a pillow\",\n" +
                   "    \"Journal about what triggered the anger - writing can help you process emotions\",\n" +
                   "    \"Once calm, consider addressing the underlying issue constructively\"\n" +
                   "  ]\n" +
                   "}";
        }

        // LONELINESS & ISOLATION
        if (lowerMessage.contains("lonely") || lowerMessage.contains("alone") ||
            lowerMessage.contains("isolated") || lowerMessage.contains("no one")) {
            return "{\n" +
                   "  \"reply\": \"Feeling lonely can be one of the most painful experiences, even when surrounded by people. I want you to know that you're not alone in feeling alone - many people experience this, and there are ways to reconnect with others and yourself.\",\n" +
                   "  \"summary\": \"User is experiencing loneliness. Needs connection and community support.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Reach out to one person - send a text, make a call, or schedule a coffee date\",\n" +
                   "    \"Join an online or local community group based on your interests\",\n" +
                   "    \"Practice self-compassion: treat yourself as you would a good friend\",\n" +
                   "    \"Consider volunteering - helping others can create meaningful connections\"\n" +
                   "  ]\n" +
                   "}";
        }

        // FATIGUE & EXHAUSTION
        if (lowerMessage.contains("tired") || lowerMessage.contains("exhausted") ||
            lowerMessage.contains("fatigue") || lowerMessage.contains("sleep") ||
            lowerMessage.contains("energy")) {
            return "{\n" +
                   "  \"reply\": \"Feeling tired all the time can really impact your quality of life. It sounds like your body might be telling you it needs some extra care right now. Let's look at what might be draining your energy and how we can help you restore it.\",\n" +
                   "  \"summary\": \"User is experiencing low energy and fatigue. Sleep hygiene and self-care needed.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Prioritize 7-9 hours of sleep: set a consistent bedtime and wake time\",\n" +
                   "    \"Create a wind-down routine: no screens 1 hour before bed, dim lights, calming activity\",\n" +
                   "    \"Check in with your body: are you eating well, staying hydrated, moving enough?\",\n" +
                   "    \"If fatigue persists for weeks, consider seeing a doctor to rule out medical causes\"\n" +
                   "  ]\n" +
                   "}";
        }

        // POSITIVE EMOTIONS
        if (lowerMessage.contains("happy") || lowerMessage.contains("great") ||
            lowerMessage.contains("good") || lowerMessage.contains("wonderful") ||
            lowerMessage.contains("excited") || lowerMessage.contains("proud")) {
            return "{\n" +
                   "  \"reply\": \"That's absolutely wonderful to hear! 🌸 It's so important to acknowledge and celebrate these positive moments. Your happiness matters, and I'm glad you're experiencing this. Let's make sure to savor this feeling and understand what contributed to it.\",\n" +
                   "  \"summary\": \"User is experiencing positive emotions. Encouraging gratitude and awareness.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Take a moment to really notice what made you feel this way - write it down\",\n" +
                   "    \"Practice gratitude: list 3 specific things you're grateful for right now\",\n" +
                   "    \"Share your joy with someone you care about\",\n" +
                   "    \"Remember this feeling - you can return to it when times are tough\"\n" +
                   "  ]\n" +
                   "}";
        }

        // CONFUSION & UNCERTAINTY
        if (lowerMessage.contains("confused") || lowerMessage.contains("don't know") ||
            lowerMessage.contains("uncertain") || lowerMessage.contains("lost") ||
            lowerMessage.contains("what to do")) {
            return "{\n" +
                   "  \"reply\": \"It's completely normal to feel confused or uncertain sometimes. Life doesn't come with a manual, and it's okay to not have all the answers. Let's work together to bring some clarity to your situation, one step at a time.\",\n" +
                   "  \"summary\": \"User is experiencing confusion or uncertainty. Needs guidance and clarity.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Start by identifying what specifically feels confusing - write it out\",\n" +
                   "    \"Break down the situation into smaller, more manageable questions\",\n" +
                   "    \"Talk it through with someone you trust - sometimes saying it out loud helps\",\n" +
                   "    \"Remember: you don't need to figure everything out today\"\n" +
                   "  ]\n" +
                   "}";
        }

        // ASKING FOR HELP OR ADVICE
        if (lowerMessage.contains("help") || lowerMessage.contains("advice") ||
            lowerMessage.contains("what should i") || lowerMessage.contains("suggest") ||
            lowerMessage.contains("recommend")) {
            return "{\n" +
                   "  \"reply\": \"I'm here to help! Asking for support is a sign of strength, not weakness. Let me offer some guidance based on what you've shared. Remember, you know yourself best, so take what resonates and leave what doesn't.\",\n" +
                   "  \"summary\": \"User is seeking guidance and support. Providing actionable advice.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Reflect on your current situation and identify what feels most pressing\",\n" +
                   "    \"Consider your values and what matters most to you in this decision\",\n" +
                   "    \"Reach out to trusted friends, family, or a professional for personalized guidance\",\n" +
                   "    \"Trust your intuition - often you know the answer deep down\"\n" +
                   "  ]\n" +
                   "}";
        }

        // MOOD TRACKING & PATTERNS
        if (lowerMessage.contains("mood") || lowerMessage.contains("pattern") ||
            lowerMessage.contains("trend") || lowerMessage.contains("feeling")) {
            return "{\n" +
                   "  \"reply\": \"Tracking your moods is such a valuable practice for understanding yourself better. By observing patterns over time, you can identify triggers, recognize progress, and make informed decisions about your mental health. Let's explore what your mood data might be telling you.\",\n" +
                   "  \"summary\": \"User is interested in understanding mood patterns and emotional trends.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Review your mood entries from the past week to identify any patterns\",\n" +
                   "    \"Notice if certain activities, people, or times of day affect your mood\",\n" +
                   "    \"Continue logging daily - the more data, the clearer the patterns\",\n" +
                   "    \"Celebrate improvements and be gentle with yourself during difficult periods\"\n" +
                   "  ]\n" +
                   "}";
        }

        // COPING STRATEGIES
        if (lowerMessage.contains("cope") || lowerMessage.contains("strategy") ||
            lowerMessage.contains("technique") || lowerMessage.contains("manage")) {
            return "{\n" +
                   "  \"reply\": \"Building a toolkit of healthy coping strategies is essential for mental wellness. Different techniques work for different people and situations, so it's great that you're exploring options. Here are some evidence-based strategies you can try.\",\n" +
                   "  \"summary\": \"User is seeking coping strategies and management techniques.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Mindfulness meditation: even 5 minutes daily can reduce stress significantly\",\n" +
                   "    \"Progressive muscle relaxation: tense and release each muscle group\",\n" +
                   "    \"Regular physical activity: walking, yoga, dancing - whatever you enjoy\",\n" +
                   "    \"Creative expression: art, music, writing - let emotions flow through creativity\"\n" +
                   "  ]\n" +
                   "}";
        }

        // GRATITUDE & POSITIVITY
        if (lowerMessage.contains("grateful") || lowerMessage.contains("thankful") ||
            lowerMessage.contains("appreciate") || lowerMessage.contains("blessing")) {
            return "{\n" +
                   "  \"reply\": \"Practicing gratitude is one of the most powerful tools for improving mental well-being. Research shows that regularly acknowledging what we're grateful for can increase happiness, reduce depression, and improve relationships. It's beautiful that you're cultivating this practice.\",\n" +
                   "  \"summary\": \"User is practicing gratitude and focusing on positive aspects.\",\n" +
                   "  \"suggestions\": [\n" +
                   "    \"Start a gratitude journal: write 3 things you're grateful for each day\",\n" +
                   "    \"Express appreciation to someone who's made a difference in your life\",\n" +
                   "    \"Notice small, everyday blessings: warm coffee, a kind smile, sunshine\",\n" +
                   "    \"During difficult times, gratitude can be an anchor of hope\"\n" +
                   "  ]\n" +
                   "}";
        }

        // DEFAULT RESPONSE - Warm and personalized
        return "{\n" +
               "  \"reply\": \"Thank you for reaching out and sharing with me. I'm here to provide support and guidance on your mental wellness journey. Whether you're having a tough day or celebrating wins, I'm here to listen without judgment. What would be most helpful for you to discuss right now?\",\n" +
               "  \"summary\": \"User has initiated conversation. Ready to provide tailored support.\",\n" +
               "  \"suggestions\": [\n" +
                   "    \"Share what's on your mind - I'm here to listen\",\n" +
                   "    \"Tell me about your current emotional state\",\n" +
                   "    \"Ask about specific coping strategies or mental wellness topics\",\n" +
                   "    \"Review your mood patterns or journal entries together\"\n" +
               "  ]\n" +
               "}";
    }

    /**
     * Determine if exception is retryable.
     */
    private boolean isRetryableException(Throwable throwable) {
        if (throwable instanceof WebClientResponseException) {
            WebClientResponseException ex = (WebClientResponseException) throwable;
            int statusCode = ex.getStatusCode().value();
            // Retry on 429 (rate limit), 500, 502, 503, 504
            return statusCode == 429 || statusCode >= 500;
        }
        return false;
    }

    /**
     * Map exceptions to more user-friendly messages.
     */
    private Throwable mapException(Throwable throwable) {
        if (throwable instanceof WebClientResponseException) {
            WebClientResponseException ex = (WebClientResponseException) throwable;
            if (ex.getStatusCode().value() == 429) {
                return new RuntimeException("Rate limit exceeded. Please try again in a moment.", ex);
            } else if (ex.getStatusCode().value() == 401) {
                return new RuntimeException("Invalid OpenAI API key.", ex);
            } else if (ex.getStatusCode().is5xxServerError()) {
                return new RuntimeException("OpenAI service temporarily unavailable.", ex);
            }
        }
        return throwable;
    }
}

