package in.ivan.billingapp.service.impl;

import in.ivan.billingapp.entity.CategoryEntity;
import in.ivan.billingapp.io.CategoryRequest;
import in.ivan.billingapp.io.CategoryResponse;
import in.ivan.billingapp.repository.CategoryRepository;
import in.ivan.billingapp.service.CategoryService;
import in.ivan.billingapp.service.FileUpDelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final FileUpDelService fileUpDelService;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {

        String fileUrl = fileUpDelService.uploadFile(file);

        // Create a new CategoryEntity from the request
        CategoryEntity newCategory = requestToEntity(request);
        newCategory.setImageUrl(fileUrl);

        // Save the new category to the database
        newCategory = categoryRepository.save(newCategory);

        // Convert the saved entity to a response object
        return entityToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream() // Convert List<CategoryEntity> to Stream<CategoryEntity>
                .map(this::entityToResponse) // Map each entity to a response object
                .collect(Collectors.toList()); // Collect the results back into a List<CategoryResponse>
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found: " + categoryId));
        fileUpDelService.deleteFile(existingCategory.getImageUrl()); 
        categoryRepository.delete(existingCategory);
    }

    private CategoryEntity requestToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString()) // Generate a unique ID for this category
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }

    private CategoryResponse entityToResponse(CategoryEntity entity) {
        return CategoryResponse.builder()
                .categoryId(entity.getCategoryId())
                .name(entity.getName())
                .description(entity.getDescription())
                .bgColor(entity.getBgColor())
                .imageUrl(entity.getImageUrl())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

