package project.forAll.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.chat.Message;
import project.forAll.domain.chat.ChatRoom;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoom(ChatRoom chatRoom);
    List<Message> findByTargetIdAndReadFlag(String userId, boolean Flag);
}
