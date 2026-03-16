package com.fittrack.backend.dto;

import com.fittrack.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {

    private String name;
    private String email;
    private Integer age;
    private Integer height;
    private Integer weight;
    private String goal;
    private Integer dailyCalorieGoal;

    public static ProfileResponse from(User user) {
        return new ProfileResponse(
                user.getName(),
                user.getEmail(),
                user.getAge(),
                user.getHeight(),
                user.getWeight(),
                user.getGoal(),
                user.getDailyCalorieGoal()
        );
    }
}
