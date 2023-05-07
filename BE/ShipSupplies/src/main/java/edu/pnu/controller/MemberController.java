package edu.pnu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Member;
import edu.pnu.service.MemberService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MemberController {

	@Autowired
	MemberService ms;
	
	@PostMapping("/Addmember")
	public Member addMember(@RequestBody Member member) {
		System.out.println("받은 회원가입 정보 :" + member);
		return ms.addMember(member);
	}
	
	@PostMapping("/Login")
	public Member Login(@RequestBody Member member) {
		System.out.println("받은 로그인 정보 :" + member);
		return ms.Login(member);
	}
	
	
}
