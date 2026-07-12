package com.orchestrator.workflow.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.*;

@Configuration
public class OpenApiConfig 
{
    @Bean
    public OpenAPI workflowOpenAPI()
    {
        return new OpenAPI().info(new Info()
        .title("Workflow Orchestrator API")
        .version("1.0")
        .description("Distributed Workflow Orchestration Platform")
        );
    }
}
