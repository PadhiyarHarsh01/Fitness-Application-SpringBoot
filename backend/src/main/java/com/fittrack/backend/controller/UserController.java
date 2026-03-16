package com.fittrack.backend.controller;

import com.fittrack.backend.dto.ChangePasswordRequest;
import com.fittrack.backend.dto.ProfileResponse;
import com.fittrack.backend.dto.ProfileUpdateRequest;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(Authentication auth) {
        String email = auth.getName();
        User user = userService.getByEmail(email);
        return ProfileResponse.from(user);
    }

    @PutMapping("/profile")
    public ProfileResponse updateProfile(Authentication auth,
                                @RequestBody ProfileUpdateRequest request) {
        String email = auth.getName();
        User user = userService.updateProfile(email, request);
        return ProfileResponse.from(user);
    }

    @PutMapping("/change-password")
    public String changePassword(Authentication auth,
                                 @RequestBody ChangePasswordRequest request) {
        String email = auth.getName();
        userService.changePassword(email, request);
        return "Password changed successfully";
    }
}
