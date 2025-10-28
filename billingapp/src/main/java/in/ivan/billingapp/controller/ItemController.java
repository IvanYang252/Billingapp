package in.ivan.billingapp.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.ivan.billingapp.io.ItemRequest;
import in.ivan.billingapp.io.ItemResponse;
import in.ivan.billingapp.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse addItem(@RequestPart("item") String ItemJson,
                                @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest request;
        try {
            request = objectMapper.readValue(ItemJson, ItemRequest.class);
            return itemService.add(request, file);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error processing Json");
        }
    }

    @GetMapping("/items")
    public List<ItemResponse> getAllItems() {
        return itemService.fetchAllItems();
    }

    @DeleteMapping("/admin/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeItem(@PathVariable String itemId) {
        try {
            itemService.deleteItem(itemId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
    }

}
