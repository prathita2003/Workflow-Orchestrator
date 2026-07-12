package com.orchestrator.workflow.ml;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ml")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping("/predict")
    public PredictionResponse predictDuration(
            @RequestBody PredictionRequest request
    ) {

        return predictionService.predictDuration(request);

    }

}