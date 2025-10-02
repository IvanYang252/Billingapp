package in.ivan.billingapp.service;

import in.ivan.billingapp.io.CategoryRequest;
import in.ivan.billingapp.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    // Method to add a new category
    CategoryResponse add(CategoryRequest request, MultipartFile file);

    // Method to read all categories
    List<CategoryResponse> read();

    // Method to delete a category by its categoryId *** need improvement if delete by id, not categoryId
    void delete(String categoryId);

}
