package project.forAll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.reservation.Reservation;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.ReservationCancelState;
import project.forAll.domain.reservation.ReservationState;
import project.forAll.domain.space.Space;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByMember(Member member);
    List<Reservation> findBySpace(Space space);
    List<Reservation> findByState(ReservationState state);
    List<Reservation> findByCancelState(ReservationCancelState state);
}
