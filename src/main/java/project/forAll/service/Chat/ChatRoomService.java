package project.forAll.service.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.chat.ChatRoomCategory;
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


    @Autowired private ChatRoomRepository chatRoomRepository;
    @Autowired private MessageRepository messageRepository;
    @Autowired private MemberService memberService;
    @Override
    protected JpaRepository getRepository(){return chatRoomRepository;};
    public List<ChatRoom> getRoomList(String userId){
        return chatRoomRepository.findByUsersLoginId(userId);
    }

    public ChatRoom getChatRoom(String userId1, String userId2, String category){

        List<ChatRoom> chatRoom = chatRoomRepository.findByUserLoginIdsAndCategory(userId1, userId2, ChatRoomCategory.parse(category));

        if (chatRoom.isEmpty()){
            final ChatRoom newRoom = new ChatRoom();
            List<Member> users = new ArrayList<>();
            users.add(memberService.findByLoginId(userId1));
            users.add(memberService.findByLoginId(userId2));
            newRoom.setUsers(users);
            newRoom.setCategory(ChatRoomCategory.parse(category));
            save(newRoom);
            return newRoom;
        }else return chatRoom.get(0);
    }
    public List<ChatRoom> getCategorizedChatRoom(String userId, String category){
        return chatRoomRepository.findByUsersLoginIdAndCategory(userId, ChatRoomCategory.parse(category));
    }

    public ChatRoom build(final ChatRoomForm form){
        final ChatRoom chatRoom = new ChatRoom();
        List<Member> users = new ArrayList<>();
        users.add(memberService.findByLoginId(form.getUserId1()));
        users.add(memberService.findByLoginId(form.getUserId2()));
        chatRoom.setUsers(users);
        chatRoom.setCategory(ChatRoomCategory.parse(form.getCategory()));

        return chatRoom;
    }
    public ChatRoomForm of(final ChatRoom chatRoom, final String userId){
        final ChatRoomForm form = new ChatRoomForm();
        form.setId(chatRoom.getId());
        form.setUserId1(chatRoom.getUsers().get(0).getLoginId());
        form.setUserId2(chatRoom.getUsers().get(1).getLoginId());
        form.setCategory(chatRoom.getCategory().toString());
        List<Message> messages = messageRepository.findByChatRoom(chatRoom);
        if (!messages.isEmpty()){
            Message lastMessage = messages.get(messages.size()-1);
            form.setLastMessage(lastMessage.getMessageContent());
            form.setSendTime(lastMessage.getSendTime());
            if (userId != null) form.setNotReadCount(messages.stream().filter(message -> !message.isReadFlag() && message.getTargetId().equals(userId)).count());
        }
        return form;
    }
}

