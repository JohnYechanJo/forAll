package project.forAll.dto.admin;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.reservation.ReservationState;

@Getter @Setter
public class AdminReservationConfirmDTO {
    private Long id;
    private ReservationState state;
}
