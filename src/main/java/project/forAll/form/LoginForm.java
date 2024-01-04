package project.forAll.form;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Data
public class LoginForm {
    @NotBlank
    private String loginId;

    @NotBlank
    private String loginPw;
}
