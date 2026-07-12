package com.orchestrator.workflow.service;

import com.orchestrator.workflow.dto.CreateUserDTO;
import com.orchestrator.workflow.dto.UserDTO;
import com.orchestrator.workflow.entity.User;
import com.orchestrator.workflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.orchestrator.workflow.enums.Role;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public List<UserDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getRole().name()
                ))
                .toList();

    }

    public UserDTO createUser(CreateUserDTO dto) {

        if(userRepository.findByUsername(dto.getUsername()).isPresent()){

            throw new RuntimeException("Username already exists.");

        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Role.valueOf(dto.getRole().toUpperCase()));
        userRepository.save(user);
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

    }

    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));
        userRepository.delete(user);

    }

    public UserDTO changeRole(Long id, String role) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));
        user.setRole(Role.valueOf(role.toUpperCase()));
        userRepository.save(user);
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

    }

}