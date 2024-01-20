package project.forAll.domain.chat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import project.forAll.domain.BassDomain;

import javax.persistence.*;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
public class Message extends BassDomain {
    @Id
    @GeneratedValue
    @Column(name = "chatRoom_id")
    private Long id;

    private String messageContent; // 메시지 내용
    private boolean readFlag = false; // 읽음 여부
    private String senderId; // 보낸 회원 번호
    private String targetId; // 받는 회원 번호

    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom; // 채팅방 번호
    private String sendTime; // 메시지 보낸 시간
}
