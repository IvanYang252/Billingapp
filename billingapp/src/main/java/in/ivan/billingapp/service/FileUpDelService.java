package in.ivan.billingapp.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUpDelService {

    String uploadFile(MultipartFile file);

    boolean deleteFile(String fileUrl);
}
