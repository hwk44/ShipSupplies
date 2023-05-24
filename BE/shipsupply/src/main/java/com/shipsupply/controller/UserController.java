package com.shipsupply.controller;

import com.shipsupply.domain.User;
import com.shipsupply.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    UserService userService;

    // ResponseEntity는 스프링 프레임워크에서 제공하는 클래스. http 응답의 상태코드, 헤더, 본문 등을 포함하는 정보를 갖는 컨테이너
    //이 클래스를 사용하면 컨트롤러에서 http 응답을 상세하게 조작가능
    //http 요청에 대한 응답을 생성하는 역할

    //회원 정보 조회(관리자만 가능)
    @GetMapping("/inquire")
    public User inquire(@RequestBody User user) {
        System.out.println("회원 정보 조회");
        return userService.inquire(user);
    }

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody User user) {
        System.out.println("회원가입 정보 : " + user);
        return ResponseEntity.ok().body(userService.join(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        System.out.println("로그인 정보 : " + user);
        // userService의 login 메서드를 호출하고, 그 결과를 HTTP 응답 본문으로 설정.
        return ResponseEntity.ok().body(userService.login(user));
    }

    // JWT 토큰은 상태가 없는 토큰이기 때문에 한번 발급된 토큰을 서버에서 직접 파기하는 것은 불가능.
    // 토큰을 삭제하는 방법은 1. 클라이언트 측에서 삭제 / 2. 서버에 블랙리스트 만들어서 해당 토큰 등록.
    @PostMapping("/logout")
    public ResponseEntity<User> logout(@RequestBody User user){
        System.out.println("로그아웃 정보 : " + user);
        return ResponseEntity.ok().body(userService.logout(user));
    }

    @PutMapping("/update")
    public ResponseEntity<User> update(@RequestBody User user) {
        System.out.println("수정할 회원 정보 : " + user);
        return ResponseEntity.ok().body(userService.update(user));
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody User user) {
        System.out.println("삭제할 회원 정보 : " + user);
        userService.delete(user);
    }
}
