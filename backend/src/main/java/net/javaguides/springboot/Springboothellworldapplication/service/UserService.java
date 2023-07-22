package net.javaguides.springboot.Springboothellworldapplication.service;

import net.javaguides.springboot.Springboothellworldapplication.dto.UserDTO;

public interface UserService {
    void addUser(UserDTO userDTO);

    UserDTO getUser(String email);
}
