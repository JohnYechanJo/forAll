package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Member;
import project.forAll.repository.MemberRepository;

import java.util.Optional;

@Component
@Transactional
public class LoginService extends Service {

    @Autowired private MemberRepository memberRepository;

    @Override
    protected JpaRepository getRepository() {
        return memberRepository;
    }


    public Optional<Member> login(String loginId, String loginPw) {
        return memberRepository.findByLoginId(loginId)
                .stream().filter(m -> m.getLoginPw().equals(loginPw));
    }
}
