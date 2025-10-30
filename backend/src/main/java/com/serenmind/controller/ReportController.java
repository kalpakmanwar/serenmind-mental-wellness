package com.serenmind.controller;

import com.lowagie.text.DocumentException;
import com.serenmind.dto.response.AiReportResponse;
import com.serenmind.model.AiReport;
import com.serenmind.model.User;
import com.serenmind.repository.AiReportRepository;
import com.serenmind.repository.UserRepository;
import com.serenmind.service.PdfGenerationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST controller for AI report management and PDF downloads.
 */
@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Reports", description = "AI report management and PDF download endpoints")
@SecurityRequirement(name = "bearerAuth")
public class ReportController {

    private final AiReportRepository aiReportRepository;
    private final PdfGenerationService pdfGenerationService;
    private final UserRepository userRepository;

    @GetMapping
    @Operation(summary = "Get all reports for authenticated user", 
               description = "Returns list of all AI-generated reports for the user")
    public ResponseEntity<List<AiReportResponse>> getAllReports(Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Fetching all reports for user ID: {}", userId);

        List<AiReport> reports = aiReportRepository.findByUserIdOrderByCreatedAtDesc(userId);

        List<AiReportResponse> responses = reports.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get single report by ID", 
               description = "Returns detailed information about a specific report")
    public ResponseEntity<AiReportResponse> getReportById(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Fetching report ID: {} for user ID: {}", id, userId);

        AiReport report = aiReportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));

        // Verify ownership
        if (!report.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to access this report");
        }

        return ResponseEntity.ok(mapToResponse(report));
    }

    @GetMapping("/{id}/download")
    @Operation(summary = "Download report as PDF", 
               description = "Generates and downloads the report as a formatted PDF file")
    public ResponseEntity<ByteArrayResource> downloadReportPdf(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Downloading PDF for report ID: {} for user ID: {}", id, userId);

        AiReport report = aiReportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));

        // Verify ownership
        if (!report.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to access this report");
        }

        try {
            // Generate PDF
            byte[] pdfBytes = pdfGenerationService.generateReportPdf(report);

            // Create filename with report type and date
            String filename = generateFilename(report);

            // Prepare response
            ByteArrayResource resource = new ByteArrayResource(pdfBytes);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(pdfBytes.length)
                    .body(resource);

        } catch (DocumentException e) {
            log.error("Error generating PDF for report ID: {}", id, e);
            throw new RuntimeException("Failed to generate PDF: " + e.getMessage());
        }
    }

    @GetMapping("/type/{reportType}")
    @Operation(summary = "Get reports by type", 
               description = "Returns all reports of a specific type (e.g., WEEKLY_SUMMARY, MOOD_ANALYSIS)")
    public ResponseEntity<List<AiReportResponse>> getReportsByType(
            @PathVariable String reportType,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Fetching reports of type '{}' for user ID: {}", reportType, userId);

        List<AiReport> reports = aiReportRepository.findByUserIdAndReportTypeOrderByCreatedAtDesc(
                userId, reportType.toUpperCase());

        List<AiReportResponse> responses = reports.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a report", 
               description = "Permanently deletes a report")
    public ResponseEntity<Void> deleteReport(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserIdFromAuth(authentication);
        log.info("Deleting report ID: {} for user ID: {}", id, userId);

        AiReport report = aiReportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));

        // Verify ownership
        if (!report.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to delete this report");
        }

        aiReportRepository.delete(report);
        log.info("Report deleted successfully");

        return ResponseEntity.noContent().build();
    }

    /**
     * Map AiReport entity to response DTO.
     */
    private AiReportResponse mapToResponse(AiReport report) {
        // Extract summary (first paragraph or first 200 characters)
        String summary = extractSummary(report.getContent());

        return AiReportResponse.builder()
                .id(report.getId())
                .reportType(report.getReportType())
                .content(report.getContent())
                .summary(summary)
                .tokensUsed(report.getTokensUsed())
                .modelUsed(report.getModelUsed())
                .isMockResponse(report.getModelUsed() != null && report.getModelUsed().contains("mock"))
                .createdAt(report.getCreatedAt())
                .build();
    }

    /**
     * Extract summary from report content.
     */
    private String extractSummary(String content) {
        if (content == null || content.isEmpty()) {
            return "";
        }

        // Try to get first paragraph
        String[] paragraphs = content.split("\n\n");
        if (paragraphs.length > 0) {
            String firstPara = paragraphs[0].trim();
            // Remove markdown headers
            firstPara = firstPara.replaceAll("^#+\\s*", "");
            
            // Limit to 200 characters
            if (firstPara.length() > 200) {
                return firstPara.substring(0, 200) + "...";
            }
            return firstPara;
        }

        // Fallback to first 200 characters
        if (content.length() > 200) {
            return content.substring(0, 200) + "...";
        }

        return content;
    }

    /**
     * Generate filename for PDF download.
     */
    private String generateFilename(AiReport report) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = report.getCreatedAt().format(formatter);
        String type = report.getReportType().toLowerCase().replace("_", "-");
        
        return String.format("serenmind-%s-%s-report-%d.pdf", type, date, report.getId());
    }

    /**
     * Extract user ID from authentication.
     */
    private Long getUserIdFromAuth(Authentication authentication) {
        String email = authentication.getName(); // Email from JWT subject
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
        return user.getId();
    }
}

