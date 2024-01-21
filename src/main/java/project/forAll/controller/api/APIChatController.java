package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.chat.Message;
import project.forAll.dto.ChatDto;
import project.forAll.form.ChatRoomForm;
import project.forAll.form.MessageForm;
import project.forAll.service.Chat.ChatRoomService;
import project.forAll.service.Chat.MessageService;
import retrofit2.http.Path;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class APIChatController extends APIController{
    private final ChatRoomService chatRoomService;
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;
    private final SessionManager sessionManager;

    /**
     * 사용자 아이디와 카테고리에 해당하는 채팅방 list 반환
     * @param userId
     * @param category
     * @return chatroomlist
     */
    @GetMapping("/chat/roomlist/{id}/{category}")
    public ResponseEntity getUserRoomList(@PathVariable(value = "id") final String userId, @PathVariable String category){
        try{
            List<ChatRoom> chatRoomList = chatRoomService.getCategorizedChatRoom(userId, category);
            List<ChatRoomForm> chatRoomForms = chatRoomList.stream().map(chatRoom -> chatRoomService.of(chatRoom, userId)).toList();

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
    @GetMapping("/chat/message/{id}")
    public ResponseEntity getChatRoomMessage(@PathVariable Long id, HttpServletRequest request){
        try{
            final ChatRoom chatRoom = (ChatRoom) chatRoomService.findById(id);
            List<MessageForm> messageFormList = messageService.getMessageList(chatRoom);
            // 메시지 확인 과정
            String loginId = (String) sessionManager.getSession(request);
            messageService.checkMessageList(messageFormList.stream().map(messageForm -> messageForm.getId()).toList(), loginId);

            return new ResponseEntity(messageFormList, HttpStatus.OK);
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
    @GetMapping("/chat/join/{userId1}/{userId2}/{category}")
    public ResponseEntity joinChatRoom(@PathVariable String userId1, @PathVariable String userId2, @PathVariable String category){
        try{
            final ChatRoom chatRoom = chatRoomService.getChatRoom(userId1, userId2, category);
            return new ResponseEntity(chatRoomService.of(chatRoom, null), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not join Chat Room : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@RequestBody MessageForm form){
        // Todo : headerAccessor로 특정 유저에게 send하도록 변경
        final Message message = messageService.build(form);
        messageService.save(message);
        messagingTemplate.convertAndSend("/sub/chat/room/"+form.getChatRoomId(),messageService.of(message));
        return;
    }

    @GetMapping("/chat/check/{id}")
    public ResponseEntity checkMessage(@PathVariable(value="id") Long messageId, HttpServletRequest request){
        try{
            String loginId = (String) sessionManager.getSession(request);
            List<Long> messageList = new ArrayList<>();
            messageList.add(messageId);
            messageService.checkMessageList(messageList, loginId);
            return new ResponseEntity(Long.toString(messageId), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not check message :" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }
}