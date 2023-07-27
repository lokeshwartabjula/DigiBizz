package net.javaguides.springboot.Springboothellworldapplication.controller;

import net.javaguides.springboot.Springboothellworldapplication.config.JwtTokenUtil;
import net.javaguides.springboot.Springboothellworldapplication.dto.UserDTO;
import net.javaguides.springboot.Springboothellworldapplication.model.JwtRequest;
import net.javaguides.springboot.Springboothellworldapplication.model.JwtResponse;
import net.javaguides.springboot.Springboothellworldapplication.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@AllArgsConstructor
public class JwtAuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

        final UserDTO userDTO = userService.getUser(authenticationRequest.getEmail());

        final String token = jwtTokenUtil.generateToken(userDTO);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String email, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
