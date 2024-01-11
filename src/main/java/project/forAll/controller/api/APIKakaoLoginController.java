package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.service.KakaoLoginService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class APIKakaoLoginController extends APIController {

    private final KakaoLoginService kakaoLoginService;

    @GetMapping("/login/oauth2/callback/kakao")
    public ResponseEntity kakaoLogin(HttpServletRequest request) {
        // 프런트에서 보낸 요청에 있는 code를 받아옴
        String code = request.getParameter("code");
        // getAccessToken 함수에 code 인자를 넣고 돌려서 나온 KakaoTokenDto에서 access token 값을 받아옴
        String kakaoAccessToken = kakaoLoginService.getAccessToken(code).getAccess_token();
        // 받아온 access token으로 카카오 로그인
        return kakaoLoginService.kakaoLogin(kakaoAccessToken);
    }
}
