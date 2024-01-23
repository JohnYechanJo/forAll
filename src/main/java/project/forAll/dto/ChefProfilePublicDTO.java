package project.forAll.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ChefProfilePublicDTO {
    // 고유 id
    private Long id;
    // 경력
    private List<String> career;
}
