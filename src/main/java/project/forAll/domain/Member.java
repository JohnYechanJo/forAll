package project.forAll.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Member {

    @Id @GeneratedValue
    // 가입 순서에 따라 1, 2, ... 주어지는 id (저는 항상 필수로 넣었는데 없어도 되면 삭제해주세요)
    @Column(name = "user_id")
    private Long id;

    // interface로 쪼개는 방법을 모르겠어서 일단 role로 적어둡니다..
    private String role;
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
    private String gender;
    // 이메일
    private String email;
    // 전화번호
    // @Pattern(regexp = "^\\d{10,11}$", message = "Phone number should be 10 or 11 digits")
    private String phoneNum;

}
