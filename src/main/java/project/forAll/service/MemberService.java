package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.member.ChefProfile;
import project.forAll.domain.member.Member;
import project.forAll.domain.member.Gender;


import project.forAll.domain.member.Profile;
import project.forAll.dto.MemberPublicDTO;


import project.forAll.dto.admin.AdminMemberDto;
import project.forAll.form.MemberForm;
import project.forAll.repository.member.ChefProfileRepository;
import project.forAll.repository.member.MemberRepository;
import project.forAll.repository.member.ProfileRepository;

import java.util.List;
import java.util.Optional;

@Component
@Transactional(readOnly = true)
public class MemberService extends Service {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private ChefProfileRepository chefProfileRepository;

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

    public void validateDuplicateLoginId(String loginId) {
        Member findMember = findByLoginId(loginId);
        if (findMember != null) {
            throw new IllegalStateException("이미 존재하는 ID입니다.");
        }
    }

    public void validateDuplicateEmail(String email) {
        Member findMember = findByEmail(email);
        if (findMember != null) {
            throw new IllegalStateException("중복된 이메일입니다.");
        }
    }
    public void validateDuplicatePhone(String phone) {
        List<Member> findMember = memberRepository.findByPhoneNum(phone);
        if (!findMember.isEmpty()) {
            throw new IllegalStateException("중복된 전화번호입니다.");
        }
    }

    /* 필요하다면 admin 사이트를 위해서??
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
     */

    @Transactional
    public Optional<Member> findMemberById(Long id) {
        return memberRepository.findById(id);
    }


    /**
     * MemberForm으로 member 생성
     * @param mf
     * @return member
     */
    @Transactional
    public Member createMember(final MemberForm mf){
        final Member member = new Member();
        member.setLoginId(mf.getLoginId());
        member.setLoginPw(mf.getLoginPw());
        member.setName(mf.getName());
        member.setEmail(mf.getEmail());
        member.setPhoneNum(mf.getPhoneNum());
        member.setBirthday(mf.getBirthday());
        member.setGender(mf.getGender());

        return member;

    }

    /**
     * Member 수정
     * @param id, role, loginId, loginPw, name, birthday, businessNum, gender, email, phoneNum
     * @return member
     */
    @Transactional
    public Member updateMember(Long id, String loginId, String loginPw, String name, String email, String phoneNum,
                               String birthday, String gender) {
        Member member = memberRepository.findById(id).orElseThrow();
        member.setLoginId(loginId);
        member.setLoginPw(loginPw);
        member.setName(name);
        member.setEmail(email);
        member.setPhoneNum(phoneNum);
        member.setBirthday(birthday);
        member.setGender(Gender.parse(gender));
        memberRepository.flush();

        return member;
    }

    /**
     * Member 삭제
     * @param id
     */
    @Transactional
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }


    /**
     * findMember 추가 코드
     */
    public Member findByLoginId(final String loginId){
        List<Member> members = memberRepository.findByLoginId(loginId);
        if (members.isEmpty()) return null;
        return members.get(0);
    }
    public Member findByEmail(final String email){
        List<Member> members = memberRepository.findByEmail(email);
        if (members.isEmpty()) return null;
        return members.get(0);
    }
    public Member findByLoginIdAndPhoneNum(final String loginId, final String phoneNum){
        List<Member> members = memberRepository.findByLoginIdAndPhoneNum(loginId, phoneNum);
        if (members.isEmpty()) return null;
        return members.get(0);
    }
    public Member findByNameAndPhoneNum(final String name, final String phoneNum){
        List<Member> members = memberRepository.findByNameAndPhoneNum(name,phoneNum);
        if (members.isEmpty()) return null;
        return members.get(0);
    }

    public Member findByLoginIdAndLoginPw(final String loginId, final String loginPw){
        List<Member> members = memberRepository.findByLoginIdAndLoginPw(loginId, loginPw);
        if (members.isEmpty()) return null;
        return members.get(0);
    }



    public MemberPublicDTO convertToMemberPublicDTO(Member member) {
        MemberPublicDTO memberPublicDTO = new MemberPublicDTO();
        memberPublicDTO.setId(member.getId());
        memberPublicDTO.setLoginId(member.getLoginId());
        memberPublicDTO.setName(member.getName());
        memberPublicDTO.setEmail(member.getEmail());
//        memberPublicDTO.setPhoneNum(member.getPhoneNum());
//        memberPublicDTO.setBirthday(member.getBirthday());
//        memberPublicDTO.setGender(member.getGender());
        memberPublicDTO.setChefPending(member.getChefPending().toString());

        final Profile profile = profileRepository.findByMember(member).get(0);
        memberPublicDTO.setProfileImage(profile.getProfilePhoto().getImageName());

        return memberPublicDTO;
    }

    public AdminMemberDto convertToAdminDTO(Member member){
        AdminMemberDto dto = new AdminMemberDto();
        dto.setId(member.getId());
        dto.setLoginId(member.getLoginId());
        dto.setLoginPw(member.getLoginPw());
        dto.setName(member.getName());
        dto.setEmail(member.getEmail());
        dto.setPhoneNum(member.getPhoneNum());
        dto.setBirthday(member.getBirthday());
        dto.setGender(member.getGender().toString());

        List<Profile> profiles = profileRepository.findByMember(member);
        if(!profiles.isEmpty()){
            final Profile profile = profiles.get(0);
            dto.setIntroduction(profile.getIntroduction());
            dto.setProfilePhoto(profile.getProfilePhoto().getImageName());
            dto.setMbti(profile.getMbti());
            dto.setCook(profile.getCook());
            dto.setCookItem(profile.getCookItem());
        }

        List<ChefProfile> chefProfiles = chefProfileRepository.findByMember(member);
        if(!chefProfiles.isEmpty()){
            final ChefProfile chefProfile = chefProfiles.get(0);
            dto.setCareer(chefProfile.getCareer());
            dto.setCertificatePhoto(chefProfile.getCertificatePhoto().getImageName());
            dto.setAccountBank(chefProfile.getAccountBank());
            dto.setAccountNum(chefProfile.getAccountNum());
            dto.setAccountHolder(chefProfile.getAccountHolder());
        }


        return dto;
    }


}
