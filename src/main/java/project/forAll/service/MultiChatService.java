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

import project.forAll.repository.MultiChatRoomRepository;
import project.forAll.domain.MultiChatRoom;


@Slf4j
@Data
@Service
public class MultiChatService {
    private final ObjectMapper mapper;
    private Map<String, MultiChatRoom> chatRooms;

    @Autowired  // 추가
    private MultiChatRoomRepository multiChatRoomRepository;  // 추가

    @PostConstruct
    private void init(){
        chatRooms = new LinkedHashMap<>();
    }

    public List<MultiChatRoom> findAllRoom(){
        // MySQL에서 데이터를 가져오도록 수정
        return new ArrayList<>(multiChatRoomRepository.findAll());
    }

    public MultiChatRoom findRoomById(String roomId){
        return chatRooms.get(roomId);
    }

    public MultiChatRoom createRoom(String name){
        String roomId = UUID.randomUUID().toString();

        //create를 사용하여 ChatRoom 을 Build
        MultiChatRoom room = MultiChatRoom.create(name);
        chatRooms.put(room.getRoomId(),room);//메모리 상의 맵에느 여전히 저장
        //MySQL에 저장
        multiChatRoomRepository.save(room);
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
