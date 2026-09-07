package in.sagarai.service;
import in.sagarai.dto.*; import in.sagarai.entity.User; import in.sagarai.repository.UserRepository; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional;
@Service public class AuthService {
 private final UserRepository repo; private final PasswordEncoder encoder; public AuthService(UserRepository r,PasswordEncoder e){repo=r;encoder=e;}
 @Transactional public AuthResponse register(RegisterRequest req){ if(repo.existsByEmailIgnoreCase(req.email())) throw new IllegalArgumentException("Email already registered"); User u=new User();u.setName(req.name());u.setEmail(req.email().toLowerCase());u.setPasswordHash(encoder.encode(req.password()));repo.save(u);return new AuthResponse(u.getId(),u.getName(),u.getEmail(),u.getRole(),"Account created successfully"); }
 public AuthResponse login(LoginRequest req){ User u=repo.findByEmailIgnoreCase(req.email()).orElseThrow(()->new IllegalArgumentException("Invalid email or password")); if(!encoder.matches(req.password(),u.getPasswordHash())) throw new IllegalArgumentException("Invalid email or password"); return new AuthResponse(u.getId(),u.getName(),u.getEmail(),u.getRole(),"Login successful"); }
}
