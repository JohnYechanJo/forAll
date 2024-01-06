package project.forAll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.AuthenticationData;
import project.forAll.domain.Image;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByOriginName(String originName);
    List<Image> findByImageName(String imageName);
}
