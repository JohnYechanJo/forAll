package project.forAll.repository.space;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.Space;
import project.forAll.domain.space.SpacePending;

import java.util.List;

public interface SpaceRepository extends JpaRepository<Space, Long> {

    List<Space> findByMember(Member member);
    List<Space> findByIsPublic(boolean isPublic);
    List<Space> findBySpacePending(SpacePending pending);
}
