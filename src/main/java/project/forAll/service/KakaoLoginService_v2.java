//package project.forAll.service;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationFeature;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//import project.forAll.domain.member.KakaoMember;
//import project.forAll.repository.KakaoMemberRepository;
//import project.forAll.util.dto.KakaoMemberDto;
//import project.forAll.util.dto.KakaoTokenDto;
//import project.forAll.util.dto.LoginResponseDto;
//
//@Component
//@Transactional(readOnly = true)
//public class KakaoLoginService_v2 extends Service {
//
//    @Autowired
//    private KakaoMemberRepository kakaoMemberRepository;
//
//    @Override
//    protected JpaRepository getRepository() {
//        return kakaoMemberRepository;
//    }

//    // 인가 코드 받아서 access token 반환
//    public String getAccessToken(String code) {
//        String accessToken = "";
//        String refreshToken = "";
//        String reqUrl = "https://kauth.kakao.com/oauth/token";
//
//        try{
//            // token 발급받는 url 저장
//            URL url = new URL(reqUrl);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//            // 필수 헤더 세팅
//            conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded");
//            conn.setDoOutput(true); //OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.
//
//            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
//            StringBuilder sb = new StringBuilder();
//
//            // 필수 쿼리 파라미터 세팅 (이 링크로 POST 요청을 보내면 access token과 refresh token이 응답으로 나옴)
//            sb.append("grant_type=authorization_code");
//            sb.append("&client_id=").append("ef3dbe29e95781d561acb3dfbcab36b1");
//            sb.append("&redirect_uri=").append("http://localhost:3000/login/oauth2/callback/kakao");
//            sb.append("&code=").append(code);
//
//            bw.write(sb.toString());
//            bw.flush();
//
//            int responseCode = conn.getResponseCode();
//            // log.info("[KakaoApi.getAccessToken] responseCode = {}", responseCode);
//
//            BufferedReader br;
//            if (responseCode >= 200 && responseCode <= 300) {
//                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            } else {
//                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
//            }
//
//            String line = "";
//            StringBuilder responseSb = new StringBuilder();
//            while((line = br.readLine()) != null){
//                responseSb.append(line);
//            }
//            String result = responseSb.toString();
//            // log.info("responseBody = {}", result);
//
//            JsonParser parser = new JsonParser();
//            JsonElement element = parser.parse(result);
//            // JsonElement 형식인 element를 JsonObject 객체로 바꿔서 access token과 refresh token을 찾는다
//            accessToken = element.getAsJsonObject().get("access_token").getAsString();
//            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();
//
//            br.close();
//            bw.close();
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return accessToken;
//    }
//
//    public HashMap<String, Object> getUserInfo(String accessToken) {
//        HashMap<String, Object> userInfo = new HashMap<>();
//        String reqUrl = "https://kapi.kakao.com/v2/user/me";
//        try{
//            URL url = new URL(reqUrl);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("POST");
//            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
//            conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//            int responseCode = conn.getResponseCode();
//            // log.info("[KakaoApi.getUserInfo] responseCode : {}",  responseCode);
//
//            BufferedReader br;
//            if (responseCode >= 200 && responseCode <= 300) {
//                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            } else {
//                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
//            }
//
//            String line = "";
//            StringBuilder responseSb = new StringBuilder();
//            while((line = br.readLine()) != null){
//                responseSb.append(line);
//            }
//            String result = responseSb.toString();
//            // log.info("responseBody = {}", result);
//
//            JsonParser parser = new JsonParser();
//            JsonElement element = parser.parse(result);
//
//            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
//            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
//
//            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
//            String email = kakaoAccount.getAsJsonObject().get("email").getAsString();
//
//            userInfo.put("nickname", nickname);
//            userInfo.put("email", email);
//
//            br.close();
//
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return userInfo;
//    }
//
//    public void kakaoLogout(String accessToken) {
//        String reqUrl = "https://kapi.kakao.com/v1/user/logout";
//
//        try{
//            URL url = new URL(reqUrl);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("POST");
//            conn.setRequestProperty("Authorization", "Bearer " + accessToken);
//
//            int responseCode = conn.getResponseCode();
//            // log.info("[KakaoApi.kakaoLogout] responseCode : {}",  responseCode);
//
//            BufferedReader br;
//            if (responseCode >= 200 && responseCode <= 300) {
//                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            } else {
//                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
//            }
//
//            String line = "";
//            StringBuilder responseSb = new StringBuilder();
//            while((line = br.readLine()) != null){
//                responseSb.append(line);
//            }
//            String result = responseSb.toString();
//            // log.info("kakao logout - responseBody = {}", result);
//
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//    }
//}