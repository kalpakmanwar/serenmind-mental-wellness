package com.serenmind.dto.request;

import com.serenmind.model.Goal;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalRequest {

    @NotBlank(message = "Goal title is required")
    private String title;

    private String description;

    @NotNull(message = "Goal type is required")
    private Goal.GoalType type;

    @NotNull(message = "Target count is required")
    @Min(value = 1, message = "Target count must be at least 1")
    private Integer targetCount;

    @NotNull(message = "Goal period is required")
    private Goal.GoalPeriod period;
}

