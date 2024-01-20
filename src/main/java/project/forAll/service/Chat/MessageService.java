package project.forAll.service.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.chat.Message;
import project.forAll.form.MessageForm;
import project.forAll.repository.chat.ChatRoomRepository;
import project.forAll.repository.chat.MessageRepository;
import project.forAll.service.Service;

import java.util.List;

@Component
@Transactional
public class MessageService extends Service {
    @Autowired private MessageRepository messageRepository;
    @Autowired private ChatRoomRepository chatRoomRepository;

    @Override
    protected JpaRepository getRepository() { return messageRepository;}

    public List<MessageForm> getMessageList(final ChatRoom chatRoom){
        final List<Message> messages = messageRepository.findByChatRoom(chatRoom);
        return messages.stream().map(message -> of(message)).toList();
    }
    public Message build(final MessageForm form){
        final Message message = new Message();
        message.setMessageContent(form.getMessageContent());
        message.setSenderId(form.getSenderId());
        message.setTargetId(form.getTargetId());
        message.setChatRoom(chatRoomRepository.findById(form.getChatRoomId()).orElseThrow(() -> new IllegalArgumentException("chat room doesn't exist")));
        message.setSendTime(form.getSendTime());
        message.setImage(form.getIsImage());
        return message;
    }
    public MessageForm of(final Message message){
        final MessageForm form = new MessageForm();
        form.setId(message.getId());
        form.setMessageContent(message.getMessageContent());
        form.setSenderId(message.getSenderId());
        form.setTargetId(message.getTargetId());
        form.setChatRoomId(message.getChatRoom().getId());
        form.setSendTime(message.getSendTime());
        form.setReadFlag(message.isReadFlag());
        form.setIsImage(message.isImage());
        return form;
    }
}
