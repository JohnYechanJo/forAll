package project.forAll.repository.space;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.forAll.domain.space.Place;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
}
