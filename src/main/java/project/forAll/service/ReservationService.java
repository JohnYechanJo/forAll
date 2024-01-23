package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Reservation;
import project.forAll.domain.space.Space;
import project.forAll.form.ReservationForm;
import project.forAll.repository.ReservationRepository;

@Component
@Transactional
public class ReservationService extends Service{

    @Autowired private ReservationRepository reservationRepository;
    @Autowired private MemberService memberService;
    @Autowired private SpaceService spaceService;
    @Override
    protected JpaRepository getRepository(){ return reservationRepository; }

    public Reservation build(final ReservationForm form){
        final Reservation reservation = new Reservation();
        if (form.getId() != null) reservation.setId(form.getId());
        reservation.setMember(memberService.findByLoginId(form.getMember()));
        reservation.setSpace((Space) spaceService.findById(form.getSpace()));
        reservation.setRentDay(form.getRentDay());
        reservation.setTrialDay(form.getTrialDay());

        return reservation;
    }
    public ReservationForm of(final Reservation reservation){
        final ReservationForm form = new ReservationForm();
        form.setMember(reservation.getMember().getLoginId());
        form.setSpace(reservation.getSpace().getId()); // spaceform으로 바꿔야할 수도 있음
        form.setRentDay(reservation.getRentDay());
        form.setTrialDay(reservation.getTrialDay());

        return form;
    }
    public void approveReservation(Reservation reservation){
        reservation.setPending(true);
        save(reservation);
    }
}
