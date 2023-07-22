package net.javaguides.springboot.Springboothellworldapplication;

import net.javaguides.springboot.Springboothellworldapplication.dto.UserDTO;
import org.springframework.security.core.context.SecurityContextHolder;

public class util {
    public static String getUserEmail() {
        return ((UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail();
    }
}
