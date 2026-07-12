package com.orchestrator.workflow.config;

import com.orchestrator.workflow.dto.WorkflowEvent;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.consumer.ConsumerConfig;

import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.kafka.core.*;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

import java.util.*;

@EnableKafka
@Configuration
@ConditionalOnProperty(
    name = "app.kafka.enabled",
    havingValue = "true"
)
public class KafkaConfig
{
    @Bean
    public ProducerFactory<String, WorkflowEvent> producerFactory()
    {
        Map<String,Object> config=new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,"localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,JsonSerializer.class);
        
        return new DefaultKafkaProducerFactory<>(config);
    }
    @Bean
    public KafkaTemplate<String,WorkflowEvent> kafkaTemplate()
    {
        return new KafkaTemplate<>(producerFactory());
    }
    @Bean
    public ConsumerFactory<String, WorkflowEvent> consumerFactory()
    {
        JsonDeserializer<WorkflowEvent> deserializer=new JsonDeserializer<>(WorkflowEvent.class);
        deserializer.addTrustedPackages("*");
        Map<String, Object> config=new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,"localhost:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"workflow-group");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,JsonDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(config,new StringDeserializer(),deserializer);
    }
    
    @Bean
public ConcurrentKafkaListenerContainerFactory<String, WorkflowEvent>
kafkaListenerContainerFactory()
{
    ConcurrentKafkaListenerContainerFactory<String, WorkflowEvent> factory =
            new ConcurrentKafkaListenerContainerFactory<>();

    factory.setConsumerFactory(consumerFactory());

    return factory;
}
}
