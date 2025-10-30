package com.serenmind.service;

import com.serenmind.dto.request.LoginRequest;
import com.serenmind.dto.request.RegisterRequest;
import com.serenmind.dto.response.AuthResponse;
import com.serenmind.model.User;
import com.serenmind.repository.RefreshTokenRepository;
import com.serenmind.repository.UserRepository;
import com.serenmind.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Unit tests for AuthService.
 */
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthServiceImpl authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User user;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setFullName("John Doe");
        registerRequest.setEmail("john@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setTimezone("UTC");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("john@example.com");
        loginRequest.setPassword("password123");

        user = User.builder()
                .id(1L)
                .fullName("John Doe")
                .email("john@example.com")
                .password("$2a$10$hashedPassword")
                .timezone("UTC")
                .isActive(true)
                .build();
    }

    @Test
    void testRegister_Success() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("$2a$10$hashedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtUtil.generateAccessToken(anyString())).thenReturn("access-token");
        when(jwtUtil.getAccessTokenExpirationMs()).thenReturn(900000L);
        when(refreshTokenRepository.save(any())).thenReturn(null);

        // Act
        AuthResponse response = authService.register(registerRequest);

        // Assert
        assertNotNull(response);
        assertEquals("access-token", response.getAccessToken());
        assertNotNull(response.getRefreshToken());
        assertEquals("Bearer", response.getTokenType());
        assertNotNull(response.getUser());
        assertEquals("john@example.com", response.getUser().getEmail());

        verify(userRepository).existsByEmail("john@example.com");
        verify(userRepository).save(any(User.class));
        verify(jwtUtil).generateAccessToken("john@example.com");
    }

    @Test
    void testRegister_EmailAlreadyExists() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            authService.register(registerRequest);
        });

        verify(userRepository).existsByEmail("john@example.com");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testLogin_Success() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(jwtUtil.generateAccessToken(anyString())).thenReturn("access-token");
        when(jwtUtil.getAccessTokenExpirationMs()).thenReturn(900000L);
        when(refreshTokenRepository.save(any())).thenReturn(null);

        // Act
        AuthResponse response = authService.login(loginRequest);

        // Assert
        assertNotNull(response);
        assertEquals("access-token", response.getAccessToken());
        assertNotNull(response.getRefreshToken());
        assertEquals("Bearer", response.getTokenType());

        verify(userRepository).findByEmail("john@example.com");
        verify(passwordEncoder).matches("password123", user.getPassword());
    }

    @Test
    void testLogin_InvalidCredentials() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        // Act & Assert
        assertThrows(BadCredentialsException.class, () -> {
            authService.login(loginRequest);
        });

        verify(userRepository).findByEmail("john@example.com");
        verify(passwordEncoder).matches("password123", user.getPassword());
        verify(jwtUtil, never()).generateAccessToken(anyString());
    }

    @Test
    void testLogin_UserNotFound() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(BadCredentialsException.class, () -> {
            authService.login(loginRequest);
        });

        verify(userRepository).findByEmail("john@example.com");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    void testLogin_InactiveUser() {
        // Arrange
        user.setIsActive(false);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        // Act & Assert
        assertThrows(IllegalStateException.class, () -> {
            authService.login(loginRequest);
        });

        verify(userRepository).findByEmail("john@example.com");
        verify(passwordEncoder).matches("password123", user.getPassword());
        verify(jwtUtil, never()).generateAccessToken(anyString());
    }
}

