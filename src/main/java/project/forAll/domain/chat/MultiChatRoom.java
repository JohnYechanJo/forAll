//package project.forAll.domain.chat;
//
//import lombok.Data;
//import lombok.Getter;
//
//import javax.persistence.*;
//import java.util.HashMap;
//import java.util.UUID;
//
//@Data
//@Getter
//@Entity
//
//public class MultiChatRoom {
//
//    @Id
//    private String roomId;  // 채팅방 아이디
//    private String roomName;// 채팅방 이름
//    private long userCount; // 채팅방 인원수
//
//    public static MultiChatRoom create(String roomName) {
//        MultiChatRoom multiChatRoom = new MultiChatRoom();
//        multiChatRoom.roomId = UUID.randomUUID().toString();
//        multiChatRoom.roomName = roomName;
//
//        return multiChatRoom;
//    }
//}