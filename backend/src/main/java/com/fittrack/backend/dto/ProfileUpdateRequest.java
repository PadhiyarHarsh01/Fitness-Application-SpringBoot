package com.fittrack.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {

    private String name;
    private Integer age;
    private Integer height;
    private Integer weight;
    private String goal;
    private Integer dailyCalorieGoal;
}
