package in.ivan.billingapp.service.impl;

import in.ivan.billingapp.entity.UserEntity;
import in.ivan.billingapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // User Details, different from self-defined UserEntity, is the Object in Security layer for Spring Security exclusively.
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email: " + email + " not found"));
        return new User(existingUser.getEmail(), existingUser.getPassword(),
                // Use Collections.singleton to create a small, immutable Set containing the user's single role/authority.
                Collections.singleton(new SimpleGrantedAuthority(existingUser.getRole())));
    }
}
