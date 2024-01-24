package project.forAll.repository.member;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.member.Profile;
import project.forAll.domain.member.Member;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    List<Profile> findByMember(Member member);
}
