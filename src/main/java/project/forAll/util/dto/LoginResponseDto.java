package project.forAll.util.dto;

import lombok.Data;
import lombok.Getter;
import project.forAll.domain.member.KakaoMember;

@Data @Getter
public class LoginResponseDto {

    public boolean loginSuccess;
    public KakaoMember kakaoMember;
}
