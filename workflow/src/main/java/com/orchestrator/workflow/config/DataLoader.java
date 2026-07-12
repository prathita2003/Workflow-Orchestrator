package com.orchestrator.workflow.config;

import com.orchestrator.workflow.entity.User;
import com.orchestrator.workflow.enums.Role;
import com.orchestrator.workflow.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader 
{
    @Bean
    CommandLineRunner loadUsers(UserRepository ur, PasswordEncoder pe)
    {
        return args->{
            if(ur.count()==0)
            {
                User admin=new User();
                admin.setUsername("admin");
                admin.setPassword(pe.encode("admin123"));
                admin.setRole(Role.ADMIN);
                
                User operator=new User();
                operator.setUsername("operator");
                operator.setPassword(pe.encode("operator123"));
                operator.setRole(Role.OPERATOR);
                
                User viewer=new User();
                viewer.setUsername("viewer");
                viewer.setPassword(pe.encode("viewer123"));
                viewer.setRole(Role.VIEWER);
                
                ur.save(admin);
                ur.save(operator);
                ur.save(viewer);
            }
        };
    }
}
