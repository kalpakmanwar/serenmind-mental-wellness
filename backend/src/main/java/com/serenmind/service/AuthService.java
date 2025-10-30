package com.serenmind.service;

import com.serenmind.dto.request.LoginRequest;
import com.serenmind.dto.request.RegisterRequest;
import com.serenmind.dto.request.RefreshTokenRequest;
import com.serenmind.dto.response.AuthResponse;

/**
 * Service interface for authentication operations.
 */
public interface AuthService {

    /**
     * Register a new user.
     */
    AuthResponse register(RegisterRequest request);

    /**
     * Authenticate user and generate tokens.
     */
    AuthResponse login(LoginRequest request);

    /**
     * Refresh access token using refresh token.
     */
    AuthResponse refreshToken(RefreshTokenRequest request);

    /**
     * Logout user (revoke refresh token).
     */
    void logout(String refreshToken);
}

