package project.forAll.repository.member;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.member.ChefProfile;
import project.forAll.domain.member.Profile;

import java.util.List;

public interface ChefProfileRepository extends JpaRepository<ChefProfile, Long> {

    List<ChefProfile> findByProfile(Profile profile);
}