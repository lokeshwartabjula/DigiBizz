package net.javaguides.springboot.Springboothellworldapplication.service.impl;

import net.javaguides.springboot.Springboothellworldapplication.dto.UserDTO;
import net.javaguides.springboot.Springboothellworldapplication.exception.AlreadyExistsException;
import net.javaguides.springboot.Springboothellworldapplication.exception.NotFoundException;
import net.javaguides.springboot.Springboothellworldapplication.model.User;
import net.javaguides.springboot.Springboothellworldapplication.repository.UserRepository;
import net.javaguides.springboot.Springboothellworldapplication.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j(topic="USER_SERVICE")
@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public void addUser(UserDTO userDTO) {
        String email = userDTO.getEmail();
        User userExists = userRepository.findByEmail(email);

        if(userExists != null) {
            throw new AlreadyExistsException("User already exists with email id: " + userDTO.getEmail());
        }

        User user = new User(userDTO);
        userRepository.save(user);
        log.info(String.format("User %s added successfully", email));
    }

    @Override
    public UserDTO getUser(String email) {
        User user = userRepository.findByEmail(email);

        if(user == null) {
            throw new NotFoundException("No user found");
        }
        log.info(String.format("User %s fetched successfully", email));

        UserDTO userDTO = new UserDTO(user.getFirstName(), user.getLastName(), user.getEmail(), null);
        return userDTO;
    }
}
