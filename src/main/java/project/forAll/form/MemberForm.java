package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Gender;

@Getter @Setter
@NoArgsConstructor
public class MemberForm {

    // 호스트 또는 게스트
    // private MemberRole role;
    // 로그인 ID
    private String loginId;
    // 로그인 PW
    private String loginPw;
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

    public MemberForm(final String loginId, final String loginPw, final String name, final String email,
                      final String phoneNum, final String birthday, final String gender) {
        setLoginId(loginId);
        setLoginPw(loginPw);
        setName(name);
        setEmail(email);
        setPhoneNum(phoneNum);
        setBirthday(birthday);
        setGender(Gender.parse(gender));
    }
}
