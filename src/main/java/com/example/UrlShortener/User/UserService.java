package com.example.UrlShortener.User;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(User user) {
            Optional<User> existing_user = userRepository.findByEmail(user.getEmail());
            if (!existing_user.isPresent()) {
                return userRepository.save(user);
            }
        return userRepository.save(user);



        }
}
