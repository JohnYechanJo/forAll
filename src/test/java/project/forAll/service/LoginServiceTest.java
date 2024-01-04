package project.forAll.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Member;
import project.forAll.form.MemberForm;
import project.forAll.repository.MemberRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class LoginServiceTest {

    @Autowired LoginService loginService;
    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    public void 로그인() throws Exception {
        // Given
        MemberForm mf = new MemberForm("Owner", "forall", "forall1230", "천승범",
                "20010101", "010101-01-010101", "Male", "forall@gmail.com",
                "01010101010");
        Member member = memberService.build(mf);
        Long memberId = memberService.saveMember(member);

        // When
        loginService.login("forall", "")
    }
}
