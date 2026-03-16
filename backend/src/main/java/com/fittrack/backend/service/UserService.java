package com.fittrack.backend.service;

import com.fittrack.backend.dto.ChangePasswordRequest;
import com.fittrack.backend.dto.ProfileResponse;
import com.fittrack.backend.dto.ProfileUpdateRequest;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String email, ProfileUpdateRequest req) {
        User user = getByEmail(email);

        user.setName(req.getName());
        user.setAge(req.getAge());
        user.setHeight(req.getHeight());
        user.setWeight(req.getWeight());
        user.setGoal(req.getGoal());
        user.setDailyCalorieGoal(req.getDailyCalorieGoal());

        return userRepository.save(user);
    }

    public void changePassword(String email, ChangePasswordRequest req) {
        User user = getByEmail(email);

        if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current Password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
    }
}
