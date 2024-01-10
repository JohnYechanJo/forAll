package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import project.forAll.controller.SessionManager;
import project.forAll.domain.member.Member;
import project.forAll.repository.MemberRepository;
import project.forAll.web.SessionConst;

@RestController
@RequiredArgsConstructor
public class APIHomeController {

    private final MemberRepository memberRepository;
    private final SessionManager sessionManager;

    @GetMapping("/")
    public void home(
            @SessionAttribute(name = SessionConst.LOGIN_MEMBER, required = false) Member loginMember,
            Model model) {
        if (loginMember != null) {
            model.addAttribute("member", loginMember);
        }
    }
}
