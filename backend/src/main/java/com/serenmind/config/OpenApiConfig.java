package com.serenmind.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI (Swagger) configuration.
 * Provides API documentation at /swagger-ui.html
 * 
 * @author Kalpak Manwar
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .info(new Info()
                        .title("SerenMind API")
                        .version("1.0.0")
                        .description("Mental wellness application REST API with mood tracking, journaling, and AI insights. " +
                                   "Developed by Kalpak Manwar as part of a mental wellness initiative to make mental health support more accessible.")
                        .contact(new Contact()
                                .name("Kalpak Manwar")
                                .email("kalpakmanwar@gmail.com")
                                .url("https://serenmind.app"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}
