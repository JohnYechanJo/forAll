package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Member;
import project.forAll.domain.enums.Gender;
import project.forAll.domain.enums.MemberRole;
import project.forAll.form.MemberForm;
import project.forAll.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

@Component
@Transactional(readOnly = true)
public class MemberService extends Service {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    protected JpaRepository getRepository() {
        return memberRepository;
    }
    @Transactional
    public Long saveMember(Member member) {
        validateDuplicateLoginId(member.getLoginId());
        validateDuplicateEmail(member.getEmail());
        save(member);
        return member.getId();
    }

    // 중복 회원을 구별하는 방법 (전화번호? 이름과 생년월일?)
    public void validateDuplicateLoginId(String loginId) {
        Member findMember = memberRepository.findByLoginId(loginId);
        if (findMember != null) {
            throw new IllegalStateException("이미 존재하는 ID입니다.");
        }
    }

    public void validateDuplicateEmail(String email) {
        Member findMember = memberRepository.findByEmail(email);
        if (findMember != null) {
            throw new IllegalStateException("중복된 이메일입니다.");
        }
    }

    /* 필요하다면 admin 사이트를 위해서??
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
     */

    @Transactional
    public Optional<Member> getMemberById(Long id) {
        return memberRepository.findById(id);
    }

    @Transactional
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    /**
     * MemberForm으로 member 생성
     * @param mf
     * @return member
     */
    @Transactional
    public Member build(final MemberForm mf){
        final Member member = new Member();
        member.setRole(mf.getRole());
        member.setLoginId(mf.getLoginId());
        member.setLoginPw(mf.getLoginPw());
        member.setName(mf.getName());
        member.setBirthday(mf.getBirthday());
        member.setGender(mf.getGender());
        member.setEmail(mf.getEmail());
        member.setPhoneNum(mf.getPhoneNum());

        return member;

    }

    /**
     * Member 수정
     * @param id, role, loginId, loginPw, name, birthday, businessNum, gender, email, phoneNum
     * @return member
     */
    @Transactional
    public Member update(Long id, String role, String loginId, String loginPw, String name, String birthday,
                             String businessNum, String gender, String email, String phoneNum) {
        Member member = memberRepository.findById(id).orElseThrow();
        member.setRole(MemberRole.parse(role));
        member.setLoginId(loginId);
        member.setLoginPw(loginPw);
        member.setName(name);
        member.setBirthday(birthday);
        member.setBusinessNum(businessNum);
        member.setGender(Gender.parse(gender));
        member.setEmail(email);
        member.setPhoneNum(phoneNum);
        memberRepository.flush();

        return member;
    }


}
