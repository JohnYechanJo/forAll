package project.forAll.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import project.forAll.repository.MultiChatRepository;
import project.forAll.domain.MultiChatRoom;

import java.util.List;


@Controller
@Slf4j
@RequiredArgsConstructor
public class MultiChatRoomController {

    // ChatRepository Bean 가져오기
    private final MultiChatRepository repository;

    // 채팅 리스트 확인
    // "/" 로 요청이 들어오면 전체 채팅방 리스트를 담아서 return
    @RequestMapping("/")

    public ResponseEntity<String> chatRoomList (Model model)
    {
        List<String> roomList = repository.findAllRoom();

        if (roomList != null && !roomList.isEmpty()) {
            model.addAttribute("list", roomList);
            log.info("Show All ChatList : {}", roomList);

            // 데이터가 존재할 경우 200 OK 상태 코드와 함께 뷰 이름을 반환
            return new ResponseEntity<>("roomList", HttpStatus.OK);
        } else {
            // 데이터가 없을 경우 404 Not Found 상태 코드를 반환
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // 채팅방 생성 (리스트로 리다이렉트)
    @PostMapping("/chat/createroom")
    public ResponseEntity createRoom(@RequestBody String roomName, RedirectAttributes rttr){

        MultiChatRoom multiChatRoom = repository.createChatRoom(roomName);
        log.info("Create ChatRoom : {}", multiChatRoom);

        rttr.addFlashAttribute("roomName" , multiChatRoom);

        return new ResponseEntity(multiChatRoom.getRoomId(), HttpStatus.OK);
    }

    // 채팅방 입장 화면
    // 파라미터로 넘어오는 roomId를 확인 후 해당 roomId 를 기준으로
    // 채팅방을 찾아서 클라이언트를 chatroom 으로 보낸다.
    @GetMapping("/chat/joinroom/{room}")
    public ResponseEntity joinRoom(@PathVariable("room") String roomId,Model model){

        log.info("roomId : {}",roomId);
        model.addAttribute("room",repository.findByRoomId(roomId));

        return new ResponseEntity("join", HttpStatus.OK);
    }
}