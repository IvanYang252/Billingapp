package in.ivan.billingapp.config;

import in.ivan.billingapp.filters.JwtRequestFilter;
import in.ivan.billingapp.service.impl.AppUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AppUserDetailsService appUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()) // ① Enable Cross-Origin Resource Sharing (CORS) with default configuration (which uses the custom 'corsFilter' defined below).
                .csrf(AbstractHttpConfigurer::disable) // ② Disable Cross-Site Request Forgery (CSRF) protection, common for stateless REST APIs using token-based authentication (like JWT).
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login", "/encode").permitAll() // ③ Allow unauthenticated access to the /login endpoint (public access).
                        .requestMatchers("/category", "/items").hasAnyRole("USER", "ADMIN") // ④ Restrict access to /category and /items to users with either the "USER" or "ADMIN" role.
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()) // ⑤ For all other requests, require the user to be authenticated (logged in).
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ⑥ Configure session management to be STATELESS (no HTTP session will be created or used to store user state, typical for JWT).
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); // ⑦ Add the custom JWT filter before the standard username/password authentication filter to process JWTs in incoming requests.

        return http.build(); // Build and return the configured SecurityFilterChain.
    }

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }

    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173")); // Allow requests only from this specific frontend origin.
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")); // Allow the specified HTTP methods.
        config.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Allow the client to send these headers (Authorization for tokens, Content-Type for data).
        config.setAllowCredentials(true); // Allow sending credentials like cookies (though less relevant for stateless, it's good practice for some token flows).

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Apply the above configuration to all paths ("/**").
        return source;
    }

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider(appUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoAuthenticationProvider);
    }
}
