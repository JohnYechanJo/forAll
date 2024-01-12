package project.forAll.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import project.forAll.domain.member.KakaoMember;
import project.forAll.repository.KakaoMemberRepository;
import project.forAll.util.dto.KakaoMemberDto;
import project.forAll.util.dto.KakaoTokenDto;
import project.forAll.util.dto.LoginResponseDto;


@Component
@Slf4j
@Transactional(readOnly = true)
public class KakaoLoginService extends Service {

    @Autowired
    KakaoMemberRepository kakaoMemberRepository;

    @Override
    protected JpaRepository getRepository() { return kakaoMemberRepository; }

    public KakaoTokenDto getAccessToken(String code) {
        // 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 본문
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
        params.add("client_id", "ef3dbe29e95781d561acb3dfbcab36b1"); // 카카오 Dev 앱 REST API 키
        params.add("redirect_uri", "http://localhost:3000/login/oauth2/callback/kakao"); // 카카오 Dev redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값

        // 헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // RestTemplate.exchange(url, HttpMethod.POST, entity, String.class)
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoTokenDto kakaoTokenDto = null;
        try {
            kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoTokenDto;
    }

    public ResponseEntity<LoginResponseDto> kakaoLogin(String kakaoAccessToken) {
        // 생성한 KakaoMember 가져옴
        KakaoMember kakaoMember = getKakaoInfo(kakaoAccessToken);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setLoginSuccess(true);
        loginResponseDto.setKakaoMember(kakaoMember);

        KakaoMember existOwner = kakaoMemberRepository.findById(kakaoMember.getId()).orElse(null);
        try {
            if (existOwner == null) {
                System.out.println("처음 로그인 하는 회원입니다.");
                kakaoMemberRepository.save(kakaoMember);
            }
            loginResponseDto.setLoginSuccess(true);
            return new ResponseEntity(loginResponseDto, HttpStatus.OK);

        } catch (Exception e) {
            loginResponseDto.setLoginSuccess(false);
            return ResponseEntity.badRequest().body(loginResponseDto);
        }
    }

    public KakaoMember getKakaoInfo(String kakaoAccessToken) {
        RestTemplate rt = new RestTemplate();

        // 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        // POST 방식으로 API 서버에 요청 후 response 받아옴
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );

        JsonParser jsonParser = new JsonParser();
        JsonElement element = jsonParser.parse(accountInfoResponse.getBody());
        String id = element.getAsJsonObject().get("id").getAsString();
        Long kakaoId = Long.parseLong(id);

        // 회원가입 처리하기
        KakaoMember existOwner = kakaoMemberRepository.findById(kakaoId).orElse(null);
        // 처음 로그인이 아닌 경우
        if (existOwner != null) {
            return existOwner;
//            return KakaoMember.builder()
//                    .id(kakaoMemberDto.getId())
//                    .build();
        }
        // 처음 로그인 하는 경우
        else {
            KakaoMember kakaoMember = new KakaoMember();
            kakaoMember.setId(kakaoId);
            return kakaoMember;
        }
    }
}
