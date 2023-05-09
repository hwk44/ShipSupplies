package edu.pnu.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Member;
import edu.pnu.persistence.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	MemberRepository mr;
	
	public Member addMember(Member member) {
		Member m = new Member();
		m.setId(member.getId());
		m.setUserName(member.getUserName());
		m.setEmail(member.getEmail());
		m.setPassword(member.getPassword());
		System.out.println("저장할 member 정보:" + member);
		return mr.save(m);
	}

	public Member Login(Member member) {
		Optional<Member> findMember = mr.findById(member.getId());
		if(findMember.isPresent()) {
			Member m = findMember.get();
			if(m.getPassword().equals(member.getPassword())) {
				return m;
			}else {
				throw new RuntimeException("비밀번호가 일치하지 않습니다.");
			}
		}else {
			throw new RuntimeException("해당 아이디를 가진 회원이 없습니다.");
		}
	}
	
}
