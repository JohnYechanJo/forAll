package project.forAll.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import project.forAll.domain.Member;
import project.forAll.domain.enums.Gender;
import project.forAll.domain.enums.MemberRole;
import project.forAll.repository.MemberRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

// @ RunWith(SpringRunner.class)    Java 버전이 올라가면서 바뀐 듯함
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
                "20010101", "010101-01-010101", "남자", "forall@gmail.com",
                "01010101010");

        // When
        Long memberId = memberService.join(member);

        // Then
        assertEquals(member, memberRepository.findOne(memberId));
    }

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
