package net.javaguides.springboot.Springboothellworldapplication.config;

import net.javaguides.springboot.Springboothellworldapplication.dto.UserDTO;
import net.javaguides.springboot.Springboothellworldapplication.exception.NotFoundException;
import net.javaguides.springboot.Springboothellworldapplication.model.User;
import net.javaguides.springboot.Springboothellworldapplication.repository.UserRepository;
import net.javaguides.springboot.Springboothellworldapplication.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class JwtAuthenticationManager implements AuthenticationManager {

    private final UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String password = authentication.getCredentials().toString();

        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new BadCredentialsException("1000");
        }
        if(!BCrypt.checkpw(password, user.getPassword())) {
            throw new BadCredentialsException("1000");
        }

        return new UsernamePasswordAuthenticationToken(email, null, null);
    }
}
