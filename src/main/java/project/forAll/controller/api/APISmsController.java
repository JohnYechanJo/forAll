package project.forAll.controller.api;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.Random;

@RestController
public class APISmsController {
    
    // API Key 보안 신경 쓴 코드
//    @Value("${coolsms.api.key}")
//    private String apiKey;
//    @Value("${coolsms.api.secret}")
//    private String apiSecretKey;
//
    private DefaultMessageService messageService;
//
//    @PostConstruct
//    private void init(){
//        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, "https://api.coolsms.co.kr");
//    }
//
//    @PostMapping("/send-one")
//    public SingleMessageSentResponse sendOne(String to) {
//        Message message = new Message();
//        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
//        message.setFrom("01049969685");
//        message.setTo(to);
//        Random rand  = new Random();
//        String verificationCode = "";
//        for(int i=0; i<6; i++) {
//            String ran = Integer.toString(rand.nextInt(10));
//            verificationCode+=ran;
//        }
//        message.setText("[ForALL] 아래의 인증번호를 입력해주세요\n" + verificationCode);
////        message.setText("[ForALL] 아래의 인증번호를 입력해주세요\n123456");
//
//        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
//
//        return response;
//    }

    // API Key 보안 신경 안 쓴 상태
    @PostMapping("/send-one")
    public SingleMessageSentResponse sendOne(String to) {
        this.messageService =
                NurigoApp.INSTANCE.initialize("NCSVXDQ0JANEY4K3", "OUSJ8FIFCYPI5WL8O8IDLA73CZSVJS7J",
                        "https://api.coolsms.co.kr");
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01049969685");
        message.setTo(to);
        Random rand = new Random();
        String verificationCode = "";
        for(int i=0; i<6; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            verificationCode+=ran;
        }
        message.setText("[ForALL] 아래의 인증번호를 입력해주세요\n" + verificationCode);
//        message.setText("[ForALL] 아래의 인증번호를 입력해주세요\n123456");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));

        return response;
    }
}