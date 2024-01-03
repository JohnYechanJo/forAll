package project.forAll.service;

import net.nurigo.sdk.message.model.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

//import java.util.NoSuchElementException;
//
//@Service
//public ResponseEntity<?> SmsService (FindEmailRequestDto requestDto) {
//    String name = requestDto.getName();
//    //수신번호 형태에 맞춰 "-"을 ""로 변환
//    String phoneNum = requestDto.getPhoneNum().replaceAll("-","");
//
//    User foundUser = userRepository.findByNameAndPhone(name, phoneNum).orElseThrow(()->
//            new NoSuchElementException("회원이 존재하지 않습니다."));
//
//    String receiverEmail = foundUser.getEmail();
//    String verificationCode = validationUtil.createCode();
//    smsUtil.sendOne(phoneNum, verificationCode);
//
//    //인증코드 유효기간 5분 설정
//    redisUtil.setDataExpire(verificationCode, receiverEmail, 60 * 5L);
//
//    return ResponseEntity.ok(new Message("SMS 전송 성공"));
//}