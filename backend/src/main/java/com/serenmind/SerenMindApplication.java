package com.serenmind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Main application class for SerenMind mental wellness application.
 * 
 * DEVELOPER: Kalpak Shrikrushna Manwar
 * EMAIL: kalpakm11@gmail.com
 * PHONE: +91-8767309198
 * 
 * This application provides REST APIs for:
 * - User authentication and authorization (JWT-based)
 * - Mood tracking and analytics with Chart.js visualization
 * - Journal entries with search and favorites
 * - AI-powered insights using OpenAI GPT
 * - PDF report generation
 * - Wellness goals and progress tracking with streaks
 * - Crisis mode for emergency support
 * - Push notifications for daily reminders
 * 
 * Technologies: Spring Boot 3.2, Spring Security, MySQL 8, 
 *               JPA/Hibernate, OpenAI API, JWT, Flyway
 * 
 * @author Kalpak Shrikrushna Manwar (kalpakm11@gmail.com)
 * @version 1.0.0
 * @since October 2025
 */
@SpringBootApplication
@EnableJpaAuditing
public class SerenMindApplication {

    private static final Logger logger = LoggerFactory.getLogger(SerenMindApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SerenMindApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        logger.info("\n" +
            "╔═══════════════════════════════════════════════════════════════╗\n" +
            "║                                                               ║\n" +
            "║              🌸  SerenMind Backend API Started  🌸            ║\n" +
            "║                                                               ║\n" +
            "║                Your Mental Wellness Companion                 ║\n" +
            "║                                                               ║\n" +
            "║  Developed by: Kalpak Manwar                                  ║\n" +
            "║  Email: kalpakmanwar@gmail.com                                ║\n" +
            "║  Phone: +91-8767309198                                        ║\n" +
            "║                                                               ║\n" +
            "║  API Documentation: http://localhost:8080/swagger-ui.html    ║\n" +
            "║  Health Check:      http://localhost:8080/actuator/health    ║\n" +
            "║                                                               ║\n" +
            "║  Application is ready to accept requests! ✅                  ║\n" +
            "║                                                               ║\n" +
            "╚═══════════════════════════════════════════════════════════════╝"
        );
    }
}
