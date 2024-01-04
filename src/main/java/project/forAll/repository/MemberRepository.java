package project.forAll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.forAll.domain.Member;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // List<Member>에서 Member로 수정
    List<Member> findByLoginId(String loginId);

    List<Member> findByEmail(String email);
}
