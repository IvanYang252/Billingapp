package in.ivan.billingapp.service;

import in.ivan.billingapp.io.UserRequest;
import in.ivan.billingapp.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readAllUsers();

    void deleteUser(String id);
}
