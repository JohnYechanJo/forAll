package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

@Getter @Setter
@NoArgsConstructor
public class LoginForm {

    private String loginId;
    private String loginPw;
}
