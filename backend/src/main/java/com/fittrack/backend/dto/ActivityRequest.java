package com.fittrack.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityRequest {
    private String name;
    private String type;
    private int duration;
    private int calories;
    private String date; //YYYY-MM-DD
}
