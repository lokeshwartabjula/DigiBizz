package net.javaguides.springboot.Springboothellworldapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.Springboothellworldapplication.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
