package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.reservation.Assurance;
import project.forAll.domain.reservation.Reservation;
import project.forAll.form.AssuranceForm;
import project.forAll.repository.reservation.AssuranceRepository;

@Component
@Transactional
public class AssuranceService extends Service{
    @Autowired private AssuranceRepository assuranceRepository;
    @Autowired private ReservationService reservationService;
    @Autowired private ImageService imageService;

    @Override
    protected JpaRepository getRepository(){ return assuranceRepository; }

    public Assurance build(final AssuranceForm form){
        final Assurance assurance = new Assurance();
        if(form.getId() != null) assurance.setId(form.getId());
        assurance.setReservation((Reservation) reservationService.findById(form.getReservation()));
        assurance.setReadyKitImage(imageService.findListByIds(form.getReadyKitImage()));
        assurance.setReadyHallImage(imageService.findListByIds(form.getReadyHallImage()));
        assurance.setReadyAdditionalImage(imageService.findByImageName(form.getReadyAdditionalImage()));
        assurance.setReadyRecord(form.getReadyRecord());
        assurance.setFinKitImage(imageService.findListByIds(form.getFinKitImage()));
        assurance.setFinHallImage(imageService.findListByIds(form.getFinHallImage()));
        assurance.setFinAdditionalImage(imageService.findByImageName(form.getFinAdditionalImage()));
        assurance.setFinRecord(form.getFinRecord());

        return assurance;
    }
    public AssuranceForm of(final Assurance assurance){
        final AssuranceForm form = new AssuranceForm();
        form.setId(assurance.getId());
        form.setReservation(assurance.getReservation().getId());
        form.setReadyKitImage(imageService.getImagesNames(assurance.getReadyKitImage()));
        form.setReadyHallImage(imageService.getImagesNames(assurance.getReadyHallImage()));
        form.setReadyAdditionalImage(imageService.getImageName(assurance.getReadyAdditionalImage()));
        form.setReadyRecord(assurance.getReadyRecord());
        form.setFinKitImage(imageService.getImagesNames(assurance.getFinKitImage()));
        form.setFinHallImage(imageService.getImagesNames(assurance.getFinHallImage()));
        form.setFinRecord(assurance.getFinRecord());

        return form;
    }
}
