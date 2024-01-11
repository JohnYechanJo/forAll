//package project.forAll.util;
//
//import com.example.kakaologinexample.utils.dto.KakaoTokenResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Component;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Flux;
//
//@Component
//@RequiredArgsConstructor
//public class KakaoTokenJsonData {
//    private final WebClient webClient;
//    private static final String TOKEN_URI = "https://kauth.kakao.com/oauth/token";
//    private static final String REDIRECT_URI = "https://localhost:3000/login/oauth2/callback/kakao";
//    private static final String GRANT_TYPE = "authorization_code";
//    private static final String CLIENT_ID = "ef3dbe29e95781d561acb3dfbcab36b1";
//
//    public KakaoTokenResponse getToken(String code) {
//        String uri = TOKEN_URI + "?grant_type=" + GRANT_TYPE + "&client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&code=" + code;
//        System.out.println(uri);
//
//        Flux<KakaoTokenResponse> response = webClient.post()
//                .uri(uri)
//                .contentType(MediaType.APPLICATION_JSON)
//                .retrieve()
//                .bodyToFlux(KakaoTokenResponse.class);
//
//        return response.blockFirst();
//    }
//}