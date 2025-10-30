package com.serenmind.service;

import com.lowagie.text.DocumentException;
import com.serenmind.model.AiReport;
import com.serenmind.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Unit tests for PDF generation service.
 */
class PdfGenerationServiceTest {

    private PdfGenerationService pdfGenerationService;
    private User testUser;

    @BeforeEach
    void setUp() {
        pdfGenerationService = new PdfGenerationService();
        
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setUsername("testuser");
    }

    @Test
    void generateReportPdf_WithValidReport_ShouldReturnPdfBytes() throws DocumentException {
        // Given
        AiReport report = createSampleReport();

        // When
        byte[] pdfBytes = pdfGenerationService.generateReportPdf(report);

        // Then
        assertThat(pdfBytes).isNotNull();
        assertThat(pdfBytes.length).isGreaterThan(0);
        
        // Verify PDF magic number (starts with %PDF)
        String pdfHeader = new String(pdfBytes, 0, 4);
        assertThat(pdfHeader).isEqualTo("%PDF");
    }

    @Test
    void generateReportPdf_WithFormattedContent_ShouldIncludeHeadings() throws DocumentException {
        // Given
        String formattedContent = """
                ## Summary
                This is a weekly summary of your mental wellness journey.
                
                ### Key Insights
                - You showed improved mood stability
                - Energy levels were consistent
                - Stress management improved
                
                ## Recommendations
                Continue your current practices and consider meditation.
                """;

        AiReport report = createSampleReport();
        report.setContent(formattedContent);

        // When
        byte[] pdfBytes = pdfGenerationService.generateReportPdf(report);

        // Then
        assertThat(pdfBytes).isNotNull();
        assertThat(pdfBytes.length).isGreaterThan(1000); // Should be substantial with formatting
    }

    @Test
    void generateReportPdf_WithMinimalContent_ShouldStillGenerate() throws DocumentException {
        // Given
        AiReport report = createSampleReport();
        report.setContent("Brief report content.");

        // When
        byte[] pdfBytes = pdfGenerationService.generateReportPdf(report);

        // Then
        assertThat(pdfBytes).isNotNull();
        assertThat(pdfBytes.length).isGreaterThan(0);
    }

    @Test
    void generateReportPdf_WithNullModelUsed_ShouldHandleGracefully() throws DocumentException {
        // Given
        AiReport report = createSampleReport();
        report.setModelUsed(null);
        report.setTokensUsed(null);

        // When
        byte[] pdfBytes = pdfGenerationService.generateReportPdf(report);

        // Then
        assertThat(pdfBytes).isNotNull();
        assertThat(pdfBytes.length).isGreaterThan(0);
    }

    @Test
    void generateReportPdf_WithDifferentReportTypes_ShouldFormatCorrectly() throws DocumentException {
        // Test different report types
        String[] reportTypes = {"WEEKLY_SUMMARY", "MOOD_ANALYSIS", "JOURNAL_INSIGHTS", "MONTHLY_REPORT"};

        for (String reportType : reportTypes) {
            // Given
            AiReport report = createSampleReport();
            report.setReportType(reportType);

            // When
            byte[] pdfBytes = pdfGenerationService.generateReportPdf(report);

            // Then
            assertThat(pdfBytes).isNotNull();
            assertThat(pdfBytes.length).isGreaterThan(0);
        }
    }

    @Test
    void generateReportPdf_WithLongContent_ShouldHandleMultiplePages() throws DocumentException {
        // Given
        StringBuilder longContent = new StringBuilder();
        longContent.append("## Comprehensive Mental Wellness Report\n\n");
        
        for (int i = 1; i <= 50; i++) {
            longContent.append("### Section ").append(i).append("\n\n");
            longContent.append("This is section ").append(i).append(" with detailed content. ");
            longContent.append("Lorem ipsum dolor sit amet, consectetur adipiscing elit. ");
            longContent.append("Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n");
        }

        AiReport report = createSampleReport();
        report.setContent(longContent.toString());

        // When
        byte[] pdfBytes = pdfGenerationService.generateReportPdf(report);

        // Then
        assertThat(pdfBytes).isNotNull();
        // Long content should result in larger PDF
        assertThat(pdfBytes.length).isGreaterThan(10000);
    }

    @Test
    void generateReportPdf_WithSpecialCharacters_ShouldHandleCorrectly() throws DocumentException {
        // Given
        String contentWithSpecialChars = """
                ## Report with Special Characters
                
                This report contains special characters: é, ñ, ü, ö
                
                Quotes: "double" and 'single'
                
                Symbols: © ® ™ € £ ¥
                
                Emoji-like: :) :( <3
                """;

        AiReport report = createSampleReport();
        report.setContent(contentWithSpecialChars);

        // When
        byte[] pdfBytes = pdfGenerationService.generateReportPdf(report);

        // Then
        assertThat(pdfBytes).isNotNull();
        assertThat(pdfBytes.length).isGreaterThan(0);
    }

    // Helper method to create sample report
    private AiReport createSampleReport() {
        AiReport report = new AiReport();
        report.setId(1L);
        report.setUser(testUser);
        report.setReportType("WEEKLY_SUMMARY");
        report.setContent("""
                ## Weekly Mental Wellness Summary
                
                This week has shown positive progress in your mental wellness journey.
                
                ### Mood Trends
                - Average mood score: 7.5/10
                - Most common mood: Happy
                - Energy levels: Stable
                
                ### Key Insights
                - You maintained consistent sleep patterns
                - Regular exercise contributed to better mood
                - Stress levels were well-managed
                
                ## Recommendations
                - Continue your current wellness routine
                - Consider adding meditation to your morning routine
                - Focus on maintaining work-life balance
                """);
        report.setModelUsed("gpt-4");
        report.setTokensUsed(500);
        report.setCreatedAt(LocalDateTime.now());
        
        return report;
    }
}

