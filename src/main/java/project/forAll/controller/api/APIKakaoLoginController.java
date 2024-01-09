//package project.forAll.controller.api;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import project.forAll.dto.LoginResponseDto;
//import project.forAll.service.KakaoLoginService;
//
//import javax.servlet.http.HttpServletRequest;
//
//@RestController
//@RequiredArgsConstructor
//public class APIKakaoLoginController {
//
//    private final KakaoLoginService kakaoLoginService;
//
//    @GetMapping("/login/oauth2/callback/kakao")
//    public ResponseEntity<LoginResponseDto> kakaoLogin(HttpServletRequest request) {
//        String code = request.getParameter("code");
//        String kakaoAccessToken = kakaoLoginService.getKakaoAccessToken(code);
//        return kakaoLoginService.kakaoLogin(kakaoAccessToken);
//    }
//
//
//}
