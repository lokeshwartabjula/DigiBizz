package net.javaguides.springboot.Springboothellworldapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.Springboothellworldapplication.model.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findFirstByName(String name);
}
