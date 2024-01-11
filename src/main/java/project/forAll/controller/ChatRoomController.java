package project.forAll.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import project.forAll.repository.ChatRepository;
import project.forAll.util.ChatRoom;



@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatRoomController {

    // ChatRepository Bean 가져오기
    private final ChatRepository repository;

    // 채팅 리스트 확인
    // "/" 로 요청이 들어오면 전체 채팅방 리스트를 담아서 return
    @RequestMapping("/")
    public String ChatRoomList(Model model){

        model.addAttribute("list",repository.findAllRoom());
        log.info("Show All CharList : {}",repository.findAllRoom());

        return "roomList";
    }

    // 채팅방 생성 (리스트로 리다이렉트)
    @PostMapping("/chat/createroom")
    public ResponseEntity createRoom(@RequestBody String roomName, RedirectAttributes rttr){

        ChatRoom chatRoom = repository.createChatRoom(roomName);
        log.info("Create ChatRoom : {}",chatRoom);

        rttr.addFlashAttribute("roomName" , chatRoom);

        return new ResponseEntity("create", HttpStatus.OK);
    }

    // 채팅방 입장 화면
    // 파라미터로 넘어오는 roomId를 확인 후 해당 roomId 를 기준으로
    // 채팅방을 찾아서 클라이언트를 chatroom 으로 보낸다.
    @GetMapping("/chat/joinroom")
    public String joinRoom(String roomId,Model model){

        log.info("roomId : {}",roomId);
        model.addAttribute("room",repository.findByRoomId(roomId));

        return "chatroom";
    }
}