package net.javaguides.springboot.Springboothellworldapplication.service;

import net.javaguides.springboot.Springboothellworldapplication.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.Springboothellworldapplication.model.Item;
import net.javaguides.springboot.Springboothellworldapplication.model.Store;
import net.javaguides.springboot.Springboothellworldapplication.repository.StoreRepository;

import java.util.List;

@Service
public class StoreService {

    private final StoreRepository storeRepository;
    private final ItemRepository itemRepository;

    @Autowired
    public StoreService(StoreRepository storeRepository, ItemRepository itemRepository) {
        this.storeRepository = storeRepository;
        this.itemRepository = itemRepository;
    }

    public void saveStore(Store store) {
        storeRepository.save(store);
        System.out.println("Saving store: " + store.getName());
    }

    public void saveItem(Item item) {
        itemRepository.save(item);
        System.out.println("Saving item: " + item.getName());
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    public Item getItemById(Long id) {
        return itemRepository.findById(id)
                .orElse(null);
    }
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    public Store getStoreById(Long id) {
        return storeRepository.findById(id)
                .orElse(null);
    }

    public Store findStoreByName(String name) {
        return storeRepository.findFirstByName(name);
    }
}
