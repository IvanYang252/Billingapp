package in.ivan.billingapp.service;

import in.ivan.billingapp.io.ItemRequest;
import in.ivan.billingapp.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> fetchAllItems();

    void deleteItem(String itemId);
}
