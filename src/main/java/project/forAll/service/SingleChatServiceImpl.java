package project.forAll.service;

import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.forAll.domain.Message;
import project.forAll.domain.SingleChatRoom;
import project.forAll.domain.member.Member;
import project.forAll.repository.SingleChatDAO;


@Service
public class SingleChatServiceImpl implements SingleChatService {

    @Autowired
    private SingleChatDAO dao;

    @Override
    public List<SingleChatRoom> selectRoomList(int memberNo) {
        return dao.selectRoomList(memberNo);
    }

    @Override
    public int checkChattingNo(Map<String, Integer> map) {
        return dao.checkChattingNo(map);
    }

    @Override
    public int createChattingRoom(Map<String, Integer> map) {
        return dao.createChattingRoom(map);
    }


    @Override
    public int insertMessage(Message msg) {
        msg.setMessageContent(Util.XSSHandling(msg.getMessageContent()));
        return dao.insertMessage(msg);
    }

    @Override
    public int updateReadFlag(Map<String, Object> paramMap) {
        return dao.updateReadFlag(paramMap);
    }

    @Override
    public List<Message> selectMessageList( Map<String, Object> paramMap) {
        System.out.println(paramMap);

        List<Message> messageList = dao.selectMessageList(  Integer.parseInt( String.valueOf(paramMap.get("chattingNo") )));

        if(!messageList.isEmpty()) {
            int result = dao.updateReadFlag(paramMap);
        }

        return messageList;
    }

    // 채팅 상대 검색
    @Override
    public List<Member> selectTarget(Map<String, Object> map) {
        return dao.selectTarget(map);
    }

}