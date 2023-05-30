package com.shipsupply.service;

import com.shipsupply.domain.User;
import com.shipsupply.persistence.UserRepository;
import com.shipsupply.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository ur;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public User inquire(String id) {
        Optional<User> findUser = ur.findById(id);
        User u = new User();
        if (findUser.isPresent()) {
            u = findUser.get();
            if(u.getRole().equals("admin")){
                return u;
            }
        }
        return null;
    }

    public String join(User user) {
        Optional<User> findUser = ur.findById(user.getId());
        if (findUser.isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디");
        }else {
            User u = new User();
            u.setId(user.getId());
            u.setEmail(user.getEmail());
            u.setPassword(encoder.encode(user.getPassword()));
            u.setUsername(user.getUsername());
            u.setRole(user.getRole());
            ur.save(u);
        }
        return "join 호출";
    }

    public String login(User user) {

        Optional<User> findUser = ur.findById(user.getId());
        if (findUser.isPresent()) {
            User u = findUser.get();
            if (encoder.matches(user.getPassword(), u.getPassword())) {
                logger.info("userService에서 createToken 호출");
                String token = JwtTokenProvider.createToken(u.getUsername(), u.getRole());
                logger.info("생성한 토큰 : {}" , token);
                return token;
            } else {
                throw new RuntimeException("비밀번호 불일치");
            }
        } else {
            throw new RuntimeException("존재하지 않는 회원");
        }
    }

    public User logout(User user) {
        return null;
    }

    public User update(User user) {
        Optional<User> findUser = ur.findById(user.getId());
        if (findUser.isPresent()) {
            User u = findUser.get();
            if (encoder.matches(user.getPassword(), u.getPassword())) {
                // ofNullable -> null이 아니면 ()안의 값으로 변경. null이면 Optional.empty() 반환
                // ifPresent -> 값이 있으면() 안의 값 사용. 여기서는 기존값 그대로 둠. ::는 메서드 레퍼런스
                Optional.ofNullable(user.getNewPassword()).ifPresent(p -> u.setPassword(encoder.encode(p))); // p는 임시 매개변수 이름. 딴걸로 바꿔도 됨
                                                                                                             // 람다식 쓴 이유는 암호화 때문에
                Optional.ofNullable(user.getEmail()).ifPresent(u::setEmail); // setEmail 메서드 직접참조 (email) -> u.setEmail(email)과 동일
                Optional.ofNullable(user.getUsername()).ifPresent(u::setUsername);
                Optional.ofNullable(user.getRole()).ifPresent(u::setRole);
                Optional.ofNullable(user.getProvider()).ifPresent(u::setProvider);
                Optional.ofNullable(user.getProviderId()).ifPresent(u::setProviderId);
                return ur.save(u);
            }else {
                throw new RuntimeException("권한이 없습니다.");
            }
        }
        return null;
    }

    public void delete(User user) {
        System.out.println("user 비밀번호 : " + user.getPassword());
        Optional<User> findUser = ur.findById(user.getId());
        if (findUser.isPresent()) {
            User u = findUser.get();
            if (encoder.matches(user.getPassword(), u.getPassword())) {
                ur.deleteById(user.getId());
            }else {
                throw new RuntimeException("권한이 없습니다.");
            }
        }
    }
}
