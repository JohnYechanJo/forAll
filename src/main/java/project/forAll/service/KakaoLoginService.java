//package project.forAll.service;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationFeature;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonParser;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//import project.forAll.dto.KakaoTokenDto;
//import project.forAll.dto.LoginResponseDto;
//
//import java.io.*;
//import java.net.HttpURLConnection;
//import java.net.URL;
//
//@Component
//@Transactional(readOnly = true)
//public class KakaoLoginService extends Service {
//
//    public KakaoTokenDto getKakaoAccessToken(String code) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // Http Response Body 객체 생성
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code");
//        params.add("client_id", KAKAO_CLIENT_ID);
//        params.add("redirect_uri", KAKAO_REDIRECT_URI);
//        params.add("code", code);
//        params.add("client_secret", KAKAO_CLIENT_SECRET);
//
//        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
//
//        RestTemplate rt = new RestTemplate();
//        ResponseEntity<String> accessTokenResponse = rt.exchange(
//                KAKAO_TOKEN_URI,    // "https://kauth.kakao.com/oauth/token"
//                HttpMethod.POST,
//                kakaoTokenRequest,
//                String.class
//        );
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        KakaoTokenDto kakaoTokenDto = null;
//        try {
//            kakaoTokenDto = objectMapper.readValue(accountInfoResponse.getBody(),
//                    KakaoTokenDto.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        return kakaoTokenDto;
//    }
//
//    public ResponseEntity<LoginResponseDto> kakaoLogin(String kakaoAccessToken) {
//        Account account = getKakaoInfo(kakaoAccessToken);
//
//        LoginResponseDto loginResponseDto = new LoginResponseDto();
//        loginResponseDto.setLoginSuccess(true);
//        loginResponseDto.setAccount(account);
//
//        Account existOwner = accountRepository.findById(account.getId()).orElse(null);
//        try {
//            if (existOwner == null) {
//                System.out.println("처음 로그인 하는 회원입니다.");
//                accountRepository.save(account);
//            }
//            loginResponseDto.setLoginSuccess(true);
//
//            return ResponseEntity.ok().headers(headers).body(loginResponseDto);
//
//        } catch (Exception e) {
//            loginResponseDto.setLoginSuccess(false);
//            return ResponseEntity.badRequest().body(loginResponseDto);
//        }
//    }
//
//    public Account getKakaoInfo(String kakaoAccessToken) {
//        RestTemplate rt = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + kakaoAccessToken);
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);
//
//        // POST 방식으로 API 서버에 요청 후 response 받아옴
//        ResponseEntity<String> accountInfoResponse = rt.exchange(
//                KAKAO_USER_INFO_URI, // "https://kapi.kakao.com/v2/user/me"
//                HttpMethod.POST,
//                accountInfoRequest,
//                String.class
//        );
//
//        // JSON Parsing (-> kakaoAccountDto)
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        KakaoAccountDto kakaoAccountDto = null;
//        try {
//            kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoAccountDto.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        // 회원가입 처리하기
//        Long kakaoId = kakaoAccountDto.getId();
//        Account existOwner = accountRepository.findById(kakaoId).orElse(null);
//        // 처음 로그인이 아닌 경우
//        if (existOwner != null) {
//            return Account.builder()
//                    .id(kakaoAccountDto.getId())
//                    .email(kakaoAccountDto.getKakao_account().getEmail())
//                    .kakaoName(kakaoAccountDto.getKakao_account().getProfile().getNickname())
//                    .build();
//        }
//        // 처음 로그인 하는 경우
//        else {
//            return Account.builder()
//                    .id(kakaoAccountDto.getId())
//                    .email(kakaoAccountDto.getKakao_account().getEmail())
//                    .kakaoName(kakaoAccountDto.getKakao_account().getProfile().getNickname())
//                    .build();
//        }
//    }
//}
//
//
////        String accessToken = "";
////        String refreshToken = "";
////        String requestURL = "https://kauth.kakao.com/oauth/token";
////
////        try {
////            URL url = new URL(requestURL);
////            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
////
////            // 필수 헤더 세팅
////            conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
////            conn.setDoOutput(true); // OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.
////
////            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
////            StringBuilder sb = new StringBuilder();
////
////            sb.append("grant_type=authorized_code");
////            sb.append("&client_id=").append(kakaoApiKey);
////            ef3dbe29e95781d561acb3dfbcab36b1" +
////                    "&redirect_uri=http://localhost:3000/login/oauth/kakao" +
////                    "&code=QbpjzsczbhzrHvLsP61stsxeozP1pk3aO-Da5A5zeH0_4Jgx6IqRaLlMivgKKiWQAAABjOgJho7gLMgnBn6ZSw";
////            bw.write(sb);
////            bw.flush();
////
////            int responseCode = conn.getResponseCode();
////
////            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
////            String line = "";
////            StringBuilder result = new StringBuilder();
////
////            while ((line = bufferedReader.readLine()) != null) {
////                result.append(line);
////            }
////
////            JsonElement element = JsonParser.parseString(result.toString());
////
////            accessToken = element.getAsJsonObject().get("access_token").getAsString();
////            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();
////
////            bufferedReader.close();
////            bufferedWriter.close();
////        } catch(IOException e) {
////            e.printStackTrace();
////        }
////
////        return accessToken;
////    }
//// }
