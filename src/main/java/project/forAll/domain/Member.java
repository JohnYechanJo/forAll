package project.forAll.domain;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.enums.Gender;
import project.forAll.domain.enums.MemberRole;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Member extends BassDomain {

    @Id @GeneratedValue
    // 가입 순서에 따라 1, 2, ... 주어지는 id (저는 항상 필수로 넣었는데 없어도 되면 삭제해주세요)
    @Column(name = "user_id")
    private Long id;

    // interface로 쪼개는 방법을 모르겠어서 일단 role로 적어둡니다..
    // 권한 확인 과정에서 보안상 문제가 발생할까봐 쪼개보려고 했는데, current User를 확인하는 Service를 만들면 그만이고,
    // DB 만들기 까다로워질 수도 있어서 그냥 role도 좋은것 같습니다
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
