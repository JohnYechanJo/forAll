package project.forAll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
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
}
