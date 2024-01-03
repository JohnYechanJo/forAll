package project.forAll.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import project.forAll.domain.Member;
import project.forAll.domain.enums.Gender;
import project.forAll.domain.enums.MemberRole;
import project.forAll.form.MemberForm;
import project.forAll.repository.MemberRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    @PersistenceContext
    EntityManager em;

    private final MemberRepository memberRepository;

    @Transactional
    public Long saveMember(Member member) {
        validateDuplicateLoginId(member);
        validateDuplicateEmail(member);
        memberRepository.save(member);
        return member.getId();
    }

    // 중복 회원을 구별하는 방법 (전화번호? 이름과 생년월일?)
    private void validateDuplicateLoginId(Member member) {
        List<Member> findMembers = memberRepository.findByLoginId(member.getLoginId());
        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 ID입니다.");
        }
    }

    private void validateDuplicateEmail(Member member) {
        List<Member> findMembers = memberRepository.findByEmail(member.getEmail());
        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("중복된 이메일입니다.");
        }
    }

    /* 필요하다면 admin 사이트를 위해서??
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
     */

    public Member findById(Long id) {
        return memberRepository.findById(id);
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
        Member member = memberRepository.findById(id);
        member.setRole(MemberRole.parse(role));
        member.setLoginId(loginId);
        member.setLoginPw(loginPw);
        member.setName(name);
        member.setBirthday(birthday);
        member.setBusinessNum(businessNum);
        member.setGender(Gender.parse(gender));
        member.setEmail(email);
        member.setPhoneNum(phoneNum);

        return member;
    }

//    /**
//     * Member 삭제
//     * @param id
//     */
//    @Transactional
//    public void delete(Long id) {
//        // Check if the member exists
//        Assert.notNull(id, "Member not found with id: " + id);
//
//        memberRepository.deleteById(id);
//    }
}
