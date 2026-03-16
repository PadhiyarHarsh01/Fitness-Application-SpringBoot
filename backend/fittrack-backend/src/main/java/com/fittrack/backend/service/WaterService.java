package com.fittrack.backend.service;

import com.fittrack.backend.entity.User;
import com.fittrack.backend.entity.WaterIntake;
import com.fittrack.backend.repository.UserRepository;
import com.fittrack.backend.repository.WaterRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class WaterService {

    private final UserRepository  userRepository;
    private final WaterRepository waterRepository;

    public WaterService(UserRepository userRepository, WaterRepository waterRepository) {
        this.userRepository = userRepository;
        this.waterRepository = waterRepository;
    }

    @Transactional
    public void addGlass(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();

        WaterIntake activity = waterRepository
                .findByUserAndDate(user, today)
                .orElseGet(() -> {
                    WaterIntake newActivity = new WaterIntake();
                    newActivity.setUser(user);
                    newActivity.setDate(today);
                    newActivity.setGlasses(0);
                    return newActivity;
                });

        activity.setGlasses(activity.getGlasses() + 1);

        waterRepository.save(activity);
    }
}
