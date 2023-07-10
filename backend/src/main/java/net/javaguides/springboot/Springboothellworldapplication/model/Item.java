package net.javaguides.springboot.Springboothellworldapplication.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String price;
    private String image;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    // Constructors, getters, and setters
}
