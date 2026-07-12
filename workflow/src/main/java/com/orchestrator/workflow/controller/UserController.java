package com.orchestrator.workflow.controller;
import org.springframework.web.bind.annotation.*;
import lombok.*;
import com.orchestrator.workflow.service.UserService;
import com.orchestrator.workflow.dto.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.*;
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public UserDTO createUser(@RequestBody CreateUserDTO dto) {
        return userService.createUser(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDTO changeRole(
            @PathVariable Long id,
            @RequestParam String role) {

        return userService.changeRole(id, role);
    }

}