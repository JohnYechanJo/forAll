package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class ChatRoomForm {
    private Long id;
    private String userId1;
    private String userId2;
    private String lastMessage; // 최근 메시지
    private String sendTime; // 메시지 보낸 시간
    private Long notReadCount; // 읽지 않은 메시지 개수
}
