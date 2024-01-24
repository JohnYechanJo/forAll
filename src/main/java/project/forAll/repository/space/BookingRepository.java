package project.forAll.repository.space;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.space.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
