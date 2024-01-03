package project.forAll.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Entity
@Getter @Setter
public class AuthenticationData extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "data_id")
    private Long id;

    // 전송받은 휴대폰 번호
    private String phoneNum;
    // 전송받은 인증번호
    private String authenticationNum;
    // 전송받은 시간
    private ZonedDateTime time;


}
