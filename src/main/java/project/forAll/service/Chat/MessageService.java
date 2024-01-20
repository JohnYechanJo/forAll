package project.forAll.service.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.chat.Message;
import project.forAll.form.MessageForm;
import project.forAll.repository.chat.ChatRoomRepository;
import project.forAll.repository.chat.MessageRepository;
import project.forAll.service.Service;

@Component
@Transactional
public class MessageService extends Service {
    @Autowired private MessageRepository messageRepository;
    @Autowired private ChatRoomRepository chatRoomRepository;

    @Override
    protected JpaRepository getRepository() { return messageRepository;}

    public Message build(final MessageForm form){
        final Message message = new Message();
        message.setMessageContent(form.getMessageContent());
        message.setSenderId(form.getSenderId());
        message.setTargetId(form.getTargetId());
        message.setChatRoom(chatRoomRepository.findById(form.getChatRoomId()).orElseThrow(() -> new IllegalArgumentException("chat room doesn't exist")));
        message.setSendTime(form.getSendTime());
        return message;
    }
    public MessageForm of(final Message message){
        final MessageForm form = new MessageForm();
        form.setMessageContent(message.getMessageContent());
        form.setSenderId(message.getSenderId());
        form.setTargetId(message.getTargetId());
        form.setChatRoomId(message.getChatRoom().getId());
        form.setSendTime(message.getSendTime());
        form.setReadFlag(message.isReadFlag());
        return form;
    }
}
