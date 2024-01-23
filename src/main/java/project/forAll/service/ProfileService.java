package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Image;
import project.forAll.domain.member.Profile;
import project.forAll.domain.member.Member;
import project.forAll.dto.MemberPublicDTO;
import project.forAll.dto.ProfilePublicDTO;
import project.forAll.form.ProfileForm;
import project.forAll.repository.member.ProfileRepository;

import java.util.List;

@Component
@Transactional
public class ProfileService extends Service {

    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private MemberService memberService;
    @Autowired
    private ImageService imageService;
    @Override
    protected JpaRepository getRepository(){ return profileRepository; }

    public Profile build(final ProfileForm pf){
        final Profile profile = new Profile();

        final Member member = memberService.findByLoginId(pf.getUserId());
        profile.setMember(member);
        profile.setIntroduction(pf.getIntroduction());
        final Image image = imageService.findByImageName(pf.getProfilePhoto());
        profile.setProfilePhoto(image);
        profile.setMbti(pf.getMbti());
        profile.setCook(pf.getCook());
        profile.setCookItem(pf.getCookItem());

        return profile;
    }

    public Profile findByMember(final Member member){
        List<Profile> profiles = profileRepository.findByMember(member);
        if (profiles.isEmpty()) return null;
        return profiles.get(0);
    }

    public ProfilePublicDTO convertToProfilePublicDTO(Profile profile) {
        ProfilePublicDTO profilePublicDTO = new ProfilePublicDTO();
        profilePublicDTO.setId(profile.getId());
        profilePublicDTO.setIntroduction(profile.getIntroduction());
        profilePublicDTO.setProfilePhoto(profile.getProfilePhoto() == null ?
                null : profile.getProfilePhoto().getImageName());
        profilePublicDTO.setMbti(profile.getMbti());
        profilePublicDTO.setCook(profile.getCook());
        profilePublicDTO.setCookItem(profile.getCookItem());

        return profilePublicDTO;
    }
}