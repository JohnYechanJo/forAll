package project.forAll.domain;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SingleChatRoom {
    private int chattingNo; // 채팅방 번호
    private String lastMessage; // 최근 메시지
    private String sendTime; // 메시지 보낸 시간
    private int targetNo; // 받는 회원 번호
    private String targetNickName; // 받는 회원 닉네임
    private String targetProfile; // 받는 회원 프로필 사진
    private int notReadCount; // 읽지 않은 메시지 개수

}

