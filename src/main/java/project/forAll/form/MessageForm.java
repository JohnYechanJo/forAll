package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class MessageForm {
    private Long id;
    private String messageContent; // 메시지 내용

    private String senderId; // 보낸 회원 번호
    private String targetId; // 받는 회원 번호
    private Long chatRoomId; // 채팅방 번호
    private String sendTime; // 메시지 보낸 시간
    private Boolean readFlag; // 읽음 여부
    private Boolean isImage; // 사진 여부
}
