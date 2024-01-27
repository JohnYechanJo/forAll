package project.forAll.dto.admin;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.member.ChefPending;

@Getter @Setter
public class AdminChefConfirmDTO {
    private Long id;
    private ChefPending state;
}
