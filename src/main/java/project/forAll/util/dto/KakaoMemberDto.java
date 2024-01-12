package project.forAll.util.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter @Setter
public class KakaoMemberDto {

    @Id @GeneratedValue
    @Column(name = "kakaoMember_id")
    private Long id;

    // KakaoAccount kakaoAccount;
    // String nickname;
}
