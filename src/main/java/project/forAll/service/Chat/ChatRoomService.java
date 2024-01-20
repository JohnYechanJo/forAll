package project.forAll.service.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.chat.Message;
import project.forAll.domain.member.Member;
import project.forAll.form.ChatRoomForm;
import project.forAll.repository.chat.MessageRepository;
import project.forAll.repository.chat.ChatRoomRepository;
import project.forAll.service.MemberService;
import project.forAll.service.Service;

import java.util.ArrayList;
import java.util.List;

@Component
@Transactional
public class ChatRoomService extends Service {


    @Autowired private ChatRoomRepository singleChatRoomRepository;
    @Autowired private MessageRepository messageRepository;
    @Autowired private MemberService memberService;
    @Override
    protected JpaRepository getRepository(){return singleChatRoomRepository;};
    public List<ChatRoom> getRoomList(String userId){
        return singleChatRoomRepository.findByUsersLoginId(userId);
    }

    public ChatRoom getChatRoom(String userId1, String userId2){
        List<ChatRoom> chatRoom = singleChatRoomRepository.findByUserLoginIds(userId1, userId2);
        if (chatRoom.isEmpty()){
            final ChatRoom newRoom = new ChatRoom();
            List<Member> users = new ArrayList<>();
            users.add(memberService.findByLoginId(userId1));
            users.add(memberService.findByLoginId(userId2));
            newRoom.setUsers(users);
            save(newRoom);
            return newRoom;
        }else return chatRoom.get(0);
    }

    public ChatRoom build(final ChatRoomForm form){
        final ChatRoom chatRoom = new ChatRoom();
        List<Member> users = new ArrayList<>();
        users.add(memberService.findByLoginId(form.getUserId1()));
        users.add(memberService.findByLoginId(form.getUserId2()));
        chatRoom.setUsers(users);

        return chatRoom;
    }
    public ChatRoomForm of(final ChatRoom chatRoom){
        final ChatRoomForm form = new ChatRoomForm();
        form.setId(chatRoom.getId());
        form.setUserId1(chatRoom.getUsers().get(0).getLoginId());
        form.setUserId2(chatRoom.getUsers().get(1).getLoginId());

        List<Message> messages = messageRepository.findByChatRoom(chatRoom);
        if (!messages.isEmpty()){
            Message lastMessage = messages.get(messages.size()-1);
            form.setLastMessage(lastMessage.getMessageContent());
            form.setSendTime(lastMessage.getSendTime());

            form.setNotReadCount(messages.stream().filter(message -> !message.isReadFlag()).count());
        }
        return form;
    }
}

