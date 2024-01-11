
package project.forAll.controller.api;


<<<<<<< HEAD
=======

//package project.forAll.controller.api;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import project.forAll.dto.LoginResponseDto;
//import project.forAll.service.KakaoLoginService;
//
//import javax.servlet.http.HttpServletRequest;


>>>>>>> 96b7997 (pull)
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import project.forAll.service.KakaoLoginService;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class APIKakaoLoginController extends APIController {

    @Value("${kakao.api_key}")
    private String kakaoApiKey;
    @Value("${kakao.redirect_uri}")
    private String kakaoRedirectUri;

    private final KakaoLoginService kakaoLoginService;

    @GetMapping("/login/kakao")
    public ResponseEntity kakaoLoginForm(Model model) {
        // application.yml에서 불러온 kakaoApiKey와 kakaoRedirectUri를 가져가면 됩니다
        // 현재는 변수 kakaoApiKey를 쓰면 오류가 떠서 값을 그대로 넣어놨습니다.
        model.addAttribute("kakaoApiKey", "ef3dbe29e95781d561acb3dfbcab36b1");
        model.addAttribute("redirectUri", "http://localhost:3000/login/oauth2/callback/kakao");
        return new ResponseEntity("", HttpStatus.OK);
    }

    @PostMapping("/login/oauth2/callback/kakao")
    public ResponseEntity kakaoLogin(@RequestBody final String code, HttpServletRequest request) {
        // 1. 인가 코드 받기 (@RequestParam String code)

        // 2. 토큰 받기
        String accessToken = kakaoLoginService.getAccessToken(code);

        // 3. 사용자 정보 받기
        Map<String, Object> userInfo = kakaoLoginService.getUserInfo(accessToken);

<<<<<<< HEAD
        String nickname = (String) userInfo.get("nickname");
=======
        String nickname = (String)userInfo.get("nickname");
>>>>>>> 96b7997 (pull)

        // 받은 사용자 정보를 어떻게 프런트에 넘겨주면 되나요?

        return new ResponseEntity("", HttpStatus.OK);
    }
<<<<<<< HEAD
}

=======

>>>>>>> b5cfc12ef8ed0f32aa44fe0f0c9d810668ede1d7
>>>>>>> 96b7997 (pull)
//    private final KakaoLoginService kakaoLoginService;
//
//    @GetMapping("/login/oauth2/callback/kakao")
//    public ResponseEntity<LoginResponseDto> kakaoLogin(HttpServletRequest request) {
//        String code = request.getParameter("code");
//        String kakaoAccessToken = kakaoLoginService.getKakaoAccessToken(code);
//        return kakaoLoginService.kakaoLogin(kakaoAccessToken);
//    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
//
//
//}
=======


}
>>>>>>> b5cfc12ef8ed0f32aa44fe0f0c9d810668ede1d7
>>>>>>> 96b7997 (pull)
