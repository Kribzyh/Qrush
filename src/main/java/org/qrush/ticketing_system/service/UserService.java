package org.qrush.ticketing_system.service;

import org.qrush.ticketing_system.entity.UserEntity;
import org.qrush.ticketing_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private static final String USER_ID_REQUIRED = "User ID must not be null";

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserEntity> getUserById(Long id) {
        return userRepository.findById(Objects.requireNonNull(id, USER_ID_REQUIRED));
    }

    public Optional<UserEntity> getUserByEmail(String email) {
        return userRepository.findByEmail(Objects.requireNonNull(email, "Email must not be null"));
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(Objects.requireNonNull(user, "User must not be null"));
    }

    public UserEntity updateUser(Long id, UserEntity updatedUser) {
        Objects.requireNonNull(id, USER_ID_REQUIRED);
        Objects.requireNonNull(updatedUser, "Updated user must not be null");
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            user.setContact(updatedUser.getContact());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(Objects.requireNonNull(id, USER_ID_REQUIRED));
    }
}
