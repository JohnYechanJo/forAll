package project.forAll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.reservation.Assurance;
import project.forAll.domain.reservation.Reservation;

import java.util.List;

public interface AssuranceRepository extends JpaRepository<Assurance, Long> {
    Assurance findByReservation(Reservation reservation);
}
