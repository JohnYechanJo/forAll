package project.forAll.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import project.forAll.domain.Message;
import project.forAll.domain.SingleChatRoom;
import project.forAll.domain.member.Member;
import project.forAll.service.SingleChatService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SessionAttributes({"loginMember"})
@Controller
public class SingleChatController {

    @Autowired
    private SingleChatService service;

    // 채팅 페이지
    @GetMapping("/chatting")
    public String chatting(@SessionAttribute("loginMember") Member loginMember, Model model) {

        // 현재 개설되어 있는 채팅방 목록 불러오기
        List<SingleChatRoom> roomList = service.selectRoomList(Math.toIntExact(loginMember.getId()));
        model.addAttribute("roomList", roomList);

        return "chatting/chatting";
    }

    // 채팅 상대 검색
    @GetMapping(value="/chatting/selectTarget", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<Member> selectTarget(String query, @SessionAttribute("loginMember") Member loginMember){

        Map<String, Object> map = new HashMap<>();

        map.put("memberNo", loginMember.getId());
        map.put("query", query);

        return service.selectTarget(map);
    }

    // 채팅방 입장(없으면 생성)
    @GetMapping("/chatting/enter")
    @ResponseBody
    public int chattingEnter(int targetNo, @SessionAttribute("loginMember") Member loginMember) {

        Map<String, Integer> map = new HashMap<String, Integer>();

        map.put("targetNo", targetNo);
        map.put("loginMemberNo", Math.toIntExact(loginMember.getId()));

        int chattingNo = service.checkChattingNo(map);

        // 받는 회원과 생성된 채팅방이 없을 경우 채팅방 번호 새로 생성
        if(chattingNo == 0) {
            chattingNo = service.createChattingRoom(map);
        }

        return chattingNo;
    }

    // 채팅방 목록 조회
    @GetMapping(value="/chatting/roomList", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<SingleChatRoom> selectRoomList(@SessionAttribute("loginMember") Member loginMember) {
        return service.selectRoomList(Math.toIntExact(loginMember.getId()));
    }

    // 채팅 읽음 표시
    @PutMapping("/chatting/updateReadFlag")
    @ResponseBody
    public int updateReadFlag(@RequestBody Map<String, Object> paramMap) {
        return service.updateReadFlag(paramMap);
    }

    // 채팅방 번호에 해당하는 메시지 목록 조회
    @GetMapping(value="/chatting/selectMessage", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<Message> selectMessageList(@RequestParam Map<String, Object> paramMap) {
        return service.selectMessageList(paramMap);
    }

}
