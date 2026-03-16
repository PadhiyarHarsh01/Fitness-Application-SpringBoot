package com.fittrack.backend.controller;

import com.fittrack.backend.dto.ActivityRequest;
import com.fittrack.backend.entity.Activity;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.UserRepository;
import com.fittrack.backend.service.ActivityService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;
    private final UserRepository userRepository;

    public ActivityController(ActivityService activityService, UserRepository userRepository) {
        this.activityService = activityService;
        this.userRepository = userRepository;
    }

    private User getUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName()).orElseThrow();
    }

    @PostMapping
    public Object create(@RequestBody ActivityRequest req, Authentication auth) {
        return activityService.create(req, getUser(auth));    
    }

    @GetMapping
    public Object list(Authentication auth) {
        return activityService.getUserActivities(getUser(auth));
    }

    @PutMapping("/{id}")
    public Object update(@PathVariable long id, @RequestBody ActivityRequest req) {
        return activityService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        activityService.delete(id);
    }
}
