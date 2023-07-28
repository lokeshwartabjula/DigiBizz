package net.javaguides.springboot.Springboothellworldapplication.controller;

import lombok.Data;

@Data
public class RequestData {
    private StoreDetails storeDetails;
    private ItemData[] items;

    @Data
    public static class StoreDetails {
        private String name;
        private String address;
        private String logo;
    }

    @Data
    public static class ItemData {
        private String name;
        private String price;
        private String image;
        private String category;
        private String description;
    }
}
