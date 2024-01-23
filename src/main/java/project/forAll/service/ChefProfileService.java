package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Image;
import project.forAll.domain.member.ChefProfile;
import project.forAll.domain.member.Member;
import project.forAll.domain.member.Profile;
import project.forAll.dto.ChefProfilePublicDTO;
import project.forAll.dto.ProfilePublicDTO;
import project.forAll.form.ChefProfileForm;
import project.forAll.form.ProfileForm;
import project.forAll.repository.member.ChefProfileRepository;
import project.forAll.repository.member.ProfileRepository;

import java.util.List;

@Component
@Transactional
public class ChefProfileService extends Service {

    @Autowired
    private ChefProfileRepository chefProfileRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private ProfileService profileService;
    @Autowired
    private ImageService imageService;
    @Override
    protected JpaRepository getRepository(){ return chefProfileRepository; }

    public ChefProfile build(final ChefProfileForm cf){
        final ChefProfile chefProfile = new ChefProfile();

        chefProfile.setProfile(profileRepository.findById(cf.getId()).orElseThrow(()
                -> new IllegalArgumentException("profile doesn't exist")));
        chefProfile.setCareer(cf.getCareer());
        final Image image = imageService.findByImageName(cf.getCertificatePhoto());
        chefProfile.setCertificatePhoto(image);
        chefProfile.setAccountBank(cf.getAccountBank());
        chefProfile.setAccountNum(cf.getAccountNum());
        chefProfile.setAccountHolder(cf.getAccountHolder());

        return chefProfile;
    }

    public ChefProfile findByMember(final Member member){
        List<Profile> profiles = profileRepository.findByMember(member);
        if (profiles.isEmpty()) return null;
        Profile profile = profiles.get(0);
        List<ChefProfile> chefProfiles = chefProfileRepository.findByProfile(profile);
        if (chefProfiles.isEmpty()) return null;
        return chefProfiles.get(0);
    }

    public ChefProfilePublicDTO convertToChefProfilePublicDTO(ChefProfile chefProfile) {
        ChefProfilePublicDTO chefProfilePublicDTO = new ChefProfilePublicDTO();
        chefProfilePublicDTO.setId(chefProfile.getId());
        chefProfilePublicDTO.setCareer(chefProfile.getCareer());

        return chefProfilePublicDTO;
    }
}
