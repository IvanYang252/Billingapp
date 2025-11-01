package in.ivan.billingapp.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.ivan.billingapp.io.CategoryRequest;
import in.ivan.billingapp.io.CategoryResponse;
import in.ivan.billingapp.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /*
    Difference between @RequestBody and @RequestPart:
    - @RequestBody is used to bind the entire body of a request to a single object.
    It is typically used for JSON or XML payloads.
    notes: objectMapper already embedded in @RequestBody to convert json to object, no need to convert manually

    - @RequestPart is used to bind a specific part of a multipart request to a method parameter.
    It is typically used for file uploads or when the request contains multiple parts (e.g., a file and some metadata).
    note: need to use ObjectMapper to convert json string to object manually
     */

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED) // Return 201 Created status
    public CategoryResponse addCategory(@RequestPart("category") String categoryJson,
                                        @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest request;
        try {
            request = objectMapper.readValue(categoryJson, CategoryRequest.class); // Convert JSON string to CategoryRequest object
            return categoryService.add(request, file);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error parsing the json", e);
        }
    }

    @GetMapping("/categories")
    public List<CategoryResponse> getAllCategories() {
        return categoryService.read();
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Return 204 No Content status
    public void deleteCategory(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
