package project.forAll.service;


import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;  // 추가

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

import project.forAll.repository.ChatRoomRepository;
import project.forAll.util.ChatRoom;
import project.forAll.repository.ChatRepository;  // 추가


@Slf4j
@Data
@Service
public class ChatService {
    private final ObjectMapper mapper;
    private Map<String, ChatRoom> chatRooms;

    @Autowired  // 추가
    private ChatRoomRepository chatRoomRepository;  // 추가

    @PostConstruct
    private void init(){
        chatRooms = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom(){
        // MySQL에서 데이터를 가져오도록 수정
        return new ArrayList<>(chatRoomRepository.findAll());
    }

    public ChatRoom findRoomById(String roomId){
        return chatRooms.get(roomId);
    }

    public ChatRoom createRoom(String name){
        String roomId = UUID.randomUUID().toString();

        //create를 사용하여 ChatRoom 을 Build
        ChatRoom room = ChatRoom.create(name);
        chatRooms.put(room.getRoomId(),room);//메모리 상의 맵에느 여전히 저장
        //MySQL에 저장
        chatRoomRepository.save(room);
        return room;
    }

    public <T> void sendMessage(WebSocketSession session, T message){
        try{
            session.sendMessage(new TextMessage(mapper.writeValueAsString(message)));;
        }catch (IOException e){
            log.error(e.getMessage(),e);
        }
    }



}
