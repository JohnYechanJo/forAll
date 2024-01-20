package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.chat.Message;
import project.forAll.dto.ChatDto;
import project.forAll.form.ChatRoomForm;
import project.forAll.form.MessageForm;
import project.forAll.service.Chat.ChatRoomService;
import project.forAll.service.Chat.MessageService;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class APIChatController extends APIController{
    private final ChatRoomService chatRoomService;
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * 유저 아이디에 해당하는 채팅창 정보들을 받아옴
     * @param userId 유저 아이디
     * @return 채팅창 리스트
     */
    @GetMapping("/chat/roomlist/{id}")
    public ResponseEntity getUserRoomList(@PathVariable(value = "id") final String userId){
        try{
            List<ChatRoom> chatRoomList = chatRoomService.getRoomList(userId);
            List<ChatRoomForm> chatRoomForms = chatRoomList.stream().map(chatRoom -> chatRoomService.of(chatRoom)).toList();

            return new ResponseEntity(chatRoomForms, HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get user ChatRoom List : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 채팅창 id에 해당하는 message List를 반환
     * @param id 채팅창 id
     * @return message list
     */
    @GetMapping("/chat/{id}")
    public ResponseEntity getChatRoomMessage(@PathVariable Long id){
        try{
            final ChatRoom chatRoom = (ChatRoom) chatRoomService.findById(id);
            return new ResponseEntity(messageService.getMessageList(chatRoom), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get ChatRoom Message List : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 유저 아이디를 통해 채팅방에 입장, 없다면 생성
     * @param userId1
     * @param userId2
     * @return 채팅방 id
     */
    @GetMapping("/chat/join/{userId1}/{userId2}")
    public ResponseEntity joinChatRoom(@PathVariable String userId1, @PathVariable String userId2){
        try{
            final ChatRoom chatRoom = chatRoomService.getChatRoom(userId1, userId2);
            return new ResponseEntity(Long.toString(chatRoom.getId()), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not join Chat Room : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@RequestBody MessageForm form){
        // Todo : headerAccessor로 특정 유저에게 send하도록 변경
        final Message message = messageService.build(form);
        messageService.save(message);
        messagingTemplate.convertAndSend("/sub/chat/room/"+form.getChatRoomId(),form);
        return;
    }
}
