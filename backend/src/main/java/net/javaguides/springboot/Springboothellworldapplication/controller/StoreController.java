package net.javaguides.springboot.Springboothellworldapplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.Springboothellworldapplication.model.Item;
import net.javaguides.springboot.Springboothellworldapplication.model.Store;
import net.javaguides.springboot.Springboothellworldapplication.service.StoreService;

@RestController
public class StoreController {

    @Autowired
    private StoreService storeService;

    @PostMapping("/store")
    public ResponseEntity<String> greeting(@RequestBody RequestData requestData) {
        try {
            RequestData.StoreDetails storeDetails = requestData.getStoreDetails();
            Store existingStore = storeService.findStoreByName(storeDetails.getName());

            if (existingStore != null) {
                // Store with the given name already exists
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Store already exists");
            }

            Store store = new Store();
            store.setName(storeDetails.getName());
            store.setAddress(storeDetails.getAddress());
            store.setLogo(storeDetails.getLogo());
            storeService.saveStore(store);

            for (RequestData.ItemData itemData : requestData.getItems()) {
                Item item = new Item();
                item.setName(itemData.getName());
                item.setPrice(itemData.getPrice());
                item.setImage(itemData.getImage());
                item.setStore(store);
                storeService.saveItem(item);
            }

            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the data: " + e.getMessage());
        }
    }
}
