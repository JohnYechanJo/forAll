package project.forAll.repository.space;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.forAll.domain.space.Kitchen;

@Repository
public interface KitchenRepository extends JpaRepository<Kitchen, Long> {
}

