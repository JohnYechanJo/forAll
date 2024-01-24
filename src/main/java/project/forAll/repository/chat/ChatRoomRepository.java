package project.forAll.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.chat.ChatRoomCategory;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByUsersLoginId(String userId);

    List<ChatRoom> findByUsersLoginIdAndCategory(String userId, ChatRoomCategory category);
    @Query("SELECT scr FROM ChatRoom scr " +
            "JOIN scr.users user1 " +
            "JOIN scr.users user2 " +
            "WHERE user1.loginId = :loginId1 AND user2.loginId = :loginId2")
    List<ChatRoom> findByUserLoginIds(@Param("loginId1") String loginId1, @Param("loginId2") String loginId2);

    @Query("SELECT scr FROM ChatRoom scr " +
            "JOIN scr.users user1 " +
            "JOIN scr.users user2 " +
            "WHERE user1.loginId = :loginId1 AND user2.loginId = :loginId2 AND scr.category = :category")
    List<ChatRoom> findByUserLoginIdsAndCategory(
            @Param("loginId1") String loginId1,
            @Param("loginId2") String loginId2,
            @Param("category") ChatRoomCategory category);
}
