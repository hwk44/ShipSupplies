package com.shipsupply.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Component
public class JwtTokenProvider { // JWT 토큰을 생성 및 검증 모듈

    @Autowired
    UserDetailsService userDetailsService;

    //    private static final SecretKey secretKey = Keys
//            .hmacShaKeyFor("ASDasdasd1dasd_dqwdqw1dsad789".getBytes(StandardCharsets.UTF_8));
    private static final SecretKey secretKey = Keys.hmacShaKeyFor(
            Base64.getEncoder().encode("ASDasdasd1dasd_dqwdqw1dsad789".getBytes(StandardCharsets.UTF_8))
    );


    // Jwt 토큰 생성
    public static String createToken(String userPk, String role) {
        Claims claims = Jwts.claims().setSubject(userPk);
        claims.put("role", role); // 토큰에 role을 추가. 나중에 토큰을 디코딩할 때 role을 검증하려고

        Date now = new Date();
        // 1시간 토큰 유효
        long tokenValidMillisecond = 1000L * 60 * 60;
        return Jwts.builder()
                .setClaims(claims) // 데이터
                .setIssuedAt(now) // 토큰 발행일자
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond)) // 토큰 유효시간 설정
                .signWith(secretKey)
                .compact();
    }

    // Jwt 토큰으로 인증 정보 조회
    public Authentication getAuthentication(String token) {
        System.out.println("getAuthentication 호출");
        // 토큰에서 권한 정보를 가져와서 권한 목록을 생성.
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        System.out.println("claims : " + claims);
        Collection<GrantedAuthority> authorities =
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + claims.get("role").toString()));
        System.out.println("authorities : " + authorities);
        org.springframework.security.core.userdetails.User principal =
                new org.springframework.security.core.userdetails.User(this.getUserPk(token), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", principal.getAuthorities());

    }

    // Jwt 토큰에서 회원 구별 정보 추출
    public String getUserPk(String token) {
        System.out.println("getUserPk 호출");
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    // Request의 Header에서 token 파싱
    public String resolveToken(HttpServletRequest req) {
        System.out.println("resolveToken 호출");
        String token = req.getHeader("Authorization");
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            token = token.substring(7, token.length());
            System.out.println("리액트에서 준 토큰 : " + token);
            return token;
        }
        return token;
    }

    // Jwt 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        System.out.println("validateToken 호출");
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}