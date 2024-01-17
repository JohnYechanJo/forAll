package project.forAll.util;

import lombok.Data;
import lombok.Getter;
import lombok.Builder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Data
@Getter
@Entity
public class ChatRoom {

    @Id
    private String roomId;  // 채팅방 아이디
    private String roomName;// 채팅방 이름
    private long userCount; // 채팅방 인원수
    @ElementCollection
    @CollectionTable(
            name = "user_list",
            joinColumns = @JoinColumn(name = "room_id")
    )
    private List<User> userList = new ArrayList<>();

    public static ChatRoom create(String roomName) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.roomName = roomName;

        return chatRoom;
    }
}