package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.domain.Member;
import project.forAll.form.LoginForm;
import project.forAll.service.MemberService;
import project.forAll.web.SessionConst;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class APILoginController extends APIController {

    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody final LoginForm loginForm, HttpServletRequest request) {

        Member loginMember = memberService.findByLoginIdAndLoginPw(loginForm.getLoginId(), loginForm.getLoginPw());

        try {
            if (loginMember == null) throw new Exception(loginMember.getLoginId());

            HttpSession session = request.getSession();
            session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);
            return new ResponseEntity(loginMember, HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not find member : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }
}
