package project.forAll.service;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import project.forAll.domain.Member;
import project.forAll.domain.enums.Gender;
import project.forAll.domain.enums.MemberRole;
import project.forAll.repository.MemberRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.validation.constraints.Null;

import static org.junit.Assert.assertEquals;


// 테스트 결과 "Could not open JPA EntityManager for transaction" 오류 발생
@SpringBootTest
@Transactional
public class MemberServiceTest {

    @PersistenceContext EntityManager em;

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    public void 회원가입() {

        // Given
        Member member = createMember("Owner", "forall", "forall1230", "천승범",
                "20010101", "010101-01-010101", "Male", "forall@gmail.com",
                "01010101010");

        // When
        Long memberId = memberService.join(member); // saveMember라고 생각

        // Then
        Member getMember = memberRepository.findOne(memberId);

        assertEquals("Member는 Owner", "Owner", getMember.getRole().toString());
        assertEquals("Member는 Male", "Male", getMember.getGender().toString());
        assertEquals("Member의 전화번호 일치", "01010101010", getMember.getPhoneNum());

    }

    @Test
    public void 정보수정() {

        // Given
        Member member = createMember("Customer", "forall", "forall1230", "김윤태",
                "20010101", "010101-01-010101", "Female", "forall@gmail.com",
                "01010101010");
        Long memberId = memberService.join(member);

        // When
        memberService.update(memberId, "Owner", "forall", "forall1230", "김윤태",
                "20020202", "010101-01-010101", "Male", "forall@gmail.com",
                "01010101010");

        // Then
        Member getMember = memberRepository.findOne(memberId);

        assertEquals("Customer -> Owner", "Owner", getMember.getRole().toString());
        assertEquals("Male -> Female", "Male", getMember.getGender().toString());
        assertEquals("20010101 -> 20020202", "20020202", getMember.getBirthday());
    }

    /* delete가 작동 안 함
    @Test
    public void 회원탈퇴() {

        // Given
        Member member = createMember("Customer", "forall", "forall1230", "김윤태",
                "20010101", "010101-01-010101", "Female", "forall@gmail.com",
                "01010101010");
        Long memberId = memberService.join(member);

        // When
        memberService.delete(memberId);

        // Then
        assertEquals("Member 삭제", null, memberId);
    }
     */

    private Member createMember(String role, String loginId, String loginPw, String name, String birthday,
                                String businessNum, String gender, String email, String phoneNum) {
        Member member = new Member();
        member.setRole(MemberRole.parse(role));
        member.setLoginId(loginId);
        member.setLoginPw(loginPw);
        member.setName(name);
        member.setBirthday(birthday);
        member.setBusinessNum(businessNum);
        member.setGender(Gender.parse(gender));
        member.setEmail(email);
        member.setPhoneNum(phoneNum);
        em.persist(member);
        return member;
    }
}