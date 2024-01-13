package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Image;
import project.forAll.domain.Profile;
import project.forAll.domain.member.Member;
import project.forAll.form.ProfileForm;
import project.forAll.repository.ProfileRepository;

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
        profile.setDetailIntroduction(pf.getDetailIntroduction());
        profile.setCareer(pf.getCareer());
        final Image image = imageService.findByImageName(pf.getPicture());
        profile.setPicture(image);
        profile.setPictureExplain(pf.getPictureExplain());
        profile.setMbti(pf.getMbti());
        profile.setCook(pf.getCook());
        profile.setInterest(pf.getInterest());

        return profile;
    }

    public Profile findByMember(final Member member){
        List<Profile> profiles = profileRepository.findByMember(member);
        if (profiles.isEmpty()) return null;
        return profiles.get(0);
    }
}
