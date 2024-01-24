package project.forAll.repository.space.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.forAll.domain.space.image.HallImage;

@Repository
public interface HallImageRepository extends JpaRepository<HallImage, Long> {
}
