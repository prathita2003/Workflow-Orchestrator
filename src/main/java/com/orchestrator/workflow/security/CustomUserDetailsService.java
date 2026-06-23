package com.orchestrator.workflow.security;

import com.orchestrator.workflow.entity.User;
import com.orchestrator.workflow.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomUserDetailsService implements UserDetailsService
{
    private final UserRepository ur;
    public CustomUserDetailsService(UserRepository ur)
    {
        this.ur=ur;
    }
    
    @Override
public UserDetails loadUserByUsername(String username)
        throws UsernameNotFoundException
{
    User user=
            ur.findByUsername(username)
                    .orElseThrow(() ->
                            new UsernameNotFoundException(
                                    "User not found"
                            )
                    );

    return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            List.of(
                    new SimpleGrantedAuthority(
                            "ROLE_"+user.getRole().name()
                    )
            )
    );
}
}
