package project.forAll.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.util.MultiChatRoom;

public interface MultiChatRoomRepository extends JpaRepository<MultiChatRoom, String> {
    // 추가적인 쿼리 메서드가 필요하면 여기에 정의할 수 있습니다.
}
