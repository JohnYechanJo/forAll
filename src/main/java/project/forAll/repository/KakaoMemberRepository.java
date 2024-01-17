package project.forAll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.member.KakaoMember;

public interface KakaoMemberRepository  extends JpaRepository<KakaoMember, Long> {
}