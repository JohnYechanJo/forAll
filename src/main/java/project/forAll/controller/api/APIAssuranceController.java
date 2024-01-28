package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.domain.reservation.Assurance;
import project.forAll.domain.reservation.Reservation;
import project.forAll.form.AssuranceForm;
import project.forAll.repository.reservation.AssuranceRepository;
import project.forAll.service.AssuranceService;
import project.forAll.service.ReservationService;

@RestController
@RequiredArgsConstructor
public class APIAssuranceController extends APIController {
    private final AssuranceService assuranceService;
    private final AssuranceRepository assuranceRepository;
    private final ReservationService reservationService;

    @PostMapping("/assurance")
    public ResponseEntity createAssurance(@RequestBody AssuranceForm form){
        try{
            final Assurance assurance = assuranceService.build(form);
            assuranceService.save(assurance);
            return new ResponseEntity(Long.toString(assurance.getId()), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not create assurance"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/assurance")
    public ResponseEntity updateAssurance(@RequestBody AssuranceForm form){
        try{
            if (assuranceService.findById(form.getId()) == null) throw new Exception("No assurance with id " + form.getId());
            final Assurance assurance = assuranceService.build(form);
            assuranceService.save(assurance);

            return new ResponseEntity(Long.toString(assurance.getId()), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not update Assurance" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/assurance/reservation/{id}")
    public ResponseEntity getReservationAssurance(@PathVariable Reservation id){
        try{
            final Reservation reservation = (Reservation) reservationService.findById(id);
            Assurance assurance = assuranceRepository.findByReservation(reservation);
            return new ResponseEntity(assuranceService.of(assurance), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get user Assurance" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
