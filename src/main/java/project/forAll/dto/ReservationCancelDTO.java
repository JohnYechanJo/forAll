package project.forAll.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationCancelDTO {
    private Long id;
    private String reason;
    private String cancelTime;
}
