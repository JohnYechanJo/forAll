package project.forAll.util.dto;

import lombok.Data;
import project.forAll.domain.member.KakaoMember;

@Data
public class LoginResponseDto {

    public boolean loginSuccess;
    public KakaoMember kakaoMember;
}
