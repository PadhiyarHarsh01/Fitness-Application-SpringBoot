package com.fittrack.backend.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final OkHttpClient client = new OkHttpClient.Builder()
            .connectTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
            .writeTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
            .readTimeout(60, java.util.concurrent.TimeUnit.SECONDS)
            .build();

    public String generateReport(String prompt) throws IOException {
        MediaType mediaType = MediaType.parse("application/json");

        String body = """
                {
                    "contents" : [
                        {
                            "parts" : [
                                {
                                    "text" : "%s"
                                }
                            ]
                        }
                    ]
                }
                """.formatted(prompt.replace("\"", "\\\""));

        Request request = new Request.Builder()
                .url("https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" + apiKey)
                .post(RequestBody.create(body, mediaType))
                .addHeader("Content-Type", "application/json")
                .build();

        Response response = client.newCall(request).execute();

        return response.body().string();
    }
}
