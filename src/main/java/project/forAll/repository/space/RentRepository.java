package project.forAll.repository.space;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.forAll.domain.space.Rent;

@Repository
public interface RentRepository extends JpaRepository<Rent, Long> {
}
