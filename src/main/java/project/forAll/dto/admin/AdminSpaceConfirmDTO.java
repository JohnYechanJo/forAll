package project.forAll.dto.admin;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.space.SpacePending;

@Getter
@Setter
public class AdminSpaceConfirmDTO {
    private Long id;
    private SpacePending state;
}
