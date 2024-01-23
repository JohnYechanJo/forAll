package project.forAll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.Reservation;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.Space;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByMember(Member member);
    List<Reservation> findBySpace(Space space);
    List<Reservation> findByPending(boolean pending);
}
