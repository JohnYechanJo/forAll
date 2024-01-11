//package project.forAll.controller.api;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//import project.forAll.service.KakaoLoginService;
//
//import javax.servlet.http.HttpServletRequest;
//
//@RestController
//@RequiredArgsConstructor
//public class APIKakaoLoginController_v2 extends APIController {
    // Version 2.
    // https://innovation123.tistory.com/181
//
//    // Kakao api key와 redirect uri를 application.yml에서 받아옴
//    @Value("${kakao.api_key}")
//    private String kakaoApiKey;
//    @Value("${kakao.redirect_uri}")
//    private String kakaoRedirectUri;
//
//    private final KakaoLoginService kakaoLoginService;

    // 프런트에서 kakaoApiKey와 redirectUri를 입력했기 때문에 지금은 필요없어보임
    /*
    @GetMapping("/login/kakao")
    public ResponseEntity kakaoLoginForm(Model model) {
        // application.yml에서 불러온 kakaoApiKey와 kakaoRedirectUri를 가져가면 됩니다
        // 현재는 변수 kakaoApiKey를 쓰면 오류가 떠서 값을 그대로 넣어놨습니다.
        model.addAttribute("kakaoApiKey", "ef3dbe29e95781d561acb3dfbcab36b1");
        model.addAttribute("redirectUri", "http://localhost:3000/login/oauth2/callback/kakao");
        return new ResponseEntity("", HttpStatus.OK);
    }
     */

//    @PostMapping("/login/oauth2/callback/kakao")
//    public ResponseEntity kakaoLogin(@RequestBody final String code, HttpServletRequest request) {
//        // 1. 인가 코드 받기 (@RequestParam String code)
//
//        // 2. 토큰 받기
//        String accessToken = kakaoLoginService.getAccessToken(code);
//
//        // 3. 사용자 정보 받기
//        Map<String, Object> userInfo = kakaoLoginService.getUserInfo(accessToken);
//
//        String nickname = (String)userInfo.get("nickname");
//
//        // 받은 사용자 정보를 어떻게 프런트에 넘겨주면 되나요?
//
//        return new ResponseEntity("", HttpStatus.OK);
//    }
// }