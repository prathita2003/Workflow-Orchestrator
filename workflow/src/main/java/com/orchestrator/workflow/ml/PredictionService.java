package com.orchestrator.workflow.ml;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final RestTemplate restTemplate;

    @Value("${ml.service.url}")
    private String mlUrl;

    public PredictionResponse predictDuration(
            PredictionRequest request
    ) {

        PredictionResponse response =
                restTemplate.postForObject(
                        mlUrl + "/predict",
                        request,
                        PredictionResponse.class
                );

        return response;
    }
}