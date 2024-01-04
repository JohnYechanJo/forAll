package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import project.forAll.domain.Member;
import project.forAll.form.LoginForm;
import project.forAll.service.MemberService;
import project.forAll.web.SessionConstants;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class APILoginController extends APIController {

    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody final LoginForm loginForm, HttpServletResponse response) {

        Member loginMember = memberService.findByLoginIdAndLoginPw(loginForm.getLoginId(), loginForm.getLoginPw());

        try {
            if (loginMember == null) throw new Exception("아이디 또는 비밀번호가 일치하지 않습니다.");

            // 쿠키 생성
            Cookie idCookie = new Cookie("memberId", String.valueOf(loginMember.getId()));
            response.addCookie(idCookie);

            return new ResponseEntity(loginMember, HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not find member : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        expireCookie(response, "memberId");
    }

    private void expireCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie=new Cookie(cookieName,null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
