package project.forAll.repository.space;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.space.Space;

public interface SpaceRepository extends JpaRepository<Space, Long> {
}
