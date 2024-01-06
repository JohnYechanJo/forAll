package project.forAll.domain.member;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Member extends BassDomain {

    @Id @GeneratedValue
    // 가입 순서에 따라 1, 2, ... 주어지는 id
    @Column(name = "member_id")
    private Long id;

    // 호스트 또는 게스트
    private MemberRole role;
    // 로그인 ID
    private String loginId;
    // 로그인 PW
    private String loginPw;
    // 이름
    private String name;
    // 생년월일
    // @Pattern(regexp = "^\\d{8}$", message = "Birthday should be 8 digits")
    private String birthday;
    // 사업자 등록번호
    private String businessNum;
    // 성별
    private Gender gender;
    // 이메일
    private String email;
    // 전화번호
    // @Pattern(regexp = "^\\d{10,11}$", message = "Phone number should be 10 or 11 digits")
    private String phoneNum;

}
