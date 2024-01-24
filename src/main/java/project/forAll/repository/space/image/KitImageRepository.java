package project.forAll.repository.space.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.forAll.domain.space.image.KitImage;

@Repository
public interface KitImageRepository extends JpaRepository<KitImage, Long> {
}
