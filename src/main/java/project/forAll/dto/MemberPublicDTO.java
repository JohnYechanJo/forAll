package project.forAll.dto;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.member.ChefPending;
import project.forAll.domain.member.Gender;

@Getter @Setter
public class MemberPublicDTO {
    // 고유 id
    private Long id;
    // 로그인 ID
    private String loginId;
    // 이름
    private String name;
    // 이메일
    private String email;
    // 전화번호
    // @Pattern(regexp = "^\\d{10,11}$", message = "Phone number should be 10 or 11 digits")
    private String phoneNum;
    // 생년월일
    // @Pattern(regexp = "^\\d{8}$", message = "Birthday should be 8 digits")
    private String birthday;
    // 성별
    private Gender gender;
    // 셰프 펜딩 여부
    private String chefPending;
    // 프로필 이미지
    private String profileImage;
}
