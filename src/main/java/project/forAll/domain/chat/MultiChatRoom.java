package project.forAll.domain.chat;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.util.HashMap;
import java.util.UUID;

@Data
@Getter
@Entity

public class MultiChatRoom {

    @Id
    private String roomId;  // 채팅방 아이디
    private String roomName;// 채팅방 이름
    private long userCount; // 채팅방 인원수
    @ElementCollection
    @CollectionTable(name = "user_list", joinColumns = @JoinColumn(name = "room_id"))
    @MapKeyColumn(name = "user_id")
    @Column(name = "user_name")
    private HashMap<String, String> userList = new HashMap<>();

    public static MultiChatRoom create(String roomName) {
        MultiChatRoom multiChatRoom = new MultiChatRoom();
        multiChatRoom.roomId = UUID.randomUUID().toString();
        multiChatRoom.roomName = roomName;

        return multiChatRoom;
    }
}