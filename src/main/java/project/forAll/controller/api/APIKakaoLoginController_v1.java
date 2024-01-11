/*
package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.service.MemberService;
import project.forAll.util.dto.KakaoTokenResponse;
import project.forAll.util.dto.KakaoUserInfoResponse;

@RestController
@RequiredArgsConstructor
public class APIKakaoLoginController extends APIController {
    // Version 1.
    // https://velog.io/@hwan2da/Spring-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

    private final KakaoTokenJsonData kakaoTokenJsonData;
    private final KakaoUserInfo kakaoUserInfo;

    private final MemberService memberService;

    @GetMapping("/login/oauth2/callback/kakao")
    public ResponseEntity kakaoOauth(@RequestParam("code") String code) {
        KakaoTokenResponse kakaoTokenResponse = kakaoTokenJsonData.getToken(code);
        KakaoUserInfoResponse userInfo = kakaoUserInfo.getUserInfo(kakaoTokenResponse.getAccess_token());

        memberService.createKakaoMember(userInfo.getKakao_account().getProfile_nickname());

        return new ResponseEntity("", HttpStatus.OK);
    }
}
 */
