package project.forAll.repository.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
<<<<<<< HEAD
import project.forAll.domain.member.ChefPending;
=======
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
import project.forAll.domain.member.Member;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // List<Member>보다 Member가 더 자연스럽긴 함
    List<Member> findByLoginId(String loginId);
    List<Member> findByEmail(String email);
    List<Member> findByLoginIdAndPhoneNum(String loginId, String phoneNum);
    List<Member> findByNameAndPhoneNum(String name, String phoneNum);
    List<Member> findByLoginIdAndLoginPw(String loginId, String loginPw);
<<<<<<< HEAD
    List<Member> findByChefPending(ChefPending chefPending);
=======
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
}
