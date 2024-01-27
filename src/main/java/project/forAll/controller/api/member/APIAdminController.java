package project.forAll.controller.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.controller.SessionManager;
import project.forAll.controller.api.APIController;
import project.forAll.domain.member.Member;
import project.forAll.dto.AdminMemberDto;
import project.forAll.form.LoginForm;
import project.forAll.repository.member.MemberRepository;
import project.forAll.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class APIAdminController extends APIController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final SessionManager sessionManager;

    @PostMapping("/admin/login")
    public ResponseEntity loginAdmin(@RequestBody final AdminMemberDto adminMemberDto, HttpServletRequest request,
                                     HttpServletResponse response) {

        Member adminLoginMember = memberService.findByLoginIdAndLoginPw(adminMemberDto.getLoginId(),
                adminMemberDto.getLoginPw());

        try {
            if ((adminLoginMember == null) | !(adminLoginMember.getIsAdmin().toString().equals("ADMIN")))
                throw new Exception(adminLoginMember.getLoginId());

            sessionManager.createSession(adminLoginMember.getLoginId(), response);

            return new ResponseEntity(adminLoginMember, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity(errorResponse("Could not find admin member : " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/admin/logout")
    public void logoutAdmin(HttpServletRequest request) {
        sessionManager.expire(request);

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }
}
