package com.fittrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class RecentActivityDTO {
    private Long id;
    private String name;
    private String type;
    private int duration;
    private int calories;
    private LocalDate date;
}
