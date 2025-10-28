package in.ivan.billingapp.service.impl;

import in.ivan.billingapp.entity.CategoryEntity;
import in.ivan.billingapp.entity.ItemEntity;
import in.ivan.billingapp.io.ItemRequest;
import in.ivan.billingapp.io.ItemResponse;
import in.ivan.billingapp.repository.CategoryRepository;
import in.ivan.billingapp.repository.ItemRepository;
import in.ivan.billingapp.service.FileUpDelService;
import in.ivan.billingapp.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final FileUpDelService fileUpDelService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imageUrl = fileUpDelService.uploadFile(file);
        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found" + request.getCategoryId()));
        newItem.setCategory(existingCategory);
        newItem.setImageUrl(imageUrl);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imageUrl(newItem.getImageUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    @Override
    public List<ItemResponse> fetchAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingItem = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found: " + itemId));
        boolean fileDeleted = fileUpDelService.deleteFile(existingItem.getImageUrl());
        if (fileDeleted) {
            itemRepository.delete(existingItem);
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete the image");
        }
    }
}
