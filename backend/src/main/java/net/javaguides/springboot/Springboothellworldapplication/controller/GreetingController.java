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
import net.javaguides.springboot.Springboothellworldapplication.service.s3Service;

import java.util.Base64;
import java.util.UUID;

@RestController
public class GreetingController {

    @Autowired
    private StoreService storeService;

    @Autowired
    private s3Service s3Service;

    @PostMapping("/greeting")
    public ResponseEntity<String> greeting(@RequestBody RequestData requestData) {
        try {
            Store store = new Store();
            store.setName(requestData.getStoreDetails().getName());
            store.setAddress(requestData.getStoreDetails().getAddress());

            // Upload the store logo image to S3 and get the S3 bucket link
            byte[] logoImageData = Base64.getDecoder().decode(requestData.getStoreDetails().getLogo());
            String logoS3Link = s3Service.uploadImage(generateUniqueFileName(), logoImageData);
            store.setLogo(logoS3Link);

            storeService.saveStore(store);

            for (RequestData.ItemData itemData : requestData.getItems()) {
                Item item = new Item();
                item.setName(itemData.getName());
                item.setPrice(itemData.getPrice());
                item.setCategory(itemData.getCategory());

                // Upload the item image to S3 and get the S3 bucket link
                byte[] itemImageData = Base64.getDecoder().decode(itemData.getImage());
                String itemS3Link = s3Service.uploadImage(generateUniqueFileName(), itemImageData);
                item.setImage(itemS3Link);

                item.setStore(store);
                storeService.saveItem(item);
            }

            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the data: " + e.getMessage());
        }
    }

    private String generateUniqueFileName() {
        String uniqueId = UUID.randomUUID().toString();
        return uniqueId + ".jpg";
    }
}
