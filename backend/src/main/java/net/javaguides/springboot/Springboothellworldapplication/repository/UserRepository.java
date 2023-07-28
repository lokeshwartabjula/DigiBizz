package net.javaguides.springboot.Springboothellworldapplication.repository;

import net.javaguides.springboot.Springboothellworldapplication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
