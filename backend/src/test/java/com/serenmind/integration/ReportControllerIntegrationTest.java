package com.serenmind.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.serenmind.model.AiReport;
import com.serenmind.model.User;
import com.serenmind.repository.AiReportRepository;
import com.serenmind.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for Report Controller.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class ReportControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AiReportRepository aiReportRepository;

    private User testUser;
    private AiReport testReport;

    @BeforeEach
    void setUp() {
        // Clean up
        aiReportRepository.deleteAll();
        userRepository.deleteAll();

        // Create test user
        testUser = new User();
        testUser.setEmail("report@test.com");
        testUser.setUsername("reportuser");
        testUser.setPasswordHash("$2a$10$dummyhash");
        testUser = userRepository.save(testUser);

        // Create test report
        testReport = new AiReport();
        testReport.setUser(testUser);
        testReport.setReportType("WEEKLY_SUMMARY");
        testReport.setContent("## Test Report\n\nThis is a test report content.");
        testReport.setModelUsed("gpt-4");
        testReport.setTokensUsed(250);
        testReport.setCreatedAt(LocalDateTime.now());
        testReport = aiReportRepository.save(testReport);
    }

    @Test
    @WithMockUser(username = "reportuser")
    void getAllReports_ShouldReturnUserReports() throws Exception {
        mockMvc.perform(get("/api/reports"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(testReport.getId().intValue())))
                .andExpect(jsonPath("$[0].reportType", is("WEEKLY_SUMMARY")))
                .andExpect(jsonPath("$[0].modelUsed", is("gpt-4")))
                .andExpect(jsonPath("$[0].tokensUsed", is(250)));
    }

    @Test
    @WithMockUser(username = "reportuser")
    void getReportById_WithValidId_ShouldReturnReport() throws Exception {
        mockMvc.perform(get("/api/reports/{id}", testReport.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is(testReport.getId().intValue())))
                .andExpect(jsonPath("$.reportType", is("WEEKLY_SUMMARY")))
                .andExpect(jsonPath("$.content", containsString("Test Report")));
    }

    @Test
    @WithMockUser(username = "reportuser")
    void getReportById_WithInvalidId_ShouldReturn400() throws Exception {
        mockMvc.perform(get("/api/reports/{id}", 99999L))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "reportuser")
    void downloadReportPdf_WithValidId_ShouldReturnPdf() throws Exception {
        mockMvc.perform(get("/api/reports/{id}/download", testReport.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(header().string("Content-Disposition", 
                    containsString("attachment")))
                .andExpect(header().string("Content-Disposition", 
                    containsString("serenmind-weekly-summary")))
                .andExpect(header().string("Content-Disposition", 
                    containsString(".pdf")));
    }

    @Test
    @WithMockUser(username = "reportuser")
    void downloadReportPdf_WithInvalidId_ShouldReturn400() throws Exception {
        mockMvc.perform(get("/api/reports/{id}/download", 99999L))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "reportuser")
    void getReportsByType_ShouldReturnFilteredReports() throws Exception {
        // Create another report of different type
        AiReport moodReport = new AiReport();
        moodReport.setUser(testUser);
        moodReport.setReportType("MOOD_ANALYSIS");
        moodReport.setContent("Mood analysis content");
        moodReport.setModelUsed("gpt-3.5-turbo");
        moodReport.setTokensUsed(150);
        moodReport.setCreatedAt(LocalDateTime.now());
        aiReportRepository.save(moodReport);

        // Get only WEEKLY_SUMMARY reports
        mockMvc.perform(get("/api/reports/type/{reportType}", "WEEKLY_SUMMARY"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].reportType", is("WEEKLY_SUMMARY")));

        // Get only MOOD_ANALYSIS reports
        mockMvc.perform(get("/api/reports/type/{reportType}", "MOOD_ANALYSIS"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].reportType", is("MOOD_ANALYSIS")));
    }

    @Test
    @WithMockUser(username = "reportuser")
    void deleteReport_WithValidId_ShouldDeleteReport() throws Exception {
        mockMvc.perform(delete("/api/reports/{id}", testReport.getId()))
                .andExpect(status().isNoContent());

        // Verify deletion
        mockMvc.perform(get("/api/reports/{id}", testReport.getId()))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "reportuser")
    void deleteReport_WithInvalidId_ShouldReturn400() throws Exception {
        mockMvc.perform(delete("/api/reports/{id}", 99999L))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "reportuser")
    void getAllReports_WithMultipleReports_ShouldReturnOrderedByDateDesc() throws Exception {
        // Create additional reports
        for (int i = 0; i < 3; i++) {
            AiReport report = new AiReport();
            report.setUser(testUser);
            report.setReportType("MOOD_ANALYSIS");
            report.setContent("Report " + i);
            report.setModelUsed("gpt-4");
            report.setTokensUsed(200);
            report.setCreatedAt(LocalDateTime.now().plusDays(i));
            aiReportRepository.save(report);
        }

        mockMvc.perform(get("/api/reports"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                // Most recent should be first
                .andExpect(jsonPath("$[0].content", containsString("Report 2")));
    }
}

