package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.domain.reservation.Reservation;
import project.forAll.domain.member.Member;
import project.forAll.domain.reservation.ReservationState;
import project.forAll.form.ReservationForm;
import project.forAll.repository.ReservationRepository;
import project.forAll.service.MemberService;
import project.forAll.service.ReservationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class APIReservationController extends APIController{

    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;
    private final MemberService memberService;
    private final SessionManager sessionManager;

    @PostMapping("/reservation")
    public ResponseEntity createReservation(@RequestBody ReservationForm form){
        try{
            final Reservation reservation = reservationService.build(form);
            reservationService.save(reservation);
            return new ResponseEntity(Long.toString(reservation.getId()), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not create reservation"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/reservation")
    public ResponseEntity updateReservation(@RequestBody ReservationForm form){
        try{
            if (reservationService.findById(form.getId()) == null) throw new Exception("No reservation with id " + form.getId());
            final Reservation reservation = reservationService.build(form);
            reservationService.save(reservation);

            return new ResponseEntity(Long.toString(reservation.getId()), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not update Reservation" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/reservation/{id}")
    public ResponseEntity deleteReservation(@PathVariable Long id){
        try{
            final Reservation reservation = (Reservation) reservationService.findById(id);
            if (reservation == null) throw new Exception("No reservation with id " + id);

            memberService.delete(reservation);
            return new ResponseEntity(Long.toString(id), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not delete Reservation" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/reservation/{id}")
    public ResponseEntity getReservation(@PathVariable Long id){
        try{
            final Reservation reservation = (Reservation) reservationService.findById(id);
            if (reservation == null) throw new Exception("No reservation with id " + id);

            return new ResponseEntity(reservationService.of(reservation), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get Reservation" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/reservation/state/{id}/{state}")
    public ResponseEntity approveReservation(@PathVariable Long id, @PathVariable String state){
        try{
            // todo 어드민 권한 확인
            final Reservation reservation = (Reservation) reservationService.findById(id);
            if (reservation == null) throw new Exception("No reservation with id " + id);
            reservation.setState(ReservationState.parse(state));
            reservationService.save(reservation);

            return new ResponseEntity(Long.toString(reservation.getId()), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not approve Reservation" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/reservation/pendingList")
    public ResponseEntity getPendingReservation(){
        try{
            List<Reservation> reservations = reservationRepository.findByState(ReservationState.PENDING);
            List<ReservationForm> forms = reservations.stream().map(reservation -> reservationService.of(reservation)).toList();
            return new ResponseEntity(forms, HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get pending Reservation" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/reservation/user/{id}")
    public ResponseEntity getUserReservation(@PathVariable(value = "id") String userId){
        try{
            final Member member = memberService.findByLoginId(userId);
            List<Reservation> reservations = reservationRepository.findByMember(member);
            List<ReservationForm> forms = reservations.stream().map(reservation -> reservationService.of(reservation)).toList();
            return new ResponseEntity(forms, HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get user Reservation" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
