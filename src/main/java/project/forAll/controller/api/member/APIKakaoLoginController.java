package project.forAll.controller.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.controller.SessionManager;
import project.forAll.controller.api.APIController;
import project.forAll.service.KakaoLoginService;
import project.forAll.util.dto.LoginResponseDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class APIKakaoLoginController extends APIController {

    private final KakaoLoginService kakaoLoginService;
    private final SessionManager sessionManager;

    @GetMapping("/login/oauth2/callback/kakao")
    public ResponseEntity kakaoLogin(HttpServletRequest request, HttpServletResponse response) {
        // 프런트에서 보낸 요청에 있는 code를 받아옴
        String code = request.getParameter("code");
        // getAccessToken 함수에 code 인자를 넣고 돌려서 나온 KakaoTokenDto에서 access token 값을 받아옴
        String kakaoAccessToken = kakaoLoginService.getAccessToken(code).getAccess_token();

        LoginResponseDto loginResponseDto = kakaoLoginService.kakaoLogin(kakaoAccessToken);
        if (loginResponseDto.isLoginSuccess()){
            sessionManager.createSession(loginResponseDto.getKakaoMember().getId(), response);
            return new ResponseEntity(loginResponseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity(errorResponse("Could not login with kakao"), HttpStatus.BAD_REQUEST);
        }
    }
}

