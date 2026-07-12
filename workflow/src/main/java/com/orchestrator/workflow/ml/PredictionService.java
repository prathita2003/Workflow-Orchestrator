package com.orchestrator.workflow.ml;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final RestTemplate restTemplate;

    private static final String ML_URL =
            "http://localhost:8000/predict";

    public PredictionResponse predictDuration(
            PredictionRequest request
    ) {

        PredictionResponse response =
                restTemplate.postForObject(

                        ML_URL,

                        request,

                        PredictionResponse.class

                );

        return response;

    }

}