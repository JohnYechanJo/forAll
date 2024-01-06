package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Gender;
import project.forAll.domain.member.MemberRole;

@Getter @Setter
@NoArgsConstructor
public class MemberForm {
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

    public MemberForm(final String role, final String loginId, final String loginPw, final String name,
                      final String birthday, final String businessNum, final String gender, final String email,
                      final String phoneNum){
        setRole(MemberRole.parse(role));
        setLoginId(loginId);
        setLoginPw(loginPw);
        setName(name);
        setBirthday(birthday);
        setBusinessNum(businessNum);
        setGender(Gender.parse(gender));
        setEmail(email);
        setPhoneNum(phoneNum);
    }
}
