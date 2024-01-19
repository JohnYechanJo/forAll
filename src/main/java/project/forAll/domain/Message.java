package project.forAll.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Message {
    private int messageNo; // 메시지 번호
    private String messageContent; // 메시지 내용
    private String readFlag; // 읽음 여부
    private int senderNo; // 보낸 회원 번호
    private int targetNo; // 받는 회원 번호
    private int chattingNo; // 채팅방 번호
    private String sendTime; // 메시지 보낸 시간
}
