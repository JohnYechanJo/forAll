package project.forAll.dto.admin;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.Image;
import project.forAll.domain.member.Gender;

import java.util.List;

@Getter @Setter
public class AdminMemberDto {
    // 개인정보
    private Long id;
    private String loginId;
    private String loginPw;
    private String name;
    private String email;
    private String phoneNum;
    private String birthday;
    private String gender;
    // 프로필
    private String introduction;
    private String profilePhoto;
    private String detailIntroduction;
    private String mbti;
    private List<String> cook;
    private List<String> cookItem;
    // 셰프 정보
    private List<String> career;
    private String certificatePhoto;
    private String accountBank;
    private String accountNum;
    private String accountHolder;
}
